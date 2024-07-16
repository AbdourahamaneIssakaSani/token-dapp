pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Token
 * @dev ERC20 token example, where all tokens are pre-assigned to the creator.
 */
contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("Token", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}
