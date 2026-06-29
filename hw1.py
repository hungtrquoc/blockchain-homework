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
                right = level[i+1] if i+1 < len(level) else left
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
            if sibling_index >= len(level): sibling_index = index
            proof.append((level[sibling_index], 'left' if is_right_node else 'right'))
            index //= 2
        return proof

    def get_viz(self):
        """Tạo chuỗi mô phỏng cấu trúc cây"""
        viz = f"Root: {self.get_root()}\n"
        for i, level in enumerate(reversed(self.tree)):
            viz += f"Level {len(self.tree)-i-1}: {' | '.join([node[:8] for node in level])}\n"
        return viz

def verify_proof(tx, proof, root):
    current_hash = sha256d(tx)
    for sibling_hash, direction in proof:
        if direction == 'left': current_hash = sha256d(sibling_hash + current_hash)
        else: current_hash = sha256d(current_hash + sibling_hash)
    return current_hash == root

def handler(request):
    try:
        body = json.loads(request.body)
        action = body.get('action') # 'build' hoặc 'audit'
        txs = body.get('txs', [])
        
        mt = MerkleTree(txs)
        
        if action == 'build':
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'root': mt.get_root(), 'viz': mt.get_viz()})
            }
            
        elif action == 'audit':
            target_tx = body.get('target_tx')
            if target_tx not in txs:
                return {'statusCode': 200, 'body': json.dumps({'verified': False, 'msg': 'TXID không tồn tại trong danh sách!'})}
            
            idx = txs.index(target_tx)
            proof = mt.get_proof(idx)
            is_valid = verify_proof(target_tx, proof, mt.get_root())
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'verified': is_valid, 'msg': 'Audit thành công' if is_valid else 'Audit thất bại'})
            }
            
    except Exception as e:
        return {'statusCode': 500, 'body': json.dumps({'error': str(e)})}