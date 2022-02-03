import React, { useState, useEffect } from "react";

export const ERC20Transfer = (props) => {

    // Assumed gas limit for ERC20 Transfer.
    const gasLimit = 65000;

    const { gasPrice, ethPrice } = props;

    const [transferCost, setTransferCost] = useState(null);

    // Converts from gwei to eth, multiplies by gas limit and price to retrieve $ figure.
    useEffect(() => {
        const cost = ((gasPrice / 1e9) * gasLimit) * ethPrice;
        setTransferCost(`$${cost.toFixed(2)}`);
    }, [gasPrice, ethPrice])

    return <p className="mb-0">{transferCost === `$NaN` ? `Loading...` : `${transferCost}`}</p>
}

export const UniswapSwap = (props) => {

    // Assumed gas limit for DEX Swap.
    const gasLimit = 200000;

    const { gasPrice, ethPrice } = props;

    const [swapCost, setSwapCost] = useState(null);

    // Converts from gwei to eth, multiplies by gas limit and price to retrieve $ figure.
    useEffect(() => {
        const cost = ((gasPrice / 1e9) * gasLimit) * ethPrice;
        setSwapCost(`$${cost.toFixed(2)}`);
    }, [gasPrice, ethPrice])

    return <p className="mb-0">{swapCost === `$NaN` ? `Loading...` : `${swapCost}`}</p>
}

export const AddRemoveLP = (props) => {

    // Assumed gas limit for adding/removing liquidity.
    const gasLimit = 175000;

    const { gasPrice, ethPrice } = props;

    const [liquidityCost, setLiquidityCost] = useState(null);

    // Converts from gwei to eth, multiplies by gas limit and price to retrieve $ figure.
    useEffect(() => {
        const cost = ((gasPrice / 1e9) * gasLimit) * ethPrice;
        setLiquidityCost(`$${cost.toFixed(2)}`);
    }, [gasPrice, ethPrice])
    
    return <p className="mb-0">{liquidityCost === `$NaN` ? `Loading...` : `${liquidityCost}`}</p>
}