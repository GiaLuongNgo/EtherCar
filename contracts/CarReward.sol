pragma solidity ^0.5.8;
import './ERC1973.sol';

contract CarReward is ERC1973 {
    constructor() public ERC1973(1000000000000000000 , 1){}
}