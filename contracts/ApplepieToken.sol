// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ApplepieToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("ApplepieToken", "APT") {
        _mint(msg.sender, initialSupply);
    }
}
