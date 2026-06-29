import requests
import hashlib

def sha256(data):
    return hashlib.sha256(data.encode('utf-8')).hexdigest()

# --- Logic Merkle Sum Tree cho Proof of Reserves ---
class MerkleSumNode:
    def __init__(self, user_id, balance, left=None, right=None):
        self.balance = balance
        if left is None and right is None:
            self.hash = sha256(f"{user_id}:{balance}")
        else:
            self.hash = sha256(f"{left.hash}:{right.hash}:{balance}")
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

# --- Fetch & Decode UTXO ---
def get_tx_data(txid):
    url = f"https://mempool.space/api/tx/{txid}"
    data = requests.get(url).json()
    return data

if __name__ == "__main__":
    # Demo fetch Pizza TX
    txid = "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
    tx_data = get_tx_data(txid)
    print(f"Fee: {tx_data['fee']}")
    
    # Demo phát hiện gian lận
    honest_accounts = [("UserA", 1000), ("UserB", 500)]
    tree = MerkleSumTree(honest_accounts)
    
    # Giả lập bị can thiệp
    tampered_accounts = [("UserA", 1000), ("UserB", 100)] 
    tampered_tree = MerkleSumTree(tampered_accounts)
    
    print(f"Tamper detected: {tree.root.hash != tampered_tree.root.hash}")