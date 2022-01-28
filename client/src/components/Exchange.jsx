import React, { useContext } from 'react'
import { ExchangeContext } from "../context/ExchangeContext";

import { FaEthereum } from 'react-icons/fa'
import metamask from '../../images/metamask.png';

const Input = ({ placeholder, name, type, amount, handleChange }) => (
    <input 
        placeholder={placeholder} 
        name={name}
        type={type} 
        step="0.0001" 
        amount={amount} 
        onChange={(e) => handleChange(e, name)} 
        className="my-2 w-full rounded-sm p-2 outline-none text-white hover:border-solid hover:border-sky-500 border text-1xl black-glass">
    </input>
)

const Exchange = () => {
    const { connectWallet, connectedAccount, formData, handleChange, sendCrypto } = useContext(ExchangeContext);

    const handleSubmit = (e) => {
        const { recipient, amount, message } = formData

        e.preventDefault();

        if(!recipient || !amount || !message) return (console.log("lul"));

        sendCrypto();
    }

    const LoadingAnimation = () => {
        return (
            <div className="flex justify-center items-center py-3">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-700"/>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full mt-20 items-center">

            <div className="p-10 sm:w-96 md:w-[30vw] flex flex-col justify-start items-center blue-glass">
                <p className="text-white text-3xl pb-3">Exchange</p>
                <Input placeholder="Address" name="recipient" type="text" handleChange={handleChange}/>
                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
                <Input placeholder="Message" name="message" type="text" handleChange={handleChange}/>

                <div className="h-[1px] w-full bg-gray-400 my-2">
                </div>

                {false ? (
                    <LoadingAnimation />
                ) : (
                    <button className="md:text-3xl flex flex-row h-[8vh] w-[25vw] md:w-[25vw] justify-center items-center black-glass p-3 rounded-3xl hover:bg-[#0046] hover:text-white transition ease-in-out font-semibold" 
                        type="button" 
                        onClick={handleSubmit}>

                        <p className="pr-2">Send</p>
                        <div className="border-solid border-[1px] rounded-full"> <FaEthereum className="text-[darkgray] md:text-3xl m-1"/></div>
                    </button>
                )}


            </div>

            {!connectedAccount && (
                <button className="flex flex-row justify-center items-center my-5 bg-[gold] p-3 rounded-full cursor-pointer hover:bg-[#000000] hover:text-white transition ease-in-out hover:ring" 
                        type="button" 
                        onClick={ connectWallet }>

                        <p className="font-semibold">Connect your Wallet</p> <img src={metamask} alt="metamask" className="pl-5 w-12 cursor-pointer"/>
                </button>
            )} 
        </div>
    );
}

export default Exchange;