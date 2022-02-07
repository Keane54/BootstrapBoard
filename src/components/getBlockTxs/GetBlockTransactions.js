import React, {useState, useEffect } from 'react';
import Web3 from 'web3';

let web3 = new Web3(Web3.providers.HttpProvider("https://eth-mainnet.alchemyapi.io/v2/4RvGTwEA6WDJUNCq-3iCvNNtdXKh1Q8U"))

// Uses ParityAPI to get tx receipts from blocks.
export const GetBlockTransactions = (props) => {
    const { block } = props

    const getBlockReceipts = async (block) => {
        const response = await web3.eth.getBlock(block)

        const data = await response.json();

        console.log(data);
    }

    const [receipts, setReceipts] = useState("Loading...");

    useEffect(() => {
        getBlockReceipts(block);
    }, [block])

    return <h1>test</h1>
}