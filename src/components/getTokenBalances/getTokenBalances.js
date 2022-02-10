import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

let web3 = new Web3(Web3.givenProvider || "https://eth-mainnet.alchemyapi.io/v2/4RvGTwEA6WDJUNCq-3iCvNNtdXKh1Q8U")


// Use Moralis API to retrieve token balances.

export const GetTokenBalances = props => {
    const { address } = props

    const getTokens = async address => {

    }

    const [tokens, setTokens] = useState(null)

    return (
        <h2>placeholder</h2>
    )
}