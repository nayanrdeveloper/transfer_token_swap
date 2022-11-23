// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Transactions {
    uint256 transactionCount;

    struct TransferStruct {
        address payable sender;
        address payable receiver;
        // uint256 amount;
        string message;
        uint256 timestamp;
        string networkName;
    }

    event Transfer(
        address indexed sender,
        address indexed receiver,
        // uint256 amount,
        string message,
        uint256 currentTime,
        string indexed networkName
    );

    TransferStruct[] transactions;

    function addTransactionBlock(
        address payable _receiver,
        // uint256 _amount,
        string memory _message,
        string memory _networkName
    ) public payable returns (TransferStruct memory) {
        transactionCount += 1;
        _receiver.transfer(msg.value);
        transactions.push(
            TransferStruct(
                payable(msg.sender),
                payable(_receiver),
                // _amount,
                _message,
                block.timestamp,
                _networkName
            )
        );

        emit Transfer(
            msg.sender,
            _receiver,
            // _amount,
            _message,
            block.timestamp,
            _networkName
        );

        return transactions[transactionCount];
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTotalTranctionsCount() public view returns (uint256) {
        return transactionCount;
    }
}
