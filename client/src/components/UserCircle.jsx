import React, { useContext, useEffect, useRef, useState } from 'react'
import user_icon from '../assets/user-icon.png'
import user_icon2 from '../assets/user-icon-white.png'
import user_icon3 from '../assets/person_icon.svg'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import email_icon from '../assets/email-icon.png'
import { useNavigate } from 'react-router-dom';

const UserCircle = () => {

  const navigate = useNavigate()

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const [dropDown, setDropDown] = useState(false)

  const containerRef = useRef(null);

  const handleDropDown = () => {
    setDropDown(!dropDown)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedIn(false)
      data.success && setUserData(false)
      toast.success("Logged out successfully")
    } catch (err) {
      toast.error(err.message)
    }
  }

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')
      if (data.success) {
        navigate('/verify-email')
        toast.success(data.message)
      } else {
        toast.warn(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      {isMobile ?
        <div>
          <div className='fixed z-50 h-9 w-9 md:h-12 md:w-12 flex items-center justify-center top-6.5 p-1 bg-purple-100/70 hover:bg-purple-100/50 transition-all duration-200 right-5 border shadow-md cursor-pointer border-purple-400 rounded-full'>
            <img src={user_icon} alt="" className='h-7 md:h-9 opacity-45' />
          </div>
        </div> :
        <div ref={containerRef}>
          <div className='absolute h-9 w-9 md:h-12 md:w-12 flex items-center justify-center top-5 p-1 bg-purple-900/20 hover:bg-purple-900/30 transition-all duration-200 right-5 border shadow-md cursor-pointer border-purple-400 rounded-full
          text-purple-900/80 font-bold text-[1.3rem]' onClick={handleDropDown}>
            {userData?.name?.[0]?.toUpperCase() || ''}
          </div>
          {dropDown &&
            <div className='absolute w-55 z-50 top-20 rounded-2xl bg-purple-300 shadow-2xl right-5 flex flex-col gap-3 items-center justify-center p-5'>
              <div className="user h-16 w-16 rounded-full bg-purple-200/30 flex items-center justify-center text-[1.4rem] text-purple-900/80 font-bold">
                <img src={user_icon2} alt="" className='h-12' />
              </div>
              <p className='text-center text-[1.1rem] text-purple-900/70 font-semibold flex gap-3'>Hi {userData.name} !</p>
              <p className='text-[0.9rem] text-purple-900/70 flex gap-1 items-center justify-center mt-1'> <img src={email_icon} alt="" className='h-5 w-6' /> {userData.email}</p>
              <p className='text-purple-900/50 font-semibold text-[0.9rem] underline text-center cursor-pointer mb-3' onClick={() => navigate('/dashboard')}>Go to your own dashboard</p>
              {!userData.isAccountVerified && <button className='h-8 bg-purple-900/50 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] w-full rounded-md text-[0.9rem] text-white' onClick={sendVerificationOtp}>Verify email</button>}
              <button className='h-8 bg-purple-900/50 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] w-full rounded-md text-[0.9rem] text-white' onClick={logout}>Log Out</button>
            </div>}
        </div>}
    </div>
  )
}

export default UserCircle
