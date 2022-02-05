import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI_polygon, contractAddress_polygon } from '../utils/constants';

export const ExchangeContext = React.createContext();

// Get MetaMask object from browser window
const { ethereum } = window;

// Function to obtain the contract
const getPolygonContract = () => {
    // Get Access to the blockchain node via web3provider
    const provider = new ethers.providers.Web3Provider(ethereum);
    // Get access to a signer to sign transactions
    const signer = provider.getSigner();
    // Fetch the contract and store it
    const exchangeContract = new ethers.Contract(contractAddress_polygon, contractABI_polygon, signer);
    // Return contract
    return exchangeContract;
}

export const ExchangeProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [formData, setFormData] = useState({ receiver: '', amount: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [exchangeCount, setExchangeCount] = useState(localStorage.getItem('exchangeCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value}));
    }

    const getTransactions = async () => {
        try {
            if(!ethereum) return alert("Please connect your MetaMask Wallet");
            
            const exchangeContract = getPolygonContract();
            const availableTransactions = await exchangeContract.getTransactions();

            const organizedTransactions = availableTransactions.map((transactions) => ({
                sender: transactions.sender,
                receiver: transactions.receiver,
                amount: parseInt(transactions.amount._hex) / (10 ** 18),
                message: transactions.message,
                time: new Date(transactions.time.toNumber() * 1000).toLocaleString(),
            }))

            console.log(organizedTransactions);
            setTransactions(organizedTransactions);

        } catch (error) {
            console.log(error);
        }
    }

    const checkWalletConnection = async () => {
        try {
            if(!ethereum) return alert("Please connect your MetaMask Wallet");
            
            const wallets = await ethereum.request({ method: 'eth_accounts' });
    
            if(wallets.length) {
                setConnectedAccount(wallets[0]);
    
                getTransactions();

                window.reload();

            } else {
                console.log("No wallets connected.");
            }
        } catch (error) {
            console.log(error);
            throw new Error("Cannot connect wallet.");
        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            const exchangeContract = getPolygonContract();
            const exchangeCount = await exchangeContract.getExchangeCounter();

            window.localStorage.setItem("exchangeCount", exchangeCount)
        } catch (error) {
            console.log(error);
            throw new Error("Cannot send crypto")
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please connect your MetaMask Wallet");
        
            const wallets = await ethereum.request({ method: 'eth_requestAccounts' });

            setConnectedAccount(wallets[0]);
        } catch (error) {
            console.log(error);
            throw new Error("Cannot connect wallet.");
        }
    }

    const sendCrypto = async () => {
        try {
            if(!ethereum) return alert("Please connect your MetaMask Wallet");

            const { receiver, amount, message } = formData;
            const exchangeContract = getPolygonContract();

            // This converts amount from eth to gwei
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: receiver,
                    gas: '0x5208', // 21000 GWEI = 0.000021 ETH
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await exchangeContract.connectBlockchain(receiver, parsedAmount, message)

            setIsLoading(true);
            console.log(`Transaction ${transactionHash.hash} is Loading...`);
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Transaction ${transactionHash.hash} succeeded!`);

            const exchangeCount = await exchangeContract.getExchangeCounter();

            setExchangeCount(exchangeCount.toNumber());

            window.reload();

        } catch (error) {
            console.log(error);

            throw new Error("Cannot send crypto")
        }
    }

    useEffect(() => {
        checkWalletConnection();
        checkIfTransactionsExist();
    }, [])

    return (
        <ExchangeContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, sendCrypto, transactions, isLoading, }}>
            {children}
        </ExchangeContext.Provider>
    );
}