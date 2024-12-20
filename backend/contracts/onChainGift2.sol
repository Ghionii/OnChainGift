// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;


contract onChainGift2 {
    address public owner;


    event GiftCardPurchased(address indexed buyer, string recipientEmail, uint amountInEth);

    modifier onlyOwner() {
        require(msg.sender == owner, "not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function purchaseGiftCard(string calldata recipientEmail) external payable {
        require(msg.value > 0, "no eth sent");

        uint ethAmount = msg.value;

        emit GiftCardPurchased(msg.sender, recipientEmail, ethAmount);

        payable(owner).transfer(msg.value);
    }
}