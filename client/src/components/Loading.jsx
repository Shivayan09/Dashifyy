import React from 'react'
import ConstellationBackground from './ConstellationBackground'
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <ConstellationBackground />
            <motion.div
                className="w-10 h-10 border-2 border-purple-900/70 border-t-transparent rounded-full animate-spin"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
            ></motion.div>
        </div>
    )
}

export default Loading
