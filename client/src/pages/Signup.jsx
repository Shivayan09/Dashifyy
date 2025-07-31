import { useContext, useEffect, useState } from 'react';
import home_logo from '../assets/home-logo1.png'
import RotatingText from '../components/RotatingText';
import right_arrow from '../assets/right-arrow.png'
import diagonal_arrow_rightUp from '../assets/diagonal-arrow-rightUp.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Signup = () => {

    const navigate = useNavigate()

    const [state, setState] = useState('signup')

    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            axios.defaults.withCredentials = true
            if(state==='signup') {
                const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password})
                if(data.success) {
                    setIsLoggedIn(true)
                    getUserData()
                    navigate('/')
                    toast.success("Registered successfully")
                } else {
                    toast.warn(data.message)
                }
            } else {
                const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})
                if(data.success) {
                    setIsLoggedIn(true)
                    getUserData()
                    navigate('/')
                    toast.success("Logged in successfully")
                } else {
                    toast.warn(data.message)
                }
            }
        } catch(error) {
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
                {state === 'login' ?
                    <p className='text-purple-900 text-[1.4rem] mb-5'>Log in to your account</p>
                    :
                    <p className='text-purple-900 text-[1.4rem] mb-5'>Create an account with us</p>}
                {state === 'signup' && <input type="name" placeholder='Full Name' className='h-12 outline-none bg-purple-100 p-5 text-purple-900 rounded-xl'
                onChange={e => setName(e.target.value)}/>}

                <input type="email" placeholder='Email Id' className='h-12 outline-none bg-purple-100 p-5 text-purple-900 rounded-xl' 
                onChange={e => setEmail(e.target.value)}/>

                <input type="password" placeholder='Password' className='h-12 outline-none bg-purple-100 p-5 text-purple-900 rounded-xl'
                onChange={e => setPassword(e.target.value)}/>

                {state === 'login' && <p className='text-purple-900 mt-2 -mb-3 cursor-pointer'>Forgot your password ?</p>}
                <button className='bg-purple-900/70 h-12 rounded-xl text-white cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] mt-4'
                onClick={handleSubmit}>
                    {state === 'login' ? 'Login' : 'Register'}
                </button>
                {state === 'login' ?
                    <p className='text-purple-900 my-2'>Don't have an account? <span className='text-purple-500 underline cursor-pointer' onClick={() => setState('signup')}>Register</span> </p>
                    :
                    <p className='text-purple-900 my-2'>Already have an account? <span className='text-purple-500 underline cursor-pointer' onClick={() => setState('login')}>Login</span> </p>
                }
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
                        <img src={right_arrow} alt="" className='h-7 opacity-60'/>
                    </div>
                </div>
                <img src={home_logo} alt="" className='h-[40vh] md:h-[90vh] absolute md:right-5 mt-60 md:mt-0' />
            </div>
        </div>
    )
}

export default Signup
