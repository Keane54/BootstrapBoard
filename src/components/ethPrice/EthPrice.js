import React, { useState, useEffect} from "react";
import { Button } from "react-bootstrap";

export const EthPrice = () => {
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

    const [isUSD, setIsUSD] = useState(true)

    // Handler passed to child to allow user to switch between USD or BTC price.
    const changeDenomination = () => {
        setIsUSD(!isUSD);
    }

    // Empty variable to declare with if statement below.
    let price;

    // If loading is true then display "Loading..." - else display eth price.
    if (isLoading === true) {
        price = <p className="m-0">Loading...</p>
    } else {
        price = <p className="m-0" onClick={changeDenomination}>{isUSD === true ? `$${ethPrice.ethusd}` : `${ethPrice.ethbtc}₿`}</p>
    }

    return <Button className="mb-0 text-white pb-1 mt-1 btn-outline-light bg-dark">{price}</Button>
}