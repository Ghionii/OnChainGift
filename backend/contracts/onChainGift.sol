// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract onChainGift {
    address public owner;
    uint256 public giftCardPrice = 0.1 ether; 


    event GiftCardPurchased(address indexed buyer, string recipientEmail, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setGiftCardPrice(uint _price) external onlyOwner {
        giftCardPrice = _price;
    }

    function purchaseGiftCard(string calldata recipientEmail) external payable {
        require(msg.value == giftCardPrice, "incorrect payment");

        emit GiftCardPurchased(msg.sender, recipientEmail, msg.value);

        payable(owner).transfer(msg.value);
    }

}