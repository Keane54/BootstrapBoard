import React, {useState, useEffect } from 'react';
import Web3 from 'web3';
import { Container } from 'react-bootstrap';

let web3 = new Web3(Web3.givenProvider || "https://eth-mainnet.alchemyapi.io/v2/4RvGTwEA6WDJUNCq-3iCvNNtdXKh1Q8U")

// Uses ParityAPI to get tx receipts from blocks.
export const GetBlockTransactions = (props) => {
    const { block } = props;

    const getBlockReceipts = async (block) => {
        const response = await web3.eth.getBlock(block)

        console.log(response);

        setTxReceipts(response);
        setLoading(false)
    };

    const [txReceipts, setTxReceipts] = useState("Loading...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlockReceipts(block);
    }, [block]);

    // Destructure state.
    const { transactions } = txReceipts;


    return (<Container className='p-0 d-flex flex-column'>
                { loading === true ? "Loading..." :  transactions.map((transaction) => {
                        return (
                            <p key={transaction}>{ transaction.replace(transaction.substring(10, 56), ".....")}</p>
                        )
                    }
                )}
    </Container>)
}