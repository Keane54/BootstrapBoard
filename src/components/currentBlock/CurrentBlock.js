import React, { useEffect, useState } from "react";
import { SecondsSinceLastBlock } from "../secondsSinceLastBlock/secondsSinceLastBlock";
import { GetBlockTransactions } from "../getBlockTxs/GetBlockTransactions";
import Web3 from 'web3';
import EtherscanLogo from "../../images/etherscan-logo.png"

let web3 = new Web3(Web3.givenProvider || "https://eth-mainnet.alchemyapi.io/v2/4RvGTwEA6WDJUNCq-3iCvNNtdXKh1Q8U")

export const CurrentBlock = () => {

    // Fetches current blocknumber from Alchemy API.
    const getCurrentBlock = async () => {

        const block = await web3.eth.getBlockNumber();

        setBlockNum(block)
    }

    const [blockNum, setBlockNum] = useState(() => getCurrentBlock());

    // Pings API every second.
    useEffect(() => {
        setInterval(() => {
            getCurrentBlock();
        }, 1000)
    }, [])

    // Checks if promise has resolved to prevent React trying to render an object.
    if (!Number.isInteger(blockNum)) {
        return <h1>Block: Loading...</h1>
    }

    return (<div className="current-block-container">
        <h3>Block: {blockNum} <a href={`https://etherscan.io/block/${blockNum}`} target="_blank" rel="noreferrer">
            <img className="etherscan-logo" src={EtherscanLogo} alt="Etherscan Logo."></img></a>
        </h3>

        <SecondsSinceLastBlock currentBlock={blockNum} />

        <GetBlockTransactions block={blockNum}/>
        </div>)
}