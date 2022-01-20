import { FaEthereum } from 'react-icons/fa'
import metamask from '../../images/metamask.png';

const Input = ({ placeholder, id, type, amount, handleChange }) => (
    <input 
        placeholder={placeholder} 
        id={id}
        type={type} 
        step="0.0001" 
        amount={amount} 
        handleChange={(e) => handleChange(e, recipient)} 
        className="my-2 w-full rounded-sm p-2 outline-none text-white hover:border-solid hover:border-sky-500 border text-1xl black-glass">
    </input>
)

const Exchange = () => {

    const connectWallet = () => {

    }

    return (
        <div className="flex flex-col w-full h-screen items-center">

            <div className="p-10 sm:w-96 md:w-[60vw] flex flex-col justify-start items-center blue-glass">
                <p className="text-white text-3xl pb-3">Exchange</p>
                <Input placeholder="Address" id="recipient" type="text" handleChange={() => {}}/>
                <Input placeholder="Amount (ETH)" id="amount" type="number" handleChange={() => {}}/>
                <Input placeholder="Message" id="message" type="text" handleChange={() => {}}/>

                <div className="h-[1px] w-full bg-gray-400 my-2">
                </div>

                <button className="md:text-3xl flex flex-row h-[8vh] w-[40vw] md:w-[50vw] justify-center items-center black-glass p-3 rounded-3xl hover:bg-[#0046] hover:text-white transition ease-in-out font-semibold" type="button" onClick={connectWallet}>
                        <p className="pr-2">Send</p>
                        <div className="border-solid border-[1px] rounded-full"> <FaEthereum className="text-[darkgray] md:text-3xl m-1"/></div>
                </button>
                
            </div>

            <button className="flex flex-row justify-center items-center my-5 bg-[gold] p-3 rounded-full cursor-pointer hover:bg-[#000000] hover:text-white transition ease-in-out hover:ring" type="button" onClick={connectWallet}>
                    <p className="font-semibold">Connect your Wallet </p> <img src={metamask} alt="metamask" className="pl-5 w-12 cursor-pointer"/>
            </button>
        </div>
    );
}

export default Exchange;