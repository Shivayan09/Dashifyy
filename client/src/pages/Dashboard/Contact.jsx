import React from 'react'
import contact_us_icon from '../../assets/contactUs-icon.png'
import contact_us_icon2 from '../../assets/contactUs-icon2.png'
import contact_us_icon3 from '../../assets/contactUs-icon3.png'

const Contact = () => {
  return (
    <div className='flex'>
      <div className="box w-[43%] h-screen py-10 px-10">
        <p className='text-purple-800/80 text-[2rem] font-bold'>Contact us</p>
        <p className='text-purple-900/70 my-6'>Send us an email and we'll get right back to you</p>
        <div className="input-box flex flex-col gap-3">
          <input type="text" placeholder='Full Name' className='outline-none bg-purple-100 h-12 w-full rounded-xl text-purple-900 p-2' />
          <input type="email" placeholder='Email' className='outline-none bg-purple-100 h-12 w-full rounded-xl text-purple-900 p-2' />
          <textarea type="email" placeholder='Message' className='outline-none h-40 bg-purple-100 w-full rounded-xl text-purple-900 p-2' />
        </div>
        <button className='h-12 w-full bg-purple-900/70 my-5 rounded-xl text-white cursor-pointer transition-all duration-300 hover:shadow-md'>
          Send email
        </button>
      </div>
      <div className="box w-[57%] h-screen flex items-center justify-center">
        <img src={contact_us_icon3} alt="" className='opacity-80 h-[80vh]' />
      </div>
    </div>
  )
}

export default Contact
