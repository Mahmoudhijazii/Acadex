import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-24 cursor-pointer' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                © 2025 Student-X. All rights reserved. Designed for university students to connect, share, and thrive.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-4 mt-4'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>Dorms</li>
                    <li>Courses</li>
                    <li>Dorms</li>
                    <li>About us</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5 mt-4'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>

                    <li>+ 03123123</li>
                    <li>Student-X@gmail.com</li>

                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>
                Copyright 2024@ Student-X.com - All Right Reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer