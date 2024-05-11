"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdOutlineSort } from "react-icons/md";
import { IoClose } from "react-icons/io5";

type NavLinkPropType = {
    route: String,
    children: React.ReactNode
}
const NavLink = ({ route, children }: NavLinkPropType) => {
    return (
        <li
            className={`text-black flex justify-start px-8 md:px-3 text-lg  my-1 bg-gray-100 md:bg-transparent border-rose-600
            `}
        >
            <Link
                className="hover:text-rose-500 hover:font-medium text-black-500 md:text-gray-950 p-1 cursor-pointer box-border font-medium"
                href="/"
            >
                {children}
            </Link>
        </li>
    );
};

export default function Header() {
    const [navActive, setNavActive] = useState<boolean>(false);

    return (
        <>
            <nav className="bg-white flex items-center justify-between px-4 py-1 box-border gap-4 sticky top-0  h-16 z-[99] shadow-lg shadow-gray-200 ">
                <div>
                    <h1 className="text-xl font-bold text-rose-600">ProjectHub</h1>
                </div>
                <div className={`md:w-[85%] lg:w-[70%] md:flex justify-between md:py-1 md:h-full items-center md:static md:flex-row overflow-hidden md:overflow-visible md:px-3 fixed flex-col h-[100vh] transition-all duration-500 delay-0 w-0  ${navActive ? "w-60" : ""
                            } top-0 right-0 bg-gray-100 md:bg-transparent shadow-gray-300 shadow-3xl md:gap-4 gap-1 py-2`}
                    >

                    <ul
                        className="md:w-[80%] flex flex-col justify-between md:flex-row">
                        <div className="w-full flex justify-end md:hidden ">
                            <button
                                className="text-2xl p-3 text-gray-400"
                                onClick={() => setNavActive(false)}
                            >
                                <IoClose />
                            </button>
                        </div>
                        <NavLink route="/">Home</NavLink>
                        <NavLink route="/about">About Us</NavLink>
                        <NavLink route="/services">Services</NavLink>
                        <NavLink route="/products">Products</NavLink>
                        <NavLink route="/contact">Contact Us</NavLink>
                    </ul>
                    <div className="md:w-[20%] flex items-center w-full justify-center pr-2 gap-2 mt-10 md:mt-0">
                        <button
                            className="bg-white border-rose-600 hover:bg-rose-600 hover:text-white shadow-sm border-2  outline-none py-2 px-4 font-bold rounded text-rose-600 flex items-center gap-2 max-w-max"
                        >
                            Login
                        </button>
                        <button
                            className="bg-rose-600 border-2 border-rose-600  hover:bg-rose-700 outline-none py-2 px-4 font-bold rounded text-white flex items-center gap-2 max-w-max "
                        > 
                            Signup
                        </button>
                    </div>
                </div>        
                <button
                        className="text-2xl p-3 text-gray-400 md:hidden"
                        onClick={() => {
                            setNavActive(true);
                        }}
                    >
                        <MdOutlineSort/>
                    </button>
            </nav>
        </>
    );
}