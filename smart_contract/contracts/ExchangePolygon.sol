// SPDX-License-Identifier: UNLICENSED

// Set the solidity version
pragma solidity ^0.8.0;

contract ExchangePolygon {
    // Stores the number of transactions on the exchange
    uint256 ExchangeCount;

    // Send Crypto function event
    event SendCrypto(address sender, address receiver, uint amount, string message, uint256 timestamp);

    // Structure storing the transaction data
    struct TransactionStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 time;
    }

    // An array of all Transactions 
    // Elements/data are of type ExchangeStruct
    TransactionStruct[] transactions;

    // Executes the SendCrypto event
    function connectBlockchain(address payable receiver, uint amount, string memory message) public {
        // Increment Exchange counter
        ExchangeCount += 1;

        // Push the transaction to the array of Transactions
        transactions.push(TransactionStruct(msg.sender, receiver, amount, message, block.timestamp));

        // Execute Send Crypto Event
        emit SendCrypto(msg.sender, receiver, amount, message, block.timestamp);
    }

    // Getter function for array of transactions
    function getTransactions() public view returns (TransactionStruct[] memory) {
        return transactions;
    }

    function getExchangeCounter() public view returns (uint256) {
        return ExchangeCount;
    }
}