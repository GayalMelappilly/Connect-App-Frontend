import React from 'react'
import { FaGithubSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <div className='h-auto bg-neutral-950 flex py-10 justify-between px-32 max-md:px-10 max-md:relative'>
            <div className=''>
                <h1 className='text-white text-5xl pt-3  roboto    max-md:text-4xl max-sm:text-3xl'>Get in Touch</h1>
                <div className='flex pt-2'>
                    <FaGithubSquare className='text-yellow-100 max-md:h-10' size={50} />
                    <FaInstagramSquare className='text-yellow-100 max-md:h-10' size={50} />
                    <FaLinkedin className='text-yellow-100 max-md:h-10' size={50} />
                </div>
            </div>
            {/* <div className='max-md:mx-10'></div> */}
            <div className='flex pt-3'>
                <h1 className='text-white text-4xl roboto max-md:text-3xl max-sm:text-2xl'>Contact Me</h1>
            </div>
        </div>
    )
}

export default Footer