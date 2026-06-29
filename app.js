// ==========================================
// 1. CẤU HÌNH SMART CONTRACT
// ==========================================

// --- BÀI 3: VAULT CONTRACT ---
const HW3_CONTRACT_ADDRESS = "0x1536A6c9f028f1EA64725F195146797FcbB48F0B";
const HW3_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawn",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalVaultBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUserBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "htcToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// --- BÀI 4: HUNGTQ COIN ---
const HW4_CONTRACT_ADDRESS = "0x87Fbe28bcf1ac492df35bC28BB24390aa2ab8414";
const HW4_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];


// ==========================================
// 2. KẾT NỐI VÍ & TIỆN ÍCH HIỂN THỊ
// ==========================================
let provider, signer, userAddress;
let walletBalanceWei = ethers.BigNumber.from(0);
let vaultBalanceWei = ethers.BigNumber.from(0);

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    } else {
        alert("Vui lòng cài đặt MetaMask!");
        return false;
    }
}

// Hàm format số: 1000000 -> 1,000,000.00
function formatHTC(amountWei) {
    const formatted = ethers.utils.formatUnits(amountWei, 18);
    return parseFloat(formatted).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Ghi lịch sử giao dịch vào bảng FE
function appendHistory(type, amountWei) {
    const tbody = document.getElementById("tx-history-body");
    const row = tbody.insertRow(0); // Chèn lên đầu bảng
    const now = new Date();
    
    // Cột Thời gian
    row.insertCell(0).innerText = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    
    // Cột Loại GD (Đỏ cho Rút, Xanh cho Nộp)
    const typeCell = row.insertCell(1);
    typeCell.innerText = type;
    typeCell.style.color = type === 'Nộp' ? '#27ae60' : '#e74c3c';
    typeCell.style.fontWeight = 'bold';
    
    // Cột Số tiền
    row.insertCell(2).innerText = formatHTC(amountWei);
}

// ==========================================
// 3. LOGIC CHO BÀI 4 (MINT TOKEN)
// ==========================================
async function mintHungTQCoin() {
    if (!signer) await connectWallet();
    const contract = new ethers.Contract(HW4_CONTRACT_ADDRESS, HW4_ABI, signer);
    const targetAddress = document.getElementById('mint-address').value;
    const amountVal = document.getElementById('mint-amount').value;

    try {
        const amountInWei = ethers.utils.parseUnits(amountVal.toString(), 18);
        document.getElementById('hw4-status').innerText = "Đang xử lý...";
        const tx = await contract.mint(targetAddress, amountInWei);
        await tx.wait();
        document.getElementById('hw4-status').innerText = `Mint thành công ${formatHTC(amountInWei)} HTC! Hash: ${tx.hash}`;
    } catch (error) {
        document.getElementById('hw4-status').innerText = "Lỗi: " + error.message;
    }
}

// ==========================================
// 4. LOGIC CHO BÀI 3 (VAULT)
// ==========================================
async function getBalances() {
    if (!signer) await connectWallet();
    const tokenContract = new ethers.Contract(HW4_CONTRACT_ADDRESS, HW4_ABI, signer);
    const vaultContract = new ethers.Contract(HW3_CONTRACT_ADDRESS, HW3_ABI, signer);

    // Lấy số dư ví
    walletBalanceWei = await tokenContract.balanceOf(userAddress);
    
    // Lấy số dư cá nhân đã nộp vào Vault
    vaultBalanceWei = await vaultContract.getUserBalance();

    // Lấy tổng số dư của toàn bộ hệ thống Vault (TVL)
    const totalVaultWei = await vaultContract.getTotalVaultBalance();

    // Cập nhật UI
    document.getElementById('wallet-balance').innerText = formatHTC(walletBalanceWei);
    
    // Cập nhật text trên FE để thầy giáo thấy được cả 2 thông số
    document.getElementById('vault-balance').innerHTML = `
        ${formatHTC(vaultBalanceWei)} <br>
        <span style="font-size:11px; color:#7f8c8d;">(Tổng Vault TVL: ${formatHTC(totalVaultWei)})</span>
    `;
    
    document.getElementById('hw3-status').innerText = "Đã làm mới số dư.";
}

async function approveHTC() {
    if (!signer) await connectWallet();
    const tokenContract = new ethers.Contract(HW4_CONTRACT_ADDRESS, HW4_ABI, signer);
    const amountVal = document.getElementById('vault-amount').value;
    if (!amountVal || amountVal <= 0) return alert("Nhập số tiền hợp lệ!");

    try {
        const amountInWei = ethers.utils.parseUnits(amountVal.toString(), 18);
        document.getElementById('hw3-status').innerText = "Đang xin cấp quyền...";
        const tx = await tokenContract.approve(HW3_CONTRACT_ADDRESS, amountInWei);
        await tx.wait();
        document.getElementById('hw3-status').innerText = "Cấp quyền thành công!";
    } catch (error) {
        document.getElementById('hw3-status').innerText = "Lỗi: " + error.message;
    }
}

async function depositVault() {
    if (!signer) await connectWallet();
    const vaultContract = new ethers.Contract(HW3_CONTRACT_ADDRESS, HW3_ABI, signer);
    const amountVal = document.getElementById('vault-amount').value;
    if (!amountVal || amountVal <= 0) return alert("Nhập số tiền hợp lệ!");
    
    const amountInWei = ethers.utils.parseUnits(amountVal.toString(), 18);
    
    // [VALIDATE] Số tiền nộp không được vượt số dư ví
    if (amountInWei.gt(walletBalanceWei)) {
        return alert("Lỗi: Số tiền nộp vượt quá số dư HTC hiện có trong ví!");
    }

    try {
        document.getElementById('hw3-status').innerText = "Đang nộp HTC...";
        const tx = await vaultContract.deposit(amountInWei); 
        await tx.wait();
        document.getElementById('hw3-status').innerText = "Nộp thành công!";
        
        appendHistory('Nộp', amountInWei);
        await getBalances(); // Cập nhật lại UI số dư
    } catch (error) {
        document.getElementById('hw3-status').innerText = "Lỗi: Chưa Approve hoặc lỗi mạng.";
    }
}

async function withdrawVault() {
    if (!signer) await connectWallet();
    const vaultContract = new ethers.Contract(HW3_CONTRACT_ADDRESS, HW3_ABI, signer);
    const amountVal = document.getElementById('vault-amount').value;
    if (!amountVal || amountVal <= 0) return alert("Nhập số tiền hợp lệ!");
    
    const amountInWei = ethers.utils.parseUnits(amountVal.toString(), 18);
    
    // [VALIDATE] Số tiền rút không được vượt số dư đã nộp trong Vault
    if (amountInWei.gt(vaultBalanceWei)) {
        return alert("Lỗi: Số tiền rút vượt quá số dư bạn đã nộp trong Vault!");
    }

    try {
        document.getElementById('hw3-status').innerText = "Đang rút HTC...";
        const tx = await vaultContract.withdraw(amountInWei);
        await tx.wait();
        document.getElementById('hw3-status').innerText = "Rút thành công!";
        
        appendHistory('Rút', amountInWei);
        await getBalances(); // Cập nhật lại UI số dư
    } catch (error) {
        document.getElementById('hw3-status').innerText = "Lỗi: " + error.message;
    }
}

// ==========================================
// 5. GIAO DIỆN (DATA)
// ==========================================
const homeworkData = {
    hw1: {
        prompt: '1. Build a Merkle tree from 8 transactions.\n2. Generate inclusion proof.\n3. Verify proof.\n4. Implement fintech_audit.py',
        demo: `
            <div style="background:#f9f9f9; padding:15px; border-radius:8px; border:1px solid #ddd;">
                <p><strong>1. Merkle Tree Visualization</strong></p>
                <input type="text" id="tx-input" value="tx0,tx1,tx2,tx3,tx4,tx5,tx6,tx7" style="width:100%; padding:8px; margin:5px 0;">
                <button onclick="visualizeMerkle()" style="background:#2ecc71; color:white; border:none; padding:8px 15px; cursor:pointer; border-radius:4px;">Xây dựng cây</button>
                
                <div id="merkle-viz" style="margin-top:15px; font-family:monospace; font-size:14px; white-space:pre; color:#2c3e50;"></div>
                
                <hr style="margin:15px 0;">
                
                <p><strong>2. Audit & Verify (Kiểm toán)</strong></p>
                <div id="verify-section" style="display:flex; gap:10px;">
                    <input type="text" id="audit-tx" placeholder="Nhập tx cần verify (vd: tx2)" style="padding:8px; flex:1;">
                    <button onclick="auditTransaction()" style="background:#3498db; color:white; border:none; padding:8px 15px; border-radius:4px; cursor:pointer;">Verify</button>
                </div>
                <p id="audit-result" style="margin-top:10px; font-weight:bold;"></p>
            </div>
        `,
        explain: `<p><strong>Giải pháp:</strong> Code xây dựng Merkle Tree, tự động sinh path, và xác thực. Xem chi tiết thuật toán băm kép bên dưới.</p>`,
        file: 'hw1.py',
        lang: 'python'
    },
    hw2: {
        prompt: '1. Fetch Bitcoin Pizza TX.<br>2. Decode UTXO.<br>3. Implement <code>stablecoin_reserve.py</code>.<br>4. Detect insolvency',
        demo: `
            <div style="background:#f4f7f6; padding:15px; border-radius:8px; border:1px solid #ddd;">
                <p><strong>1. Phân tích Giao dịch & Decode UTXO</strong></p>
                
                <div style="display:flex; gap:10px; margin-bottom:10px;">
                    <input type="text" id="tx-input-api" value="a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d" placeholder="Nhập mã TxID..." style="flex:1; padding:8px; border:1px solid #ccc; border-radius:4px; font-family:monospace; font-size:12px;">
                    <button onclick="fetchBitcoinTx()" style="background:#f39c12; color:white; border:none; padding:8px 15px; cursor:pointer; border-radius:4px; font-weight:bold;">Decode UTXO</button>
                </div>
                
                <p id="api-loading" style="font-size:12px; color:#7f8c8d; font-style:italic; display:none;">Đang xử lý dữ liệu từ Block Explorer...</p>

                <div id="api-result-container" style="display:none; margin-top:15px; background:white; border:1px solid #ddd; border-radius:8px; overflow:hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div style="background:#2c3e50; color:white; padding:10px 15px;">
                        <h4 style="margin:0; font-size:14px; font-weight:normal;">Transaction Summary</h4>
                    </div>
                    <div id="tx-summary" style="padding:15px; font-size:13px; border-bottom:1px solid #eee;">
                        </div>
                    
                    <div style="background:#f8f9fa; color:#333; padding:10px 15px; border-bottom:1px solid #eee;">
                        <h4 style="margin:0; font-size:14px; font-weight:normal;">UTXO Fields (Outputs)</h4>
                    </div>
                    <div style="padding:15px; overflow-x:auto;">
                        <table style="width:100%; border-collapse: collapse; font-size:12px; text-align:left;">
                            <thead>
                                <tr style="background:#ecf0f1; color:#2c3e50;">
                                    <th style="padding:8px; border:1px solid #ccc; text-align:center;">VOUT Index</th>
                                    <th style="padding:8px; border:1px solid #ccc;">Address (Ví nhận)</th>
                                    <th style="padding:8px; border:1px solid #ccc;">Value (Satoshi)</th>
                                    <th style="padding:8px; border:1px solid #ccc;">Script Type</th>
                                    <th style="padding:8px; border:1px solid #ccc;">Locking Script (ASM)</th>
                                </tr>
                            </thead>
                            <tbody id="utxo-body">
                                </tbody>
                        </table>
                    </div>
                </div>

                <hr style="margin:20px 0;">

                <p><strong>2. Mô phỏng Proof of Reserves (Merkle Sum Tree)</strong></p>
                <p style="font-size:13px; color:#555; margin-bottom:10px;">Thử thay đổi "Balance Khai báo" của User B (ví dụ nhập 100) để mô phỏng sàn giấu nợ, sau đó bấm Kiểm toán.</p>
                
                <table style="width:100%; margin-bottom:15px; background:white; text-align:left; border-collapse: collapse; font-size:14px;">
                    <tr style="background:#ecf0f1;">
                        <th style="border:1px solid #ccc; padding:8px;">User</th>
                        <th style="border:1px solid #ccc; padding:8px;">Balance Thực tế</th>
                        <th style="border:1px solid #ccc; padding:8px;">Balance Khai báo</th>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ccc; padding:8px;">User A</td>
                        <td style="border:1px solid #ccc; padding:8px; color:green; font-weight:bold;">1000</td>
                        <td style="border:1px solid #ccc; padding:8px;"><input type="number" id="bal-a" value="1000" style="width:100%; padding:4px;"></td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ccc; padding:8px;">User B</td>
                        <td style="border:1px solid #ccc; padding:8px; color:green; font-weight:bold;">500</td>
                        <td style="border:1px solid #ccc; padding:8px;"><input type="number" id="bal-b" value="500" style="width:100%; padding:4px;"></td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ccc; padding:8px;">User C</td>
                        <td style="border:1px solid #ccc; padding:8px; color:green; font-weight:bold;">2500</td>
                        <td style="border:1px solid #ccc; padding:8px;"><input type="number" id="bal-c" value="2500" style="width:100%; padding:4px;"></td>
                    </tr>
                </table>
                <button onclick="simulatePoR()" style="background:#9b59b6; color:white; border:none; padding:10px 15px; cursor:pointer; border-radius:4px; width:100%; font-weight:bold;">Kiểm toán PoR (Verify Insolvency)</button>
                <div id="por-result" style="margin-top:15px; padding:10px; background:#fff; border:1px solid #ccc; border-radius:4px; font-size:14px;"></div>
            </div>
        `,
        explain: `<p><strong>Giải pháp:</strong> Triển khai Merkle Sum Tree (Lưu balance tại các node) để ứng dụng vào Proof of Reserves (PoR). Thuật toán đảm bảo số dư của nút cha luôn bằng tổng 2 nút con. Nếu cấu trúc sổ cái bị can thiệp (Tampered), Root Hash sẽ thay đổi và đánh dấu sự kiện mất khả năng thanh khoản.</p>`,
        file: 'hw2.py',
        lang: 'python'
    },
    hw3: {
        prompt: `Write an Ethereum smart contract using Solidity running on Remix.`,
        demo: `
            <div style="background:#f4f7f6; padding:15px; border-radius:8px; border:1px solid #dcdde1;">
                <button onclick="getBalances()" style="margin-bottom:10px; background:#f39c12; color:#fff; border:none; padding:8px 12px; cursor:pointer; width:100%; font-weight:bold;">1. Kết nối & Lấy số dư</button>
                
                <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:14px; background:#fff; padding:12px; border-radius:5px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <span><strong>Ví (Wallet):</strong> <br><span id="wallet-balance" style="color:#2980b9; font-size:16px;">0.00</span> HTC</span>
                    <span style="text-align:right;"><strong>Vault (Tổng Nộp - Rút):</strong> <br><span id="vault-balance" style="color:#27ae60; font-size:16px;">0.00</span> HTC</span>
                </div>

                <input type="number" id="vault-amount" placeholder="Nhập số lượng HTC (vd: 500)" style="padding:10px; width:100%; margin-bottom:10px; border:1px solid #ccc; border-radius:4px;"><br>
                
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <button onclick="approveHTC()" style="flex:1; background:#9b59b6; color:#fff; border:none; padding:10px; cursor:pointer; border-radius:4px;">2. Cấp quyền</button>
                    <button onclick="depositVault()" style="flex:1; background:#2ecc71; color:#fff; border:none; padding:10px; cursor:pointer; border-radius:4px;">3. Nộp</button>
                    <button onclick="withdrawVault()" style="flex:1; background:#e74c3c; color:#fff; border:none; padding:10px; cursor:pointer; border-radius:4px;">Rút</button>
                </div>
                <p id="hw3-status" style="margin-top:5px; font-size:12px; color:#7f8c8d; font-style:italic;">Trạng thái: Sẵn sàng</p>

                <div style="margin-top:20px; background:#fff; border-radius:5px; padding:10px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h4 style="border-bottom:2px solid #ecf0f1; padding-bottom:5px; margin-bottom:10px; color:#2c3e50;">Lịch sử giao dịch</h4>
                    <table style="width:100%; text-align:left; font-size:13px; border-collapse: collapse;">
                        <thead>
                            <tr style="background:#ecf0f1;">
                                <th style="padding:8px; border-bottom:1px solid #bdc3c7;">Thời gian</th>
                                <th style="padding:8px; border-bottom:1px solid #bdc3c7;">Loại</th>
                                <th style="padding:8px; border-bottom:1px solid #bdc3c7;">Số tiền (HTC)</th>
                            </tr>
                        </thead>
                        <tbody id="tx-history-body">
                            </tbody>
                    </table>
                </div>
            </div>
        `,
        explain: `<p><strong>Giải pháp:</strong> Xây dựng Vault lưu ký chuyên dụng cho đồng HungTQCoin (HTC). Cơ chế UI/UX được tối ưu hiển thị 2 số thập phân và phân cách ngàn. Đồng thời tích hợp chốt chặn (validation) trước khi gọi Smart Contract để tối ưu phí Gas cho các giao dịch không hợp lệ.</p>`,
        file: 'hw3.sol', lang: 'solidity'
    },
    hw4: {
        prompt: `1. ERC-20 Token Development<br>2. Deploy on Sepolia test network`,
        demo: `
            <div style="background:#f4f7f6; padding:15px; border-radius:8px; border:1px solid #dcdde1;">
                <input type="text" id="mint-address" placeholder="Địa chỉ ví nhận Token (0x...)" style="padding:10px; width:100%; margin-bottom:10px; border:1px solid #ccc; border-radius:4px;"><br>
                <input type="number" id="mint-amount" placeholder="Số lượng HTC (chỉ hiển thị 2 số)" style="padding:10px; width:100%; margin-bottom:10px; border:1px solid #ccc; border-radius:4px;"><br>
                <button onclick="mintHungTQCoin()" style="background:#3498db; color:#fff; border:none; padding:10px; cursor:pointer; width:100%; font-weight:bold; border-radius:4px;">Thực thi lệnh Mint</button>
                <p id="hw4-status" style="margin-top:10px; font-size:12px; color:#7f8c8d;">Trạng thái: Sẵn sàng</p>
            </div>
        `,
        explain: `<p><strong>Giải pháp:</strong> Sử dụng chuẩn bảo mật của OpenZeppelin. Token mint ra hiển thị trên FE được format loại bỏ 18 số 0 dư thừa, trả về trải nghiệm tự nhiên.</p>`,
        file: 'hw4.sol', lang: 'solidity'
    }
};

// Hàm hỗ trợ băm đơn giản để demo trên UI (JS không dùng SHA256 trực tiếp giống Python)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(16);
}

