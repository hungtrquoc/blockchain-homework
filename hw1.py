import hashlib

def hash256(data):
    """Băm Double SHA-256 theo chuẩn Bitcoin"""
    if isinstance(data, str):
        data = data.encode('utf-8')
    return hashlib.sha256(hashlib.sha256(data).digest()).hexdigest()

class MerkleTree:
    def __init__(self, transactions):
        self.leaves = [hash256(tx) for tx in transactions]
        self.tree = self._build_tree(self.leaves)

    def _build_tree(self, nodes):
        tree = [nodes]
        while len(tree[-1]) > 1:
            level = tree[-1]
            next_level = []
            for i in range(0, len(level), 2):
                left = level[i]
                right = level[i+1] if i+1 < len(level) else left
                next_level.append(hash256(left + right))
            tree.append(next_level)
        return tree

    def get_root(self):
        return self.tree[-1][0] if self.tree else None

    def get_proof(self, index):
        """Tạo inclusion proof (sibling path)"""
        proof = []
        for level in self.tree[:-1]:
            is_right_node = index % 2 == 1
            sibling_index = index - 1 if is_right_node else min(index + 1, len(level) - 1)
            proof.append((level[sibling_index], 'left' if is_right_node else 'right'))
            index //= 2
        return proof

def verify_proof(tx, proof, root):
    current_hash = hash256(tx)
    for sibling_hash, direction in proof:
        if direction == 'left':
            current_hash = hash256(sibling_hash + current_hash)
        else:
            current_hash = hash256(current_hash + sibling_hash)
    return current_hash == root

if __name__ == "__main__":
    txs = [f"tx{i}" for i in range(1, 9)]
    mt = MerkleTree(txs)
    root = mt.get_root()
    print(f"1. Merkle Root: {root}")

    target_tx, target_index = "tx3", 2
    proof = mt.get_proof(target_index)
    
    print(f"\n2. Verify proof tx3: {verify_proof(target_tx, proof, root)}")
    print(f"3. Verify tampered tx: {verify_proof('tx_fake', proof, root)}")