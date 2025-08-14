import React, { useState, useEffect } from 'react'
import subject_icon from '../assets/subject-icon.png'
import routine_icon from '../assets/routine-icon.png'
import chatbot_icon from '../assets/chatbot-icon.png'
import contact_icon from '../assets/contact-icon.png'
import analytics_logo from '../assets/analytics-logo.png'
import user_icon from '../assets/user-icon-white.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { List, Menu } from 'lucide-react'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/')[2] || 'subjects'
  const [active, setActive] = useState(currentPath)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setSidebarOpen(!mobile)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClick = (item, path) => {
    setActive(item)
    navigate(path)
    if (isMobile) setSidebarOpen(false)
  }

  const menuItems = [
    { id: 'subjects', label: 'Subjects', icon: subject_icon, path: '/dashboard/subjects' },
    { id: 'routine', label: 'Routine', icon: routine_icon, path: '/dashboard/routine' },
    { id: 'todo', label: 'Tasks', icon: <List size={22} className='text-white h-7 w-7 opacity-90' />, path: '/dashboard/todo' },
    { id: 'analytics', label: 'Analytics', icon: analytics_logo, path: '/dashboard/analytics' },
    { id: 'contact', label: 'Contact', icon: contact_icon, path: '/dashboard/contact' },
    {id: 'account', label: 'Account', icon: user_icon, path: '/dashboard/account'},
  ]

  const renderSidebarContent = () => (
    <>
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
        <p className='text-[1.15rem] lg:text-[1.35rem] font-bold uppercase text-white'>Dashboard</p>
      </div>

      <div className="items flex flex-col gap-2 mt-10">
        {menuItems.map(({ id, label, icon, path }) => (
          <div
            key={id}
            className={`box h-12 flex gap-2 rounded-xl cursor-pointer items-center px-3 transition-colors duration-200 ${active === id ? 'bg-purple-900/50' : ''}`}
            onClick={() => handleClick(id, path)}
          >
            {typeof icon === 'string' ? (
              <img src={icon} alt={`${label} icon`} className='h-7 opacity-90' />
            ) : (
              <div className="icon flex items-center justify-center h-8 w-8 opacity-90">{icon}</div>
            )}
            <p className={`font-semibold ${active === id ? 'text-white text-shadow-lg' : 'text-gray-300/90'}`}>{label}</p>
          </div>
        ))}
      </div>
    </>
  )

  return (
    <>
      {isMobile && (
        <div className="fixed top-4 left-4 z-50 text-purple-900 cursor-pointer">
          <Menu size={28} onClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
      )}
      {isMobile && (
        <>
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className={`fixed top-0 left-0 h-full w-56 bg-purple-900/85 p-6 z-50 transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {renderSidebarContent()}
          </div>
        </>
      )}

      {!isMobile && (
        <div className="fixed z-50 top-0 left-0 h-screen w-1/5 p-6 bg-purple-900/85">
          {renderSidebarContent()}
        </div>
      )}
    </>
  )
}

export default Sidebar
