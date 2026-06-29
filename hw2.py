import requests
import hashlib

# --- TASK 1 & 2: FETCH PIZZA TX ---
def fetch_pizza_tx():
    txid = "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
    url = f"https://mempool.space/api/tx/{txid}"
    res = requests.get(url).json()
    
    print(f"TXID: {res['txid']} | Fee: {res['fee']} sats\n")
    for i, vout in enumerate(res['vout']):
        print(f"Out {i}: {vout['value']} sats | Type: {vout['scriptpubkey_type']}")

# --- TASK 3 & 4: MERKLE SUM TREE PoR ---
def hash256(data):
    return hashlib.sha256(hashlib.sha256(data.encode('utf-8')).digest()).hexdigest()

class MerkleSumNode:
    def __init__(self, user_id, balance, left=None, right=None):
        self.balance = balance
        if left is None and right is None:
            self.hash = hash256(f"{user_id}:{balance}")
        else:
            self.hash = hash256(f"{left.hash}:{right.hash}:{balance}")
        self.left, self.right = left, right

class MerkleSumTree:
    def __init__(self, accounts):
        self.leaves = [MerkleSumNode(uid, bal) for uid, bal in accounts]
        self.root = self._build_tree(self.leaves)

    def _build_tree(self, nodes):
        if len(nodes) == 1: return nodes[0]
        next_level = []
        for i in range(0, len(nodes), 2):
            left = nodes[i]
            right = nodes[i+1] if i+1 < len(nodes) else left
            next_level.append(MerkleSumNode("internal", left.balance + right.balance, left, right))
        return self._build_tree(next_level)

if __name__ == "__main__":
    fetch_pizza_tx()
    
    print("\n--- PoR CHECK ---")
    honest_accounts = [("UserA", 1000), ("UserB", 500)]
    tree = MerkleSumTree(honest_accounts)
    
    tampered_accounts = [("UserA", 1000), ("UserB", 100)] # Sửa số dư giấu nợ
    tampered_tree = MerkleSumTree(tampered_accounts)
    
    if tree.root.hash != tampered_tree.root.hash:
        print("-> ALERT: Tampering detected! Exchange is insolvent.")