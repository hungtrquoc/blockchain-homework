// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HTCVault {
    IERC20 public htcToken;
    mapping(address => uint256) public balances;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(address _tokenAddress) {
        htcToken = IERC20(_tokenAddress);
    }

    function deposit(uint256 amount) public {
        require(amount > 0, "Amount must be > 0");
        bool success = htcToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer failed. Did you approve?");
        
        balances[msg.sender] += amount;
        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        
        bool success = htcToken.transfer(msg.sender, amount);
        require(success, "Transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    // 1. Lấy số dư của cá nhân (Tổng nộp - rút của ví đang gọi)
    function getUserBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // 2. Lấy TỔNG SỐ DƯ của toàn bộ Vault (TVL - Total Value Locked)
    function getTotalVaultBalance() public view returns (uint256) {
        // Trả về số lượng token HTC thực tế mà địa chỉ của contract Vault này đang giữ
        return htcToken.balanceOf(address(this));
    }
}