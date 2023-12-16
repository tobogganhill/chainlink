// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {

    AggregatorV3Interface internal dataFeed;
    int public Chainlink_answer;
    
    // Network: Sepolia
    // Aggregator: BTC/USD
    // Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43

    constructor() {
        dataFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
    }
     
    // return the latest answer for the conversion from Chainlink
    function getChainlinkDataFeedLatestAnswer() external returns (int) {
        (/* uint80 roundID */,
            int answer,
            /* uint startedAt */,
            /* uint timeStamp */,
            /*uint80 answeredInRound*/) = dataFeed.latestRoundData();

        Chainlink_answer = answer;        
        return answer;
    }

    
}