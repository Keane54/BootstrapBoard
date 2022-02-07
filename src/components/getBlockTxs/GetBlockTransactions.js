import React, {useState, useEffect } from 'react';
import Web3 from 'web3';
import { Container, Row, Col } from 'react-bootstrap';

let web3 = new Web3(Web3.givenProvider || "https://eth-mainnet.alchemyapi.io/v2/4RvGTwEA6WDJUNCq-3iCvNNtdXKh1Q8U")

// Uses ParityAPI to get tx receipts from blocks.
export const GetBlockTransactions = (props) => {
    const { block } = props;

    const getBlockReceipts = async (block) => {
        const response = await web3.eth.getBlock(block)

        console.log(response);

        setTxReceipts(response);
        setLoading(false)
        /* TODO - Change CurrentBlock component to use web3 instead of Alchemy API.*/
    };

    const [txReceipts, setTxReceipts] = useState("Loading...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlockReceipts(block);
    }, [block]);

    // Destructure state.
    const { transactions } = txReceipts;


    return (<Container>
                <ul>
                { loading === true ? "Loading..." :  transactions.map((transaction) => {
                        return (
                            <li>{ transaction.replace(transaction.substring(10, 56), ".....")}</li>
                        )
                    }
                )}
                </ul>

    </Container>)
}