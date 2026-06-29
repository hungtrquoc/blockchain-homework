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
// 5. GIAO DIỆN NÂNG CẤP (DATA)
// ==========================================
const homeworkData = {
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


async function openTab(hwKey) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const data = homeworkData[hwKey];
    document.getElementById('prompt-content').innerHTML = data.prompt;
    document.getElementById('demo-content').innerHTML = data.demo;
    document.getElementById('explain-content').innerHTML = data.explain;
    document.getElementById('file-name-display').innerText = `File: ${data.file}`;

    const codeBlock = document.getElementById('code-block');
    codeBlock.textContent = "Đang tải code...";
    codeBlock.className = `language-${data.lang}`; // Set ngôn ngữ để thư viện tô màu

    try {
        // Fetch nội dung từ file local
        const response = await fetch(data.file);
        if (!response.ok) throw new Error("Không tìm thấy file");
        const codeText = await response.text();
        
        codeBlock.textContent = codeText;
        // Kích hoạt tô màu code
        hljs.highlightElement(codeBlock);
    } catch (error) {
        codeBlock.textContent = "Lỗi khi tải file code. Đảm bảo bạn đang chạy qua Local Server (Live Server).";
    }
}

// Logic phụ cho bài 2
async function fetchBitcoinTx() {
    const el = document.getElementById('api-result');
    el.innerText = "Đang tải...";
    try {
        const res = await fetch('https://mempool.space/api/tx/a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d');
        const data = await res.json();
        el.innerText = `Fee: ${data.fee} sats\n\nOutputs:\n` + data.vout.map(v => `${v.value} sats (${v.scriptpubkey_type})`).join('\n');
    } catch (e) {
        el.innerText = "Lỗi API";
    }
}

window.onload = () => document.querySelector('.tab-btn').click();