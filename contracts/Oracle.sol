// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract BankAccountOracle is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    
    uint256 public balance;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() {
        setPublicChainlinkToken();
        oracle = 0xYourOracleAddress; // Adresse des Chainlink-Knotens
        jobId = "YourJobId"; // Job ID für die Plaid-Integration
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    function requestBankAccountBalance(string memory accountId) public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("accountId", accountId);
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _balance) public recordChainlinkFulfillment(_requestId) {
        balance = _balance;
    }
}
