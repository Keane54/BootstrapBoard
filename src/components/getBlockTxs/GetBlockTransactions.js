import React, {useState, useEffect } from 'react';
import Web3 from 'web3';

let web3 = new Web3(Web3.givenProvider || "https://eth-mainnet.alchemyapi.io/v2/4RvGTwEA6WDJUNCq-3iCvNNtdXKh1Q8U")

// Uses ParityAPI to get tx receipts from blocks.
export const GetBlockTransactions = (props) => {
    const { block } = props

    const getBlockReceipts = async (block) => {
        const response = await web3.eth.getBlock(block)

        console.log(response);

        /* TODO - Set receipts state
        Return in JSX.
        Change CurrentBlock component to use web3 instead of Alchemy API.*/
    }

    const [receipts, setReceipts] = useState("Loading...");

    useEffect(() => {
        getBlockReceipts(block);
    }, [block])

    return <h1>test</h1>
}