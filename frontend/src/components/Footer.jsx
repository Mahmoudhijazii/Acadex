import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-24 cursor-pointer' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Student-X is your go-to platform for discovering courses, finding dorms, 
                    and connecting with fellow university students. <br/>
                    Built <strong>—FOR STUDENTS - BY STUDENTS—</strong>.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-4 mt-4'>PAGES</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/collection">Collection</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/dorms">Dorms</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5 mt-4'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>

                    <li>+961 76 440 508</li>
                    <li>+961 03 081 381</li>
                    <li>+961 03 655 689</li>
                    <li>+961 81 758 673</li>
                    <li>
                        <a href='mailto:info@student-x.com'>info@student-x.com</a>
                    </li>

                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>
                Copyright 2025@ Student-X.com - All Right Reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer


