from http.server import BaseHTTPRequestHandler
import json
import hashlib


def sha256d(data):
    return hashlib.sha256(hashlib.sha256(data.encode('utf-8')).digest()).hexdigest()


class MerkleTree:
    def __init__(self, transactions):
        self.leaves = [sha256d(tx) for tx in transactions]
        self.tree = self._build_tree(self.leaves)

    def _build_tree(self, nodes):
        tree = [nodes]
        while len(tree[-1]) > 1:
            level = tree[-1]
            next_level = []
            for i in range(0, len(level), 2):
                left = level[i]
                right = level[i + 1] if i + 1 < len(level) else left
                next_level.append(sha256d(left + right))
            tree.append(next_level)
        return tree

    def get_root(self):
        return self.tree[-1][0] if self.tree else None

    def get_proof(self, index):
        proof = []
        for level in self.tree[:-1]:
            is_right_node = index % 2 == 1
            sibling_index = index - 1 if is_right_node else index + 1
            if sibling_index >= len(level):
                sibling_index = index
            proof.append((level[sibling_index], 'left' if is_right_node else 'right'))
            index //= 2
        return proof

    def get_viz(self):
        viz = f"Root: {self.get_root()}\n"
        for i, level in enumerate(reversed(self.tree)):
            viz += f"Level {len(self.tree)-i-1}: {' | '.join([node[:8] for node in level])}\n"
        return viz


def verify_proof(tx, proof, root):
    current_hash = sha256d(tx)
    for sibling_hash, direction in proof:
        if direction == 'left':
            current_hash = sha256d(sibling_hash + current_hash)
        else:
            current_hash = sha256d(current_hash + sibling_hash)
    return current_hash == root


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            raw_body = self.rfile.read(content_length)
            body = json.loads(raw_body)

            action = body.get('action')
            txs = body.get('txs', [])

            mt = MerkleTree(txs)

            if action == 'build':
                result = {'root': mt.get_root(), 'viz': mt.get_viz()}
                self._send_json(200, result)

            elif action == 'audit':
                target_tx = body.get('target_tx')
                if target_tx not in txs:
                    self._send_json(200, {'verified': False, 'msg': 'TXID không tồn tại trong danh sách!'})
                    return

                idx = txs.index(target_tx)
                proof = mt.get_proof(idx)
                is_valid = verify_proof(target_tx, proof, mt.get_root())
                self._send_json(200, {
                    'verified': is_valid,
                    'msg': 'Audit thành công' if is_valid else 'Audit thất bại'
                })

            else:
                self._send_json(400, {'error': 'Action không hợp lệ. Dùng "build" hoặc "audit".'})

        except Exception as e:
            self._send_json(500, {'error': str(e)})

    def do_OPTIONS(self):
        # Hỗ trợ CORS preflight
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def _send_json(self, status_code, data):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(body)

    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')