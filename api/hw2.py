from http.server import BaseHTTPRequestHandler
import json
import hashlib
import urllib.request
import urllib.error


# ============================================================
# UTILITIES
# ============================================================

def sha256d(data: str) -> str:
    """Double SHA-256 (chuẩn Bitcoin)"""
    return hashlib.sha256(hashlib.sha256(data.encode('utf-8')).digest()).hexdigest()


# ============================================================
# TASK 1 & 2: Fetch Bitcoin TX + Decode UTXO
# ============================================================

def fetch_bitcoin_tx(txid: str) -> dict:
    """
    Gọi mempool.space API để lấy thông tin giao dịch Bitcoin.
    Trả về summary và danh sách UTXO (vout) đã được decode.
    """
    url = f"https://mempool.space/api/tx/{txid}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise ValueError(f"Không tìm thấy giao dịch (HTTP {e.code})")
    except Exception as e:
        raise ValueError(f"Lỗi kết nối mempool.space: {str(e)}")

    # --- Summary ---
    summary = {
        "txid":       data.get("txid", ""),
        "fee":        data.get("fee", 0),
        "confirmed":  data.get("status", {}).get("confirmed", False),
        "block_height": data.get("status", {}).get("block_height"),
        "vout_count": len(data.get("vout", [])),
    }

    # --- Decode UTXO (Task 2) ---
    utxos = []
    for idx, out in enumerate(data.get("vout", [])):
        utxos.append({
            "index":             idx,
            "address":           out.get("scriptpubkey_address", None),   # None = OP_RETURN / unknown
            "value_satoshi":     out.get("value", 0),
            "script_type":       out.get("scriptpubkey_type", "unknown"),
            "script_asm":        out.get("scriptpubkey_asm", ""),
        })

    return {"summary": summary, "utxos": utxos}


# ============================================================
# TASK 3 & 4: Merkle Sum Tree – stablecoin_reserve / insolvency
# ============================================================

class MerkleSumNode:
    """Node của Merkle Sum Tree: lưu (balance, hash)"""
    def __init__(self, label: str, balance: int):
        self.label   = label
        self.balance = balance
        self.hash    = sha256d(f"{label}:{balance}")

    @staticmethod
    def combine(left: "MerkleSumNode", right: "MerkleSumNode") -> "MerkleSumNode":
        combined = MerkleSumNode.__new__(MerkleSumNode)
        combined.label   = f"({left.label}+{right.label})"
        combined.balance = left.balance + right.balance
        combined.hash    = sha256d(f"{left.hash}{right.hash}:{combined.balance}")
        return combined


def build_merkle_sum_tree(accounts: list[dict]) -> dict:
    """
    Xây Merkle Sum Tree từ danh sách accounts.
    accounts = [{"label": "A", "balance": 1000}, ...]
    Trả về root hash, root balance và các node lá để audit.
    """
    if not accounts:
        raise ValueError("Danh sách accounts trống")

    leaves = [MerkleSumNode(acc["label"], acc["balance"]) for acc in accounts]

    # Lưu lại leaves để trả về proof info
    leaf_info = [{"label": n.label, "balance": n.balance, "hash": n.hash} for n in leaves]

    # Build tree bottom-up
    current_level = leaves
    while len(current_level) > 1:
        next_level = []
        for i in range(0, len(current_level), 2):
            left  = current_level[i]
            right = current_level[i + 1] if i + 1 < len(current_level) else left
            next_level.append(MerkleSumNode.combine(left, right))
        current_level = next_level

    root = current_level[0]
    return {
        "root_hash":    root.hash,
        "root_balance": root.balance,
        "leaves":       leaf_info,
    }


def detect_insolvency(true_accounts: list[dict], claimed_accounts: list[dict]) -> dict:
    """
    So sánh Merkle Sum Tree của sổ cái gốc vs sổ cái khai báo.
    Trả về kết quả audit: hợp lệ hay gian lận.
    """
    true_tree    = build_merkle_sum_tree(true_accounts)
    claimed_tree = build_merkle_sum_tree(claimed_accounts)

    is_valid = (true_tree["root_hash"] == claimed_tree["root_hash"])

    # Tìm các account bị thay đổi
    tampered = []
    for t, c in zip(true_accounts, claimed_accounts):
        if t["balance"] != c["balance"]:
            tampered.append({
                "label":   t["label"],
                "true_balance":    t["balance"],
                "claimed_balance": c["balance"],
                "diff": c["balance"] - t["balance"],
            })

    return {
        "valid":          is_valid,
        "true_tree":      true_tree,
        "claimed_tree":   claimed_tree,
        "tampered_accounts": tampered,
        "msg": "PoR Hợp lệ! Sàn chứng minh được 100% tài sản dự trữ."
               if is_valid else
               "CẢNH BÁO GIAN LẬN! Mã băm không khớp – Sàn mất khả năng thanh toán (Insolvent).",
    }


# ============================================================
# VERCEL HANDLER
# ============================================================

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        try:
            length   = int(self.headers.get("Content-Length", 0))
            body     = json.loads(self.rfile.read(length))
            action   = body.get("action")

            # --------------------------------------------------
            if action == "fetch_tx":
                txid   = body.get("txid", "").strip()
                result = fetch_bitcoin_tx(txid)
                self._send_json(200, result)

            # --------------------------------------------------
            elif action == "simulate_por":
                # true_accounts  : [{"label":"A","balance":1000}, ...]
                # claimed_accounts: idem với balance do user nhập
                true_accounts    = body.get("true_accounts", [])
                claimed_accounts = body.get("claimed_accounts", [])
                result = detect_insolvency(true_accounts, claimed_accounts)
                self._send_json(200, result)

            else:
                self._send_json(400, {"error": f"Action không hợp lệ: '{action}'"})

        except ValueError as e:
            self._send_json(400, {"error": str(e)})
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def _send_json(self, code: int, data: dict):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self._cors()
        self.end_headers()
        self.wfile.write(body)

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")