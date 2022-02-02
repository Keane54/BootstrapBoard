import React, { useEffect, useState } from "react";
import { SecondsUntilNextBlock } from "../secondsToNextBlock/SecondsUntilNextBlock";

export const CurrentBlock = () => {

    // Fetches current blocknumber from Alchemy API.
    const getCurrentBlock = async () => {

        const response = await fetch(`https://eth-mainnet.alchemyapi.io/v2/4RvGTwEA6WDJUNCq-3iCvNNtdXKh1Q8U`, {
            method: "POST",
            body: JSON.stringify({"jsonrpc":"2.0",
            "method":"eth_blockNumber",
            "params":[],
            "id":0})
        });

        const dataHex = await response.json();

        // Convert data from hexadecimal to integer.
        const data = parseInt(dataHex.result, 16);

        setBlockNum(data);
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
        <h1>Block: {blockNum}</h1>

        <SecondsUntilNextBlock currentBlock={blockNum} />
        </div>)
}