import React from 'react'
import Image from "next/image"

const HeroSection = () => {
    return (
        <section className="flex w-full md:px-[5vw] px-5 mx-auto relative">
            <div className='w-full md:w-[60%] py-10 md:py-20 flex flex-col items-center gap-8 relative md:static z-50 '>
                <h1 className='text-3xl md:text-4xl text-center text-rose-600 font-extrabold'>Streamline Your Project Workflow with ProjectHub!</h1>
                <p className='text-xl text-gray-700 md:text-gray-500 text-center'>Effortlessly organize, structure, and share your project ideas while keeping UI designs handy. ProjectHub is your all-in-one solution for seamless collaboration and efficient project management. Get started today!</p>
                <div className="flex items-center w-full justify-center pr-2 gap-2 md:mt-10">
                        <button
                            className="bg-white border-rose-600 hover:bg-rose-600 hover:text-white shadow-sm border-2  outline-none py-2 md:px-6 px-3 font-bold rounded text-rose-600 flex items-center gap-2 max-w-max"
                        >
                            Explore More
                        </button>
                        <button
                            className="bg-rose-600 border-2 border-rose-600  hover:bg-rose-700 outline-none py-2 md:px-6 px-3 font-bold rounded text-white flex items-center gap-2 max-w-max "
                        > 
                            Get Started
                        </button>
                    </div>
            </div>
            <div className='w-full md:w-[40%] py-20 absolute md:static max-w-[100vw] left-0 overflow-hidden -z-1 opacity-20 md:opacity-100'>
                <Image src="/banner.jpg" className='w-full' width={600} height={600} alt="banner" />
            </div>
        </section>
    )
}

export default HeroSection
