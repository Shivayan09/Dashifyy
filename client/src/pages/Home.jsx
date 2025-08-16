import React, { useContext, useEffect, useState } from 'react'
import BrandName from '../components/BrandName'
import Navbar from '../components/Navbar'
import UserCircle from '../components/UserCircle'
import home_logo from '../assets/home-logo1.png'
import home_logo2 from '../assets/home-logo2.png'
import diagonal_arrow_rightUp from '../assets/diagonal-arrow-rightUp.png'
import BgDesign from '../components/BgDesign'
import RotatingText from '../components/RotatingText'
import QnAs from '../components/CollapsibleBoxes'
import tick_logo from '../assets/tick-logo.png'
import BgDesign2 from '../components/BgDesign2'
import notebook_logo from '../assets/notebook.png'
import twitter_logo from '../assets/twitter-logo.png'
import insta_logo from '../assets/insta_logo.png'
import linkedin_logo from '../assets/linkedin_logo.png'
import email_logo from '../assets/email-icon.png'
import DashboardStats from '../components/DashboardStats'
import ConstellationBackground from '../components/ConstellationBackground'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const Home = () => {

  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id='main'>
      <BrandName />
      <Navbar />
      <UserCircle />

      <div className='flex flex-col md:flex-row md:pt-20 bg-purple-100 lg:pt-0'>
        <div data-scroll data-scroll-speed="-1" className="box w-[100%] md:w-[50%] flex items-center justify-center">
          <img src={home_logo} alt="" />
        </div>
        <div className="box w-[100%] md:w-[50%] flex flex-col justify-center gap-7 px-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5}}
          >
            <p className='text-purple-950/80 text-[1.2rem] md:text-[1.4rem] uppercase font-bold'>🎓 Your Personalized Dashboard</p>
          </motion.div>

          {isMobile ?
            <p className='font-semibold text-purple-900/50 text-[0.9rem] md:text-[1.1rem]'>
              Easily manage all your academic content in one streamlined dashboard. Add your subjects, store links
              to lecture videos, upload notes, and keep everything neatly organized.
            </p> :
            <p className='font-semibold text-purple-900/50 text-[0.9rem] md:text-[1.1rem]'>Easily manage all your academic content in one streamlined dashboard. Add your subjects, store links
              to lecture videos, upload notes, and keep everything neatly organized. Whether you're preparing for exams,
              catching up on missed classes, or just staying ahead, this is your go-to space for smart and focused learning.
              Stay in control of your studies - all from one clean, accessible platform.
            </p>}
          <div className="group relative hover:shadow-xl flex justify-center items-center overflow-hidden button h-[7vh] md:h-14 mt-5 bg-purple-800/70 w-[90%] md:w-[60%] mx-auto md:mx-0 
          rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.01]"
            onClick={() => navigate('/dashboard')}>
            <span className="absolute left-0 top-0 h-full w-0 bg-purple-800/30 transition-all duration-500 group-hover:w-full"></span>
            <p className='relative font-semibold text-white'>Get started right now!</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row pt-10 md:mt-0 bg-purple-100 h-fit'>
        <div className="box w-[100%] md:w-[50%] flex flex-col md:pl-16 justify-center gap-10">
          <div className="header flex items-center mx-auto md:mx-0 gap-7 w-[80%]">
            <p className='text-purple-900/80 font-bold text-[1.5rem] md:text-[2rem]'>Store</p>
            <RotatingText
              texts={['Subjects', 'Notes', 'Videos', 'Routines']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-purple-800/70 text-white text-[1.5rem] md:text-[2rem] font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 w-[65%] md:w-[45%] h-[7vh] md:h-[10vh] justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
          <ul className='flex flex-col gap-7 px-10 md:px-0'>
            <li className='text-purple-900/70 font-semibold text-[0.9rem] md:text-[1.1rem] flex items-center gap-3'>
              <div className='h-3 w-3 md:h-4 md:w-4 bg-purple-900/70 rounded-full flex items-center justify-center'>
                <div className='h-1 w-1 md:h-1.5 md:w-1.5 bg-white rounded-full'></div>
              </div>
              Navigate to your Dashboard from the navigation bar
            </li>
            <li className='text-purple-900/70 font-semibold text-[0.9rem] md:text-[1.1rem] flex items-center gap-3'>
              <div className='h-3 w-3 md:h-4 md:w-4 bg-purple-900/70 rounded-full flex items-center justify-center'>
                <div className='h-1 w-1 md:h-1.5 md:w-1.5 bg-white rounded-full'></div>
              </div>
              Click "Add Subject" to begin creating your subject list.
            </li>
            <li className='text-purple-900/70 font-semibold text-[0.9rem] md:text-[1.1rem] flex items-center gap-3'>
              <div className='h-3 w-3 md:h-4 md:w-4 bg-purple-900/70 rounded-full flex items-center justify-center'>
                <div className='h-1 w-1 md:h-1.5 md:w-1.5 bg-white rounded-full'></div>
              </div>
              Select a subject to expand and view its details.
            </li>
            <li className='text-purple-900/70 font-semibold text-[1rem] md:text-[1.1rem] flex items-center gap-3'>
              <div className='h-3 w-3 md:h-4 md:w-4 bg-purple-900/70 rounded-full flex items-center justify-center'>
                <div className='h-1 w-1 md:h-1.5 md:w-1.5 bg-white rounded-full'></div>
              </div>
              Add video links, notes, and routines inside each subject panel.
            </li>
            <li className='text-purple-900/70 font-semibold text-[0.9rem] md:text-[1.1rem] flex items-center gap-3'>
              <div className='h-3 w-3 md:h-4 md:w-4 bg-purple-900/70 rounded-full flex items-center justify-center'>
                <div className='h-1 w-1 md:h-1.5 md:w-1.5 bg-white rounded-full'></div>
              </div>
              Organize and manage your content easily as you study.
            </li>
          </ul>
          <button className='bg-purple-800/70 relative overflow-hidden cursor-pointer transition-all hover:shadow-md hover:scale-[1.01] duration-300 group rounded-2xl group h-12 md:h-14 w-[80%] md:w-[60%] flex justify-center items-center mx-auto md:mx-0'
            onClick={() => navigate('/dashboard')}>
            <span className="absolute left-0 top-0 h-full w-0 bg-purple-800/20 transition-all duration-500 group-hover:w-full"></span>
            <p className='relative font-semibold text-white'>Go to Dashboard right now!</p>
            <img src={diagonal_arrow_rightUp} alt="" className='h-6 relative' />
          </button>
        </div>
        <div data-scroll data-scroll-speed="-1" className="box w-[100%] md:w-[50%] flex items-center justify-center">
          <img src={home_logo2} alt="" className='h-[50vh] md:h-[90vh]' />
        </div>
      </div>

      <div className='flex flex-col md:flex-row bg-purple-100 gap-10 md:gap-0'>
        <div className="box py-5 md:py-20 w-[100%] md:w-[50%] flex flex-col gap-7 items-center md:items-start md:mx-0 px-5 md:pl-10 md:pr-20">
          <QnAs />
        </div>
        <div className="box w-[90%] md:w-[50%] px-10 flex flex-col mx-auto md:mx-0 justify-center">
          <div className="boxes flex gap-7 flex-col">
            <div className="mini-box flex items-center h-16 md:h-20 shadow-md rounded-xl bg-purple-100">
              <div className="circle h-10 w-10 md:h-14 md:w-14 shadow-xl -ml-7 bg-purple-400/70 rounded-full flex text-white justify-center items-center">1</div>
              <p className='text-purple-800/80 text-[0.9rem] md:text-[1.1rem] font-semibold px-5'>Centralized Academic Management</p>
            </div>
            <div className="mini-box flex items-center h-16 md:h-20 shadow-md rounded-xl bg-purple-100">
              <div className="circle h-10 w-10 md:h-14 md:w-14 shadow-xl -ml-7 bg-purple-400/70 rounded-full flex text-white justify-center items-center">2</div>
              <p className='text-purple-800/80 text-[0.9rem] md:text-[1.1rem] font-semibold px-5'>Cloud-Based Accessibility</p>
            </div>
            <div className="mini-box flex items-center h-16 md:h-20 shadow-md rounded-xl bg-purple-100">
              <div className="circle h-10 w-10 md:h-14 md:w-14 shadow-xl -ml-7 bg-purple-400/70 rounded-full flex text-white justify-center items-center">3</div>
              <p className='text-purple-800/80 text-[0.9rem] md:text-[1.1rem] font-semibold px-5'>Live ChatBot to answer doubts</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center bg-purple-100'>
        <DashboardStats />
      </div>

      <div className="footer bg-purple-200 h-fit flex flex-col">
        <div className="main-box flex flex-col md:flex-row w-full justify-evenly">
          <div className="box p-5 flex flex-col">
            <div className="header flex gap-2 items-center mx-auto md:mx-0">
              <img src='/main-logo3.png' alt="" className='h-8' />
              <p className='text-[1rem] text-purple-800/80 uppercase font-bold text-center'>Dashify</p>
            </div>
            <p className='text-purple-900/40 my-2.5 cursor-pointer hover:underline text-[0.9rem] text-center md:text-left'>Cehck out other projects</p>
            <p className='text-purple-900/40 my-2.5 cursor-pointer hover:underline text-[0.9rem] text-center md:text-left'>Check out guide to use</p>
            <p className='text-purple-900/40 my-2.5 cursor-pointer hover:underline text-[0.9rem] text-center md:text-left'>Check out privacy policies</p>
            <p className='text-purple-900/40 my-2.5 cursor-pointer hover:underline text-[0.9rem] text-center md:text-left'>Check out terms of use</p>
            <p className='text-purple-900/40 my-2.5 cursor-pointer hover:underline text-[0.9rem] text-center md:text-left'>Contact the admin</p>
            <button className='bg-purple-900/40 h-10 w-[50%] md:w-[80%] mx-auto md:mx-0 text-white rounded-xl transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:shadow-md'>
              Scroll to top
            </button>
          </div>
          {!isMobile &&
            <div className='flex gap-0 lg:gap-14'>
              <div className="box p-5">
                <p className='text-purple-800/60 font-semibold text-center'>Important Links</p>
                <p className='text-center my-6 text-purple-900/40 cursor-pointer hover:underline'>Home</p>
                <p className='text-center my-6 text-purple-900/40 cursor-pointer hover:underline'>Dashboard</p>
                <p className='text-center my-6 text-purple-900/40 cursor-pointer hover:underline'>ChatBot</p>
                <p className='text-center my-6 text-purple-900/40 cursor-pointer hover:underline'>Contact</p>
                <p className='text-center my-6 text-purple-900/40 cursor-pointer hover:underline'>Email</p>
              </div>
              <div className="box p-5">
                <p className='text-purple-800/60 font-semibold text-center'>My social profiles</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>Instagram</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>GitHub</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>LinkedIn</p>
                <p className='text-purple-800/60 font-semibold text-center'>Other random links</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>IdkLink1</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>IdkLink2</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>IdkLink3</p>
              </div>
              <div className="box p-5">
                <p className='text-purple-800/60 font-semibold text-center'>My social profiles</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>Instagram</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>GitHub</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>LinkedIn</p>
                <p className='text-purple-800/60 font-semibold text-center'>Other random links</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>IdkLink1</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>IdkLink2</p>
                <p className='text-purple-900/40 my-3 cursor-pointer hover:underline text-center'>IdkLink3</p>
              </div>
            </div>
          }
          <div className="box p-5 rounded-xl">
            <p className='text-purple-800/60 font-bold text-center mb-3'>Contact me</p>
            <form className='flex flex-col gap-3'>
              <input type="text" placeholder='Full Name' className='bg-white/20 h-10 outline-none p-3 text-purple-800/70 rounded-md shadow-md' />
              <textarea name="message" placeholder='Your message' id="" className='bg-white/20 outline-none p-3 rounded-md w-full h-34 text-purple-800/70 shadow-md'></textarea>
              <div className='h-10 flex items-center justify-center bg-purple-700/30 rounded-xl text-white cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl'>
                Send message
              </div>
            </form>
          </div>
        </div>
        <div>
          <p className='text-center text-purple-900/50 font-semibold my-3'>Made with ❤️ by Shivayan</p>
        </div>
      </div>
    </div>
  )
}

export default Home
