import React, { useState } from 'react'

import { HiMenu } from 'react-icons/hi';
import { IoIosClose } from 'react-icons/io';

import logo from '../../images/logo.png';
import metamask from '../../images/metamask.png';

const NavbarItem = ( {title, props} ) => {
    return (
        <li className={`font-semibold mx-4 cursor-pointer rounded-full hover:text hover:text-[gold] transition ease-in-out ${props}`}>
            {title}
        </li>
    )
}

const Navbar = () => {
    const [toggleBurgerMenu, setToggleBurgerMenu] = React.useState(false);

    const navLinks = ["Home", "Exchange", "Ledger"];

    const connectWallet = () => {

    }

    return (
        <nav className='w-full flex justify-between items-center pl-5 p-4'>
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

                        {navLinks.map( (item, index) => (
                            <NavbarItem key={item + index} title={item} classProps="my-2 text-lg"/>
                        ))}
                    </ul>
                )}
                
            </div>
            
            <div className="md:flex-[0.8] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-42 cursor-pointer"/>
            </div>
            
            <ul className="text-white md:flex hidden flex-row justify-between items-center flex-initial pr-[100px]">
                {navLinks.map( (item, index) => (
                    <NavbarItem title={item} key={item + index} />
                ))}

                <button className="ml-2 flex flex-row my-5 bg-[#EAA635] p-3 rounded-full hover:bg-[#000000] hover:text-white transition ease-in-out hover:ring" type="button" onClick={connectWallet}>
                    <p className="font-semibold">Connect your Wallet </p> <img src={metamask} alt="metamask" className="pl-5 w-12 cursor-pointer"/>
                </button>

            </ul>
        </nav>
    );
}

export default Navbar;