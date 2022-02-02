import React, { useContext, useState } from 'react'
import { ExchangeContext } from "../context/ExchangeContext";

import { HiMenu } from 'react-icons/hi';
import { IoIosClose } from 'react-icons/io';

import customerLogo from '../../images/BBlogo.png'
import logo from '../../images/logo.png';
import metamask from '../../images/metamask.png';

import { homeButton, exchangeButton, ledgerButton } from '../utils/navigation';

/*
const NavbarItem = ( {title, props} ) => {
    return (
        <button className={`font-semibold mx-4 cursor-pointer rounded-full hover:text hover:text-[gold] transition ease-in-out ${props}`}>
            {title}
        </button>
    )
}
*/

const Navbar = () => {
    const [toggleBurgerMenu, setToggleBurgerMenu] = React.useState(false);

    const { connectWallet, connectedAccount } = useContext(ExchangeContext);

    const navLinks = ["Home", "Exchange", "Ledger"];

    return (
        <nav className='w-full flex justify-between items-center pl-5 p-4'>
            {/*
            <div className="flex relative">
                
                {toggleBurgerMenu
                 ? <IoIosClose fontSize={32} className="text-white md:hidden cursor-pointer" onClick={() => setToggleBurgerMenu(false)}/>
                 : <HiMenu fontSize={32} className="mr-5 text-white md:hidden cursor-pointer hover:text-[black]" onClick={() => setToggleBurgerMenu(true)}/> }
                
                {toggleBurgerMenu && (
                    <ul
                        className="z-10 fixed top-0 -left-2 p-3 w-[65vw] h-full shadow-2xl md:hidden list-none
                         flex flex-col justify-start items-start rounded-md blue-glass text-white animate-slide-in
                        ">
                        <li className="text-[50px] pb-3 w-full my-2">
                            <IoIosClose className="hover:text-[black]" onClick={() => setToggleBurgerMenu(false)} />
                        </li>

                        {/*navLinks.map( (item, index) => (
                            <NavbarItem key={item + index} title={item} classProps="my-2 text-lg"/>
                        ))}

                        <button onClick={homeButton}
                            className="font-semibold mx-4 cursor-pointer rounded-full hover:text hover:text-[gold] transition ease-in-out my-2 text-lg">
                                Home
                        </button>
                        <button onClick={exchangeButton}
                            className="font-semibold mx-4 cursor-pointer rounded-full hover:text hover:text-[gold] transition ease-in-out my-2 text-lg">
                                Exchange
                        </button>
                        <button onClick={ledgerButton}
                            className="font-semibold mx-4 cursor-pointer rounded-full hover:text hover:text-[gold] transition ease-in-out my-2 text-lg">
                                Ledger
                        </button>

                    </ul>
                )}
                
            </div>

                    */}
            
            <div className="md:flex-[0.8] flex-initial flex-row justify-center items-center md:pl-20">
                <img src={logo} alt="logo" className="w-42 cursor-pointer"/>
            </div>
            
            <ul className="text-white md:flex hidden flex-row justify-between items-center flex-initial pr-[100px]">
                
                {/*navLinks.map( (item, index) => (
                    <NavbarItem title={item} key={item + index} />
                ))*/}

                <button onClick={homeButton}
                    className="font-semibold mx-4 cursor-pointer rounded-full hover:text hover:text-[gold] transition ease-in-out">
                        Home
                </button>
                <button onClick={exchangeButton}
                    className="font-semibold mx-4 cursor-pointer rounded-full hover:text hover:text-[gold] transition ease-in-out">
                        Exchange
                </button>
                <button onClick={ledgerButton}
                    className="font-semibold mx-4 cursor-pointer rounded-full hover:text hover:text-[gold] transition ease-in-out">
                        Ledger
                </button>

                {!connectedAccount && (
                    <button className="ml-2 flex flex-row my-5 bg-[#ECD032] p-3 rounded-full hover:bg-[#000000] text-black hover:text-white transition ease-in-out hover:ring" 
                            type="button" 
                            onClick={connectWallet}>
                        <p className="font-semibold">Connect your Wallet </p> <img src={metamask} alt="metamask" className="pl-5 w-12 cursor-pointer"/>
                    </button>
                )}
                

            </ul>
        </nav>
    );
}

export default Navbar;