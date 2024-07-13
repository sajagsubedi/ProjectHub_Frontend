"use client"
import Link from "next/link"
import {useState} from "react"

export default function Page() {
  const [formdata,setFormdata]=useState({
    name:"",
    email:"",
    password:"",
    confpassword:"",
  })
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
    setFormdata((data)=>({...data,[e.target.name]:e.target.value}))
  }
    return (
        <section className="text-gray-600 body-font px-6 pt-20 flex justify-center">
                <div className="w-full sm:w-[325px] flex flex-col">
                    <h2 className=" text-2xl md:text-3xl mb-4 font-bold title-font text-left ">
                        Get <span className="text-rose-600">Started</span> with us
                    </h2>
                    
                    <div className="relative mb-4">
                        <label
                        htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formdata.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                           className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label
                        htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formdata.email}
                            onChange={handleChange}
                            placeholder="johndoe@exampe.com"
                           className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label
                            htmlFor="password"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formdata.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    
                    <div className="relative mb-4">
                        <label
                            htmlFor="password"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confpassword"
                            name="confpassword"
                            value={formdata.confpassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-white rounded border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <button className="text-white bg-rose-600 border-0 py-2 px-6 focus:outline-none hover:bg-rose-700 rounded text-lg">
                        Signup
                    </button>
                  <div className="mt-5 flex items-center gap-2 justify-center text-gray-500"><hr className="w-[175px] h-[2px] bg-gray-200" />or<hr className="w-[175px]  h-[2px] bg-gray-200" /></div>
                   <p className="flex gap-2 justify-end 
                    mt-6">Already have a account? 
                    <Link className="text-rose-500 underline" href="/signin">Signin</Link>
                    </p>
                </div>
        </section>
    );
}