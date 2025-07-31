import React, { useContext, useEffect, useState } from 'react';
import home_logo from '../assets/home-logo1.png'
import RotatingText from '../components/RotatingText';
import right_arrow from '../assets/right-arrow.png'
import diagonal_arrow_rightUp from '../assets/diagonal-arrow-rightUp.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const VerifyEmail = () => {

    axios.defaults.withCredentials = true;

    const navigate = useNavigate()

    const [state, setState] = useState('signup')

    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    const { backendUrl, setIsLoggedIn, getUserData, isVerified, loading } = useContext(AppContext);

    useEffect(() => {
        if (!loading && isVerified) {
            navigate('/')
        }
    }, [isVerified, loading, navigate])

    const inputRefs = React.useRef([])

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('')
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char
            }
        })
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const otpArray = inputRefs.current.map(e => e.value)
            const otp = otpArray.join('')
            const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })
            if (data.success) {
                toast.success(data.message)
                getUserData()
                navigate('/')
            } else {
                toast.warn(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='flex flex-col md:flex-row h-[160vh] md:h-[100vh]'>
            <div className="box h-[50%] md:h-[100%] bg-white p-5 flex gap-3 flex-col w-[100%] md:w-[30%]">
                <div className="brand flex items-center gap-5 mt-10 mb-4">
                    <img src="/main-logo3.png" alt="" className='h-10' />
                    <p className='text-purple-900 font-bold text-[1.8rem]'>Dashify</p>
                </div>
                <p className='text-purple-900 text-[1.2rem]'>Email Verification</p>
                <p className='text-[0.85rem] text-purple-900/90 mt-3'>Enter the 6 digit OTP sent to your email</p>
                <div className="box flex gap-3 my-5" onPaste={handlePaste}>
                    {Array(6).fill(0).map((_, index) => (
                        <input type="text" maxLength='1' key={index} required className='h-10 w-10 rounded-md outline-none bg-purple-900/40 text-purple-900 text-center text-[1rem]'
                            ref={e => inputRefs.current[index] = e}
                            onInput={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)} />
                    ))}
                </div>
                <button className='h-10 bg-purple-900/70 w-[88%] text-white rounded-xl transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-[1.01]' onClick={onSubmitHandler}>
                    Verify email
                </button>
                {!isMobile && <p className='text-gray-400 text-[0.75rem] text-center absolute bottom-5 left-25'>All rights reserved @dashify</p>}
            </div>
            <div className="box h-[50%] md:h-[100%] p-5 w-[100%] md:w-[70%] bg-gradient-to-b from-purple-200 via-purple-300 to-purple-300 flex flex-col items-center justify-center">
                <div className="header pl-3.5 w-88 justify-center absolute top-140 md:top-14 md:left-145 left-1/2 transform -translate-x-1/2 flex flex-col gap-7">
                    <div className="mini-header flex gap-3 w-full items-center">
                        <p className='text-purple-900/70 font-bold text-[1.6rem]'>Organize</p>
                        <RotatingText
                            texts={['Subjects', 'Notes', 'Videos', 'Routines']}
                            mainClassName="px-2 z-50 sm:px-2 md:px-3 bg-purple-900/70 text-white text-[1.5rem] md:text-[2rem] font-bold py-0.5 sm:py-1 md:py-2 w-[65%] md:w-[55%] h-[7vh] md:h-[8vh] justify-center rounded-lg"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: -9 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </div>
                    <p className='font-semibold text-purple-900/50 z-50'>Welcome to Dashify — your personalized academic dashboard.
                        Effortlessly manage subjects, notes, videos, and routines.
                        Stay organized, stay ahead — all in 1 powerful platform.
                    </p>
                    <div className="github flex items-center gap-1 mt-2 md:mt-7">
                        <p className='text-purple-900/70 font-serif underline cursor-pointer'>Explore it's GitHub repo</p>
                        <img src={right_arrow} alt="" className='h-7 opacity-60' />
                    </div>
                </div>
                <img src={home_logo} alt="" className='h-[40vh] md:h-[90vh] absolute md:right-5 mt-60 md:mt-0' />
            </div>
        </div>
    )
}

export default VerifyEmail
