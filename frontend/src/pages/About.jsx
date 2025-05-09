import React from 'react'
import Title from "../components/Title"
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Student-x is your go-to campus marketplace built exclusively for university students. Whether you're looking to buy or sell second-hand items, find a reliable tutor, or discover the perfect dorm, we’ve created one platform that does it all <strong>—FOR STUDENTS - BY STUDENTS—</strong>.
          </p>
          <p>
            From lecture notes to living spaces, Student-x connects you with real needs on campus. Skip the noise, save money, and meet fellow students who are navigating the same journey.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            To empower university students by building a trusted, student-only platform that simplifies campus life. We’re here to make finding help, housing, or a great deal as easy as grabbing a coffee between classes.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>For Students, By Students</b>
          <p className='text-gray-600'>
            We know campus life inside out—because we're students too. Every feature on Student-x is designed with real academic and social needs in mind, creating a platform that truly understands you.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>All-in-One Convenience</b>
          <p className='text-gray-600'>
            No more switching apps for different needs. Whether it’s buying used books, finding a tutor, or renting a dorm, Student-x keeps it all in one place—saving you time, effort, and money.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Secure & Student-Only</b>
          <p className='text-gray-600'>
            Every user is verified through their university email, ensuring a trusted and secure space. You’re connecting only with fellow students—not random strangers from the internet.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
