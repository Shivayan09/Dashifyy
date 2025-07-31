import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeButton = () => {
    
    const navigate = useNavigate()

    return (
        <div>
            <div className="to-home h-10 w-30 bg-purple-900/70 text-white text-[0.9rem] flex items-center justify-center fixed top-5 left-5 rounded-xl cursor-pointer"
                onClick={() => navigate('/')}>
                Back to home
            </div>
        </div>
    )
}

export default HomeButton