// ==========================================
// 6. HÀM CHUYỂN TAB
// ==========================================
async function openTab(hwKey) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const data = homeworkData[hwKey];
    if (!data) return;
    
    // Chỉ cần gán trực tiếp 1 lần, code sẽ rất mượt
    document.getElementById('prompt-content').innerHTML = data.prompt;
    document.getElementById('demo-content').innerHTML = data.demo;
    document.getElementById('explain-content').innerHTML = data.explain;
    document.getElementById('file-name-display').innerText = `File: ${data.file}`;

    const codeBlock = document.getElementById('code-block');
    codeBlock.textContent = "Đang tải code...";
    codeBlock.className = `language-${data.lang}`;

    try {
        const response = await fetch(data.file);
        if (!response.ok) throw new Error("Không tìm thấy file");
        const codeText = await response.text();
        
        codeBlock.textContent = codeText;
        if (window.hljs) hljs.highlightElement(codeBlock);
    } catch (error) {
        codeBlock.textContent = "Lỗi khi tải file code. Đảm bảo bạn đang chạy qua Local Server (Live Server).";
    }
}


// ==========================================
// 7. LOGIC CHO BÀI 1
// ==========================================
// 1. Dùng cho Demo 1: Chỉ xây cây
async function visualizeMerkle() {
    // Lấy danh sách tx từ ID: tx-input
    const rawInput = document.getElementById('tx-input').value;
    const txs = rawInput.split(',').map(tx => tx.trim());
    
    // Gọi API
    const response = await fetch('/api/hw1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'build', txs: txs })
    });
    
    const data = await response.json();
    document.getElementById('merkle-viz').innerText = data.viz;
}

