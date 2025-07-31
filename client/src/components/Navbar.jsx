import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bars_icon from '../assets/bars_icon_black.png'
import home_icon from '../assets/home-icon.png'
import subject_icon from '../assets/subject-icon.png'
import chatbot_icon from '../assets/chatbot-icon.png'
import contact_icon from '../assets/contact-icon.png'
import { Menu } from 'lucide-react'

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
    document.body.style.overflow = !isSidebarOpen ? 'hidden' : 'auto'
  }

  const handleResize = () => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    if (!mobile) {
      setIsSidebarOpen(false)
      document.body.style.overflow = 'auto'
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleNavigate = (path) => {
    navigate(path)
    setIsSidebarOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <div className='fixed z-50 md:bg-purple-950/70 top-4.5 md:top-3 md:left-1/2 md:translate-x-[-50%] w-[50%] md:w-[60%] mx-auto h-10 md:h-12 md:shadow-md rounded-xl mt-2'>
        {isMobile ? (
          <div className="fixed top-4 left-4 z-50 text-purple-900 cursor-pointer">
            <Menu size={28} onClick={toggleSidebar} />
          </div>
        ) : (
          <ul className='flex h-full items-center justify-between px-10 text-white/90 font-semibold'>
            <li className="relative group hover:cursor-pointer" onClick={() => navigate('/')}>
              Home
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative group hover:cursor-pointer" onClick={() => navigate('/dashboard')}>
              Dashboard
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative group hover:cursor-pointer" onClick={() => navigate('/dashboard/todo')}>
              Task Manager
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
            <li className="relative group hover:cursor-pointer" onClick={() => navigate('/dashboard/contact')}>
              Contact
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
        )}
      </div>

      {isMobile && (
        <div className={`fixed top-0 left-0 h-full w-full z-40 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div
            className="absolute inset-0"
            onClick={toggleSidebar}
          ></div>
          <div className="relative bg-purple-900/80 w-50 h-full p-6 z-50">
            <div className="header flex gap-3 items-center my-5">
              <div className="logo flex flex-col gap-1">
                <div className="row flex gap-1 flex-row">
                  <div className="box border border-white h-2 w-2"></div>
                  <div className="box border border-white h-2 w-2"></div>
                </div>
                <div className="row flex gap-1">
                  <div className="box border border-white h-2 w-2"></div>
                  <div className="box border border-white h-2 w-2"></div>
                </div>
              </div>
              <p className='text-[1.35rem] font-bold uppercase text-white/90'>Dashify</p>
            </div>

            <div className="flex flex-col gap-2 mt-10">
              <div
                className="h-12 flex gap-2 items-center rounded-xl px-3 cursor-pointer hover:bg-purple-900/70"
                onClick={() => handleNavigate('/dashboard')}
              >
                <img src={subject_icon} alt="dashboard" className='h-8 opacity-90' />
                <p className="text-white/90 font-semibold">Dashboard</p>
              </div>
              <div
                className="h-12 flex gap-2 items-center rounded-xl px-3 cursor-pointer hover:bg-purple-900/70"
                onClick={() => handleNavigate('/dashboard/chatbot')}
              >
                <img src={chatbot_icon} alt="chatbot" className='h-8 opacity-90' />
                <p className="text-white/90 font-semibold">ChatBot</p>
              </div>
              <div
                className="h-12 flex gap-2 items-center rounded-xl px-3 cursor-pointer hover:bg-purple-900/70"
                onClick={() => handleNavigate('/dashboard/contact')}
              >
                <img src={contact_icon} alt="contact" className='h-8 opacity-90' />
                <p className="text-white/90 font-semibold">Contact</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Navbar
