// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HungTQCoin is ERC20, Ownable {
    constructor() ERC20("HungTQ Coin", "HTC") Ownable(msg.sender) {
        // Mint sẵn 1,000,000 HTC cho ví deploy
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Chức năng mint thêm token cho một ví bất kỳ
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}