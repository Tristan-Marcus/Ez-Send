import React, { useContext } from 'react';

import { ExchangeContext } from '../context/ExchangeContext';

import { shortenString } from '../utils/shortenString';

const EthereumTransactionCard = ({ sender, receiver, time, message, amount }) => {
    return (
        <div className="bg-[#181918] m-4 flex flex-1
          2xl:min-w-[450px]
          2xl:max-w-[500px]
          sm:min-w-[270px]
          sm:max-w-[300px]
          flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/${sender}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">From: {shortenString(sender)}</p>
                    </a>

                    <a href={`https://ropsten.etherscan.io/address/${receiver}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">To: {shortenString(receiver)}</p>
                    </a>

                    <p className="text-white text-base">Amount: {amount} ETH</p>
                    {message && (
                        <>
                         <br/>
                         <p className="text-white text-base">Message: {message}</p>
                        </>
                    )}

                    <div className="bg-black p-3 px-5 w-man rounded-3xl mt-5 shadow-2xl">
                        <p className="text-[gold] font-bold">{time}</p>
                    </div>

                </div>

            </div>
        </div>
    );
}

const PolygonTransactionCard = ({ sender, receiver, time, message, amount }) => {
    return (
        <div className="bg-[#181918] m-4 flex flex-1
          2xl:min-w-[450px]
          2xl:max-w-[500px]
          sm:min-w-[270px]
          sm:max-w-[300px]
          flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://mumbai.polygonscan.com/address/${sender}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">From: {shortenString(sender)}</p>
                    </a>

                    <a href={`https://mumbai.polygonscan.com/address/${receiver}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">To: {shortenString(receiver)}</p>
                    </a>

                    <p className="text-white text-base">Amount: {amount} MATIC</p>
                    {message && (
                        <>
                         <br/>
                         <p className="text-white text-base">Message: {message}</p>
                        </>
                    )}

                    <div className="bg-black p-3 px-5 w-man rounded-3xl mt-5 shadow-2xl">
                        <p className="text-[gold] font-bold">{time}</p>
                    </div>

                </div>

            </div>
        </div>
    );
}

const Ledger = () => {
    const { connectedAccount, ethereumTransactions, polygonTransactions } = useContext(ExchangeContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20">
            <div className="flex flex-col md:p-12 py-12 px-4">
                { connectedAccount ? (
                    <h3 className="text-white text-3xl text-center my-2 sf-font-reg">Latest Transactions</h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2"> Connect your wallet to see the latest transactions</h3>
                )}

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {ethereumTransactions.reverse().map((ethereumTransactions, i) => (
                        <EthereumTransactionCard key={i} {...ethereumTransactions} />
                    ))}
                </div>

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {polygonTransactions.reverse().map((polygonTransactions, i) => (
                        <PolygonTransactionCard key={i} {...polygonTransactions} />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Ledger;