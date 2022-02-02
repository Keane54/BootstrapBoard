import React, {useEffect, useState} from 'react';
import { ERC20Transfer, UniswapSwap, AddRemoveLP } from '../estimatedTxCosts/EstimatedTxCosts';
import { ToggleButton } from '../toggleButton/ToggleButton';
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

export const EthAndGasPrice = () => {

    // Pings etherscan API for gas oracle.
    const getGas = async () => {
        const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=5KF5PBYTPZ4DD21G8KUT3QAR9W7DM8SDTC`);
        
        const data = await response.json();

        // If call is unsuccessful, return and keep previous data displayed.
        if (data.status !== "1") {
            return;
        }
                    
        setGasPrice(data.result)
    };

    const [gasPrice, setGasPrice] = useState(() => getGas());

    // Pings API every 15 seconds.
    useEffect(() => {
        setInterval(() => getGas(), 15000);
    }, []);

    // Pings etherscan API for ETH price in USD and BTC.
    const fetchETHPrice = async () => {

        const response = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=5KF5PBYTPZ4DD21G8KUT3QAR9W7DM8SDTC`)

        const data = await response.json();

        // If call is unsuccessful, return and keep previous data displayed.
        if (data.status !== "1") {
            return;
        }
        
        setETHPrice(data.result);
        setLoading(false)
    }

    const [ethPrice, setETHPrice] = useState(() => fetchETHPrice());
    const [isLoading, setLoading] = useState(true)

    // Pings API every 30 seconds to retrieve updated ETH prices.
    useEffect(() => {
        setInterval(() => {
            fetchETHPrice()
        }, 30000)
    }, [])

    // Prop object to easily pass to children.
    const props = {
        gasPrice: gasPrice.ProposeGasPrice,
        ethPrice: ethPrice.ethusd
    }

    const [isUSD, setIsUSD] = useState(true)

    // Handler passed to child to allow user to switch between USD or BTC price.
    const changeDenomination = () => {
        setIsUSD(!isUSD);
    }

    // Empty variable to declare with if statement below.
    let price;

    // If loading is true then display "Loading..." - else display eth price.
    if (isLoading === true) {
        price = <h2>Loading...</h2>
    } else {
        price = <h2> ETH Price: {isUSD === true ? `$${ethPrice.ethusd}` : `${ethPrice.ethbtc}₿`}</h2>
    }

    return (<div>
                <Container fluid>
                    <Row>
                        <Col xs={12} sm={4}>
                            <Card border='dark' className='mb-4'>
                                <Card.Header as="h2" className='bg-dark text-light'>Fast Gas</Card.Header>
                                <Card.Body>
                                    <Card.Title>{isLoading === true ? `Loading...` : `${gasPrice.FastGasPrice} Gwei`}</Card.Title>
                                    <Card.Text className='d-flex align-items-center justify-content-center mb-2'>
                                        <Spinner animation="grow" variant="success" size="sm" className='m-2 p-0'/>
                                        +3 Priority
                                    </Card.Text>
                                    <Card.Text>&lt;60s Confirmation Time</Card.Text>
                                </Card.Body>
                                <Card.Footer className="bg-light border-dark">
                                    <Card.Text className="text-muted mb-1">
                                        ERC20 Transfer Cost:
                                    </Card.Text>
                                    <Card.Text>
                                        <ERC20Transfer {...props} />
                                    </Card.Text>
                                </Card.Footer>
                            </Card>
                        </Col>

                        <Col xs={12} sm={4}>
                            <Card border='dark' className='mb-4'>
                                <Card.Header as="h2" className='bg-dark text-light'>Average Gas</Card.Header>
                                <Card.Body>
                                    <Card.Title> {isLoading === true ? `Loading...` : `${gasPrice.ProposeGasPrice} Gwei`}</Card.Title>
                                    <Card.Text className='d-flex align-items-center justify-content-center mb-2'>
                                        <Spinner animation="grow" variant="warning" size="sm" className='m-2 p-0'/>
                                        +2 Priority</Card.Text>
                                    <Card.Text>&lt;60s Confirmation Time</Card.Text>
                                </Card.Body>
                                <Card.Footer className="bg-light border-dark">
                                    <Card.Text className="text-muted mb-1">
                                        Add or Remove LP Cost:
                                    </Card.Text>
                                    <Card.Text>
                                        <AddRemoveLP {...props} />
                                    </Card.Text>
                                </Card.Footer>
                            </Card>
                        </Col>

                        <Col xs={12} sm={4}>
                            <Card border='dark' className='mb-4'>
                                <Card.Header as="h2" className='bg-dark text-light'>Slow Gas</Card.Header>
                                <Card.Body>
                                    <Card.Title>{isLoading === true ? `Loading...` : `${gasPrice.SafeGasPrice} Gwei`}</Card.Title>
                                    <Card.Text className='d-flex align-items-center justify-content-center mb-2'>
                                        <Spinner animation="grow" variant="danger" size="sm" className='m-2 p-0'/>
                                        +1 Priority</Card.Text>
                                    <Card.Text>&lt;60s Confirmation Time</Card.Text>
                                </Card.Body>
                                <Card.Footer className="bg-light border-dark">
                                    <Card.Text className="text-muted mb-1">
                                        DEX Swap Cost:
                                    </Card.Text>
                                    <Card.Text>
                                        <UniswapSwap {...props} />
                                    </Card.Text>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <Container className='d-flex justify-content-center align-items-center mt-5'>
                    {price}
                    <ToggleButton changeDenomination={changeDenomination} isUSD={isUSD}/>
                </Container>
            </div>)
};