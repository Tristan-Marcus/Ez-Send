import React, { useContext, useState, useEffect } from 'react'
import { ExchangeContext } from "../context/ExchangeContext";

import { BsChevronDown } from "react-icons/bs";

import ethlogo from '../../images/eth.png';
import polygonlogo from '../../images/matic.png'
import metamask from '../../images/metamask.png';

const Input = ({ placeholder, name, type, amount, handleChange }) => (
    <input 
        placeholder={placeholder} 
        name={name}
        type={type} 
        step="0.0001" 
        amount={amount} 
        onChange={(e) => handleChange(e, name)} 
        className="z-9 relative my-2 w-full rounded-sm p-2 outline-none text-white hover:border-solid hover:border-sky-500 border text-1xl black-glass">
    </input>
)

const Exchange = () => {
    const [useEthereum, setUseEthereum] = useState(true);
    const [usePolygon, setUsePolygon] = useState(false);

    const [open, setOpen] = useState(false);

    const { connectWallet, connectedAccount, formData, handleChange, handleNetworkChange, sendEthereum, sendMatic, isLoading } = useContext(ExchangeContext);

    const handleSubmit = (e) => {
        const { receiver, amount, message } = formData

        e.preventDefault();

        if(!receiver || !amount || !message) return (console.log("Transaction was not sent."));

        if(useEthereum == true) {
            sendEthereum();
        } else {
            sendMatic();
        }
    }

    const LoadingAnimation = () => {
        return (
            <div className="flex justify-center items-center py-3">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-700"/>
            </div>
        );
    }

    function NetworkButton(props) {    
        return (
            <div>
                <button className="sm:[50vw] flex flex-row h-[4vh] w-full justify-center items-center text-center dropdown-button p-3 rounded-3xl hover:bg-[#c1c1ca94] hover:text-white transition ease-in-out font-semibold" onClick={() => setOpen(!open)}>
                    Choose Network 
                    <div className="mt-1 ml-3">
                        <BsChevronDown />
                    </div>
                </button>
    
                {open && props.children}
            </div>
        )
    }

    function DropdownMenu() {
        function DropdownItem(props) {
            return (
                <div className="z-50">
                    {props.children}
                </div>
            )
        }
    
        return (
            <div className="border-2 absolute rounded-md border-slate-900 z-10 flex flex-col h-40 w-[190px] justify-center items-center font-semibold bg-[gray] mt-1">
                <div onClick={ () => {  
                    setUseEthereum(true); 
                    setUsePolygon(false);
                    handleNetworkChange("ropsten");
                    setOpen(!open);
                    }}
                    className="flex h-full cursor-pointer items-center justify-start hover:text-white">
                    <img src={ ethlogo } alt="logo" className="w-[30px] mr-2"/> Ethereum
                </div>
                <div className="h-[1px] w-full bg-gray-400 my-2"/>
                <div onClick={ () => {  
                    setUseEthereum(false); 
                    setUsePolygon(true);
                    handleNetworkChange("mumbai");
                    setOpen(!open);
                    }} 
                     className="flex h-full cursor-pointer items-center justify-start hover:text-white">
                    <img src={ polygonlogo } alt="logo" className="w-[40px] mr-2"/> Polygon
                </div>
            </div>
        )
    }

    function ticker() {
        if(useEthereum === true) 
        {
            return ("(ETH)")
        }
        else {
            return ("(MATIC)")
        }
    }

    return (
        <div className="flex flex-col mt-10 sm:mt-20 w-full md:pt-40 items-center">

            <div className="p-10 sm:w-96 md:w-[30vw] flex flex-col justify-start items-center blue-glass">
                <p className="text-white text-3xl pb-3">Exchange</p>
                <NetworkButton>
                    <DropdownMenu /> 
                </NetworkButton>
                <Input placeholder="Address" name="receiver" type="text" handleChange={handleChange}/>
                <Input placeholder={`Amount ${ticker()}`} name="amount" type="number" handleChange={handleChange}/>
                <Input placeholder="Message" name="message" type="text" handleChange={handleChange}/>

                <div className="h-[1px] w-full bg-gray-400 my-2">
                </div>

                {isLoading ? (
                    <LoadingAnimation />
                ) : (
                    <button className="md:text-3xl flex flex-row h-[8vh] w-[25vw] md:w-[25vw] justify-center items-center black-glass p-3 rounded-3xl hover:bg-[#0046] hover:text-white transition ease-in-out font-semibold" 
                        type="button" 
                        onClick={handleSubmit}>

                        <p className="pr-2">Send</p>
                        {/*<div className="border-solid border-[1px] rounded-full"> <FaEthereum className="text-[darkgray] md:text-3xl m-1"/></div>*/}
                    </button>
                )}


            </div>

            {!connectedAccount && (
                <button className="flex flex-row justify-center items-center my-5 bg-[#ECD032] p-3 rounded-full cursor-pointer hover:bg-[#000000] hover:text-white transition ease-in-out hover:ring" 
                        type="button" 
                        onClick={ connectWallet }>

                        <p className="font-semibold">Connect your Wallet</p> <img src={metamask} alt="metamask" className="pl-5 w-12 cursor-pointer"/>
                </button>
            )} 
        </div>
    );
}

export default Exchange;