// 2. Dùng cho Demo 2: Audit
async function auditTransaction() {
    const rawInput = document.getElementById('tx-input').value;
    const txs = rawInput.split(',').map(tx => tx.trim());
    const targetTx = document.getElementById('audit-tx').value.trim(); // ✅ đúng ID

    const resultEl = document.getElementById('audit-result');
    resultEl.innerText = "Đang kiểm toán...";
    
    const response = await fetch('/api/hw1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            action: 'audit', 
            txs: txs,
            target_tx: targetTx
        })
    });
    
    const data = await response.json();
    resultEl.style.color = data.verified ? 'green' : 'red';
    resultEl.innerText = data.msg;
}

// DEMO 2: Audit
async function auditTransaction() {
    const txs = document.getElementById('tx-input').value.split(',').map(t => t.trim());
    const target = document.getElementById('audit-target').value.trim();
    const resultEl = document.getElementById('audit-result');
    
    resultEl.innerText = "Đang thực hiện kiểm toán...";
    const data = await handleApiCall('audit', txs, target);
    
    resultEl.innerText = data.msg;
    resultEl.style.color = data.verified ? 'green' : 'red';
}

// ==========================================
// 8. LOGIC CHO BÀI 2
// ==========================================

async function fetchBitcoinTx() {
    const txid = document.getElementById('tx-input-api').value.trim();
    const loadingEl = document.getElementById('api-loading');
    const container = document.getElementById('api-result-container');
    const summary = document.getElementById('tx-summary');
    const utxoBody = document.getElementById('utxo-body');

    if (!txid) {
        alert("Vui lòng nhập mã TxID!");
        return;
    }

    // Reset giao diện khi bắt đầu fetch
    container.style.display = 'none';
    loadingEl.style.display = 'block';
    loadingEl.style.color = '#7f8c8d';
    loadingEl.innerText = `Đang kết nối API mempool.space cho TX: ${txid.substring(0, 8)}...`;
    
    try {
        const res = await fetch(`https://mempool.space/api/tx/${txid}`);
        
        if (!res.ok) throw new Error("Không tìm thấy giao dịch này hoặc lỗi mạng!");
        
        const data = await res.json();
        
        // 1. Đổ dữ liệu vào Summary Card
        summary.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <strong>Mã giao dịch (TxID):</strong> <span style="color:#3498db; font-family:monospace;">${data.txid}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <strong>Phí giao dịch (Fee):</strong> <span style="color:#e74c3c; font-weight:bold; font-size:14px;">${data.fee.toLocaleString()} Satoshis</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <strong>Trạng thái (Status):</strong> <span>${data.status.confirmed ? `✅ Đã xác nhận (Block: ${data.status.block_height})` : '⏳ Unconfirmed'}</span>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <strong>Số lượng UTXO (Đầu ra):</strong> <span>${data.vout.length} Output(s)</span>
            </div>
        `;

        // 2. Đổ dữ liệu vào UTXO Table
        utxoBody.innerHTML = ''; // Clear bảng cũ
        data.vout.forEach((out, idx) => {
            // Có những UTXO (như OP_RETURN) không có địa chỉ ví nhận
            const address = out.scriptpubkey_address || '<span style="color:#e74c3c; font-style:italic;">N/A (Data OP_RETURN)</span>';
            
            // Lấy mã ASM nguyên thủy, cắt ngắn bớt để bảng không bị vỡ layout, gắn tooltip để xem full
            const rawAsm = out.scriptpubkey_asm || '';
            const displayAsm = rawAsm.length > 30 ? rawAsm.substring(0, 30) + '...' : rawAsm;

            utxoBody.innerHTML += `
                <tr style="border-bottom:1px solid #ecf0f1;">
                    <td style="padding:10px 8px; border:1px solid #ccc; text-align:center; font-weight:bold;">${idx}</td>
                    <td style="padding:10px 8px; border:1px solid #ccc; font-family:monospace; color:#2980b9;">${address}</td>
                    <td style="padding:10px 8px; border:1px solid #ccc; font-weight:bold; color:#27ae60;">${out.value.toLocaleString()}</td>
                    <td style="padding:10px 8px; border:1px solid #ccc; font-weight:bold; text-transform:uppercase; font-size:11px;">
                        <span style="background:#ecf0f1; padding:3px 6px; border-radius:4px;">${out.scriptpubkey_type}</span>
                    </td>
                    <td style="padding:10px 8px; border:1px solid #ccc; font-family:monospace; font-size:10px; color:#7f8c8d;" title="${rawAsm}">
                        ${displayAsm}
                    </td>
                </tr>
            `;
        });

        // Ẩn loading, show container kết quả
        loadingEl.style.display = 'none';
        container.style.display = 'block';

    } catch (err) {
        loadingEl.style.color = "red";
        loadingEl.innerText = "Lỗi hệ thống: " + err.message;
    }
}

function simulatePoR() {
    // 1. Tính toán cây trung thực (Thực tế)
    const trueA = 1000, trueB = 500, trueC = 2500;
    const trueTotal = trueA + trueB + trueC;
    // Băm gộp Balance và Hash của các lá
    const trueRootHash = simpleHash(`Root:${trueTotal}:` + simpleHash(`A:${trueA}`) + simpleHash(`B:${trueB}`) + simpleHash(`C:${trueC}`));

    // 2. Tính toán cây bị can thiệp (Dữ liệu từ Input khai báo)
    const claimedA = parseInt(document.getElementById('bal-a').value) || 0;
    const claimedB = parseInt(document.getElementById('bal-b').value) || 0;
    const claimedC = parseInt(document.getElementById('bal-c').value) || 0;
    const claimedTotal = claimedA + claimedB + claimedC;
    const claimedRootHash = simpleHash(`Root:${claimedTotal}:` + simpleHash(`A:${claimedA}`) + simpleHash(`B:${claimedB}`) + simpleHash(`C:${claimedC}`));

    // 3. Xuất kết quả kiểm toán
    const resEl = document.getElementById('por-result');
    let html = `<strong style="color:#2c3e50;">Kết quả kiểm toán (Audit Log):</strong><br><br>`;
    
    html += `<span style="color:#7f8c8d;">[Cây Sổ cái gốc]</span> Tổng dự trữ: <strong>${trueTotal}</strong> | Root Hash: ${trueRootHash}<br>`;
    html += `<span style="color:#7f8c8d;">[Cây Sàn cung cấp]</span> Tổng dự trữ: <strong>${claimedTotal}</strong> | Root Hash: ${claimedRootHash}<br><br>`;

    if (trueRootHash === claimedRootHash) {
        html += `<div style="padding:10px; background:#e8f8f5; border-left:4px solid #2ecc71; color:#27ae60;">
                    <strong>✅ PoR Hợp lệ!</strong> Mã băm khớp hoàn toàn. Sàn chứng minh được 100% tài sản dự trữ.
                 </div>`;
    } else {
        html += `<div style="padding:10px; background:#fdedec; border-left:4px solid #e74c3c; color:#c0392b;">
                    <strong>❌ CẢNH BÁO GIAN LẬN (Tamper Detected)!</strong><br>
                    Mã băm không khớp. Sàn đã tự ý sửa đổi số dư của User để che giấu nợ. Tuyên bố mất khả năng thanh khoản (Insolvent).
                 </div>`;
    }
    resEl.innerHTML = html;
}


window.onload = () => document.querySelector('.tab-btn').click();