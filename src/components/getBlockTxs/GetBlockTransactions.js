import React, {useState, useEffect } from 'react';
import Web3 from 'web3';
import { Container } from 'react-bootstrap';

let web3 = new Web3(Web3.givenProvider || "https://eth-mainnet.alchemyapi.io/v2/4RvGTwEA6WDJUNCq-3iCvNNtdXKh1Q8U")

// Uses ParityAPI to get tx receipts from blocks.
export const GetBlockTransactions = (props) => {
    const { block } = props;

    const getBlockReceipts = async (block) => {
        const response = await web3.eth.getBlock(block)

        const responseHashes = response.transactions.slice(0, 15) 

        setHashes(responseHashes);
        setTxReceipts(response.transactions.length)
        setLoading(false)
    };

    const [hashes, setHashes] = useState([])
    const [txReceipts, setTxReceipts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlockReceipts(block);
    }, [block]);

    return (<Container className='p-0 d-flex flex-column align-items-center'>
            <h4 className='mb-3'>Transactions in Block: {txReceipts}</h4>
            <h5>Transaction Sample:</h5>
                { loading === true ? "Loading..." :  hashes.map((transaction) => {
                    const etherscanLink = `https://etherscan.io/tx/${transaction}`
                        return (
                            <a className='w-50 text-center' target='_blank' href={etherscanLink} key={transaction} rel="noreferrer">{ transaction.replace(transaction.substring(10, 56), ".....")}</a>
                        )
                    }
                )}
    </Container>)
}