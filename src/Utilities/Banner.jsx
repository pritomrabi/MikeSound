import React from 'react'
import { Link } from 'react-router-dom'

const Banner = ({head}) => {
    return (
        <div className='py-20 bg-black items-center '>
            <h1 className='md:text-6xl text-3xl sm:text-5xl uppercase font-bold font-Monrope text-white text-center pb-2'>{head}</h1>
            <div className='text-white text-base md:text-xl font-Lato font-medium justify-center flex gap-2'>
                <Link to="/">Home</Link>
                <span>/</span>
                <p>{head}</p>
            </div>
        </div>
    )
}

export default Banner