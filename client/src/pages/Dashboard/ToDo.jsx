import { CheckCheck, LeafyGreen, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import home_icon from '../../assets/home-icon.png'

const ToDo = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex flex-col px-5 md:px-10 pt-5 min-h-full'>
      <div className="box w-[100%] mx-auto mb-7">
        <div className="header flex flex-col md:flex-row items-center justify-between mb-3 md:mb-5">
          <p className='text-[1.5rem] text-purple-900/80 font-bold'>Task Manager</p>
          <div className="search flex items-center justify-center gap-3 w-full md:w-[70%] mt-3 md:mt-0">
            <input type="text" placeholder='Add a task' className='h-9 md:h-10 w-[72%] text-purple-900 bg-gray-200/80 rounded-xl p-3 outline-none' />
            <button
              className='border border-purple-700 bg-purple-100 cursor-pointer flex items-center justify-center h-10 w-10 rounded-md text-purple-900 hover:shadow-xl'
              onClick={() => handleAddRoutine(selectedDay)}
            >
              <Plus className='h-6 w-6 opacity-70' />
            </button>
          </div>
          {!isMobile &&
            <button className='cursor-pointer transition-all duration-300 hover:scale-[1.02]' onClick={() => navigate('/')}>
              <img src={home_icon} alt="" className='h-8 opacity-30' />
            </button>}
        </div>
        <div className="display shadow-md rounded-3xl my-7 overflow-hidden">
          <div className="top h-8 bg-purple-800/50 flex items-center gap-2 pl-3">
            <div className="circle h-4 w-4 bg-red-400 rounded-full"></div>
            <div className="circle h-4 w-4 bg-yellow-400 rounded-full"></div>
            <div className="circle h-4 w-4 bg-green-400 rounded-full"></div>
          </div>
          <div className="info">
            <p className='text-center text-gray-400 text-[1.1rem] my-10'>No tasks added yet</p>
          </div>
        </div>
      </div>
      <div className="box w-[100%] flex flex-col">
        <div className="w-full flex min-h-30 mx-auto justify-center">
          <div className="col border border-purple-900 w-[33.3%] rounded-l-xl overflow-hidden">
            <div className="header flex items-center justify-center h-12 border-b-1 border-purple-900 bg-purple-900/60">
              <p className='text-[1.1rem] uppercase font-bold text-white text-shadow-lg'>All tasks</p>
            </div>
            <div className="tasks h-60 overflow-y-auto">
              <p className='text-gray-400 text-center py-20'>No tasks</p>
            </div>
          </div>
          <div className="col border border-purple-900 w-[33.3%]">
            <div className="header flex items-center justify-center h-12 border-b-1 border-purple-900 bg-purple-900/60">
              <p className='text-[1.1rem] uppercase font-bold text-white text-shadow-lg'>Pending tasks</p>
            </div>
            <div className="tasks">
              <p className='text-gray-400 text-center py-20'>No tasks</p>
            </div>
          </div>
          <div className="col border border-purple-900 w-[33.4%] rounded-r-xl overflow-hidden">
            <div className="header flex items-center justify-center h-12 border-b-1 border-purple-900 bg-purple-900/60">
              <p className='text-[1.1rem] uppercase font-bold text-white text-shadow-lg'>Completed tasks</p>
            </div>
            <div className="tasks">
              <p className='text-gray-400 text-center py-20'>No tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDo
