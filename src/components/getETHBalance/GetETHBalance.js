import React, {useState} from "react";

export const GetEthBalance = () => {

    // Sets initial eth balance to 0.
    const [ethBalance, setEthBalance] = useState("0");
    const [address, setAddress] = useState("")
    const [validAddress, setValidAddress] = useState("Enter an Ethereum address.");

    const getEthereumBalance = async () => {

        const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=5KF5PBYTPZ4DD21G8KUT3QAR9W7DM8SDTC`);

        const data = await response.json();

        // If API returns error set eth balance to 0.
        if (data.status !== "1") {
            console.log("Invalid Address Format");

            setEthBalance("0");
            setValidAddress("Invalid Address Format");

            return;
        };

        // Converts balance from wei to eth and reduces to 3 decimal places.
        const balance = parseFloat(data.result / 1e18).toFixed(3);
        
       setEthBalance(balance);
       setValidAddress(address);
    }

    // Handle typed text changing.
    const handleChange = (event) => {
        setAddress(event.target.value);
    }

    // Handler for form submission.
    const handleSubmit = (event) => {
        event.preventDefault();
        getEthereumBalance();
        setAddress("")
    }

    return (<div className="user-balance-container">
        <form onSubmit={handleSubmit} >
        <input type="text" value={address} placeholder="Enter an Ethereum Address" onChange={handleChange} />
        <input type="submit"/>
    </form>
    
    <h2>Address: {validAddress}</h2>
    <h2>Balance: {ethBalance}Ξ</h2></div>)
}