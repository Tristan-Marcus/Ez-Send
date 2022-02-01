import { IoWalletOutline } from "react-icons/io5";
import { FiArrowDownCircle } from 'react-icons/fi'
import { BsArrowLeftRight } from 'react-icons/bs'

const Home = () => {
    

    return (
        <div className="flex flex-col w-full h-screen md:justify-center items-center sf-font">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-18 pt-6 pb-12 px-4">
                <h1 className="text-left md:text-6xl text-4xl text-white">
                    Easily Send Crypto 
                </h1>
            </div>

            <div className="flex flex-row shrink">
                <IoWalletOutline className="md:text-[280px] text-[30vw] text-white"/>
                
                <div className="flex flex-row self-center">
                    <BsArrowLeftRight className="md:text-9xl text-[20vw] text-white ml-5 mr-5 mt-5"/>
                </div>
                
                <IoWalletOutline className="md:text-[280px] text-[30vw] text-white"/>
            </div>
            

            <div className="flex flex-col items-start justify-between md:p-20 py-12 px-4">
                <h1 className="text-left text-2xl text-white pb-3">
                    Connect your MetaMask wallet and send crypto to others
                </h1>
                <div className="self-center text-6xl pt-10">
                    <FiArrowDownCircle className="text-white animate-bounce"/>
                </div>
            </div>
        </div>
    );
}

export default Home;