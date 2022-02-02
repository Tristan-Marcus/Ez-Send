import customerLogo from '../../images/BBlogo.png';
import logo from '../../images/logo.png';

import { homeButton, exchangeButton, ledgerButton } from '../utils/navigation';

const Footer = () => {
    return (
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4">
            <div className="w-full flex sm:flex-row flex-col justify-between items-center">
                <div className="flex flex-[0.5] justify-center items-center">
                    <img src={logo} alt="logo" className="w-40"/>
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <button 
                        onClick={homeButton} 
                        className="text-white text-base text-center mx-2 cursor-pointer">
                            Home
                    </button>
                    <button onClick={exchangeButton}
                        className="text-white text-base text-center mx-2 cursor-pointer">
                        Exchange
                    </button>
                    <button onClick={ledgerButton}
                        className="text-white text-base text-center mx-2 cursor-pointer">
                            Ledger
                    </button>
                    <button onClick={() => {}}
                        className="text-white text-base text-center mx-2 cursor-pointer">
                            Buy NFTs
                    </button>
                    <button onClick={() => {}}
                        className="text-white text-base text-center mx-2 cursor-pointer">
                            Contact
                    </button>
                </div>
            </div>
            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5"/>
            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className="text-white text-sm text-center">@93Studios 2022</p>
                <p className="text-white text-sm text-center">All rights reserved</p>

            </div>
        </div>
    );
}

export default Footer;