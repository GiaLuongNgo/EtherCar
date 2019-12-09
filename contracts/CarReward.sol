pragma solidity ^0.5.8;
import './ERC1973.sol';

contract CarReward is ERC1973 {
    constructor() public ERC1973(1000000000000000000 , 1){}

    function addBuyerAsMinter(address _minter) public {
        _addMinter(_minter);
        totalParticipants = totalParticipants.add(1);
        updateParticipantMask(_minter);
    }

    function updateParticipantMask(address participant) private returns (bool) {
        uint256 previousRoundMask = roundMask;
        participantMask[participant] = previousRoundMask;
        return true;
    }
}