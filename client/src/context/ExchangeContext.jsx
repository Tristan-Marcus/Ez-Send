import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI_eth, contractABI_polygon, contractAddress_polygon, contractAddress_ropsten } from '../utils/constants';

export const ExchangeContext = React.createContext();

const networks = {
    /*
    example: {
        chainId: `0x${Number().toString(16)}`,
        chainName: "",
        nativeCurrency: {
            name: "",
            symbol: "",
            decimals: 18
        },
        rpcUrls: [""],
        blockExplorerUrls: [""]
    },
    */
    ropsten: {
        chainId: `0x${Number(3).toString(16)}`,
        chainName: "Ropsten",
        nativeCurrency: {
            name: "Ropsten Ether",
            symbol: "ROP",
            decimals: 18
        },
        rpcUrls: [`${import.meta.env.VITE_ROPSTEN_RPC}`],
        blockExplorerUrls: ["https://ropsten.etherscan.io"]
    },

    mumbai: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: "Mumbai",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: [`${import.meta.env.VITE_MATIC_RPC}`],
        blockExplorerUrls: ["https://mumbai.polygonscan.com"]
    },

}

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const exchangeContract = new ethers.Contract(contractAddress_ropsten, contractABI_eth, signer);

    return exchangeContract;
}


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
    const [ethereumExchangeCount, setEthereumExchangeCount] = useState(localStorage.getItem('ethereumExchangeCount'));
    const [polygonExchangeCount, setPolygonExchangeCount] = useState(localStorage.getItem('polygonExchangeCount'));
    const [ethereumTransactions, setEthereumTransactions] = useState([]);
    const [polygonTransactions, setPolygonTransactions] = useState([]);
    const [error, setError] = useState();

    const changeNetwork = async ({ networkName, setError }) => {
        try {
            if(!ethereum) throw new Error("Please connect your MetaMask Wallet");

            if(networkName === 'ropsten'){
                await ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [
                        {
                            chainId: '0x3'
                        }
                    ]
                });
            }

            await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks[networkName]
                    }
                ]
            });
        } catch (error) {
            setError(error.message);
            console.log(error)
        }
    }

    const handleNetworkChange = async (networkName) => {
        await changeNetwork({ networkName, setError });

        location.reload();
    }


    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value}));
    }

    const getEthereumTransactions = async () => {
        try {
            if(!ethereum) return alert("Please connect your MetaMask Wallet");
            
            const exchangeContract = getEthereumContract();
            const availableTransactions = await exchangeContract.getTransactions();

            const organizedTransactions = availableTransactions.map((ethereumTransactions) => ({
                sender: ethereumTransactions.sender,
                receiver: ethereumTransactions.receiver,
                amount: parseInt(ethereumTransactions.amount._hex) / (10 ** 18),
                message: ethereumTransactions.message,
                time: new Date(ethereumTransactions.time.toNumber() * 1000).toLocaleString(),
            }))

            //console.log(organizedTransactions);

            setEthereumTransactions(organizedTransactions);
            

        } catch (error) {
            console.log(error);
        }
    }

    
    const getPolygonTransactions = async () => {
        try {
            if(!ethereum) return alert("Please connect your MetaMask Wallet");
            
            const exchangeContract = getPolygonContract();
            const availableTransactions = await exchangeContract.getTransactions();

            const organizedTransactions = availableTransactions.map((polygonTransactions) => ({
                sender: polygonTransactions.sender,
                receiver: polygonTransactions.receiver,
                amount: parseInt(polygonTransactions.amount._hex) / (10 ** 18),
                message: polygonTransactions.message,
                time: new Date(polygonTransactions.time.toNumber() * 1000).toLocaleString(),
            }))

            console.log(organizedTransactions);
            
            setPolygonTransactions(organizedTransactions);

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
    
                getEthereumTransactions();
                getPolygonTransactions();

                //location.reload();

            } else {
                console.log("No wallets connected.");
            }
        } catch (error) {
            console.log(error);
            throw new Error("Cannot connect wallet.");
        }
    }

    const checkIfEthereumTransactionsExist = async () => {
        try {
            const exchangeContract = getEthereumContract();
            const ethereumExchangeCount = await exchangeContract.getExchangeCounter();

            window.localStorage.setItem("ethereumExchangeCount", ethereumExchangeCount)
        } catch (error) {
            console.log(error);
            throw new Error("Cannot send crypto");
        }
    }

    const checkIfPolygonTransactionsExist = async () => {
        try {
            const exchangeContract = getPolygonContract();
            const polygonExchangeCount = await exchangeContract.getExchangeCounter();

            window.localStorage.setItem("polygonExchangeCount", polygonExchangeCount)
        } catch (error) {
            console.log(error);
            throw new Error("Cannot send crypto");
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

    const sendEthereum = async () => {
        try {
            if(!ethereum) return alert("Please connect your MetaMask Wallet");

            const { receiver, amount, message } = formData;
            const exchangeContract = getEthereumContract();

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
            console.log(`Ethereum Transaction ${transactionHash.hash} is Loading...`);
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Ethereum Transaction ${transactionHash.hash} succeeded!`);

            const ethereumExchangeCount = await exchangeContract.getExchangeCounter();

            setEthereumExchangeCount(ethereumExchangeCount.toNumber());

            location.reload();

        } catch (error) {
            console.log(error);

            throw new Error("Cannot send crypto")
        }
    }

    const sendMatic = async () => {
        try {
            if(!ethereum) return alert("Please connect your MetaMask Wallet");

            const { receiver, amount, message } = formData;
            const exchangeContract = getPolygonContract();

            // This converts amount from matic to gwei
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: receiver,
                    gas: '0x5208', // 21000 GWEI = 0.000021 MATIC
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await exchangeContract.connectBlockchain(receiver, parsedAmount, message)

            setIsLoading(true);
            console.log(`Polygon Transaction ${transactionHash.hash} is Loading...`);
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Polygon Transaction ${transactionHash.hash} succeeded!`);

            const polygonExchangeCount = await exchangeContract.getExchangeCounter();

            setPolygonExchangeCount(polygonExchangeCount.toNumber());

            location.reload();

        } catch (error) {
            console.log(error);

            throw new Error("Cannot send crypto")
        }
    }


    useEffect(() => {
        checkWalletConnection();
        checkIfEthereumTransactionsExist();
        checkIfPolygonTransactionsExist();
    }, [])

    return (
        <ExchangeContext.Provider value={{ connectWallet, connectedAccount, formData, setFormData, handleChange, handleNetworkChange, sendEthereum, sendMatic, ethereumTransactions, polygonTransactions, isLoading}}>
            {children}
        </ExchangeContext.Provider>
    );
}