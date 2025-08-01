import { CheckCheck, LeafyGreen, Plus } from 'lucide-react'
import React from 'react'

const ToDo = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="box w-[100%] md:w-[60%] p-10">
        <div className="header">
          <p className='text-purple-900/80 text-[1.4rem] font-bold uppercase text-center'>Add a task</p>
          <div className="button flex gap-2 w-full my-3">
            <input type="text" placeholder='task' className='h-10 w-[90%] rounded-xl p-3 border text-purple-900 border-purple-400 outline-none bg-white'/>
            <button className='h-10 w-10 border border-purple-400 bg-purple-100 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] flex items-center justify-center rounded-md'>
              <Plus className='h-5 w-5 text-purple-900'></Plus>
            </button>
          </div>
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
      <div className="box w-[100%] h-screen md:w-[40%] flex flex-col">
        <div className="display h-[50%] flex items-center justify-center">
          <div className="box h-[90%] w-[90%] bg-purple-100 rounded-2xl overflow-hidden">
            <div className="header h-[15%] bg-purple-800/50 flex items-center justify-center">
              <p className='text-center text-white font-bold '>✅ Completed tasks</p>
            </div>
            <div className="info h-[70%] my-5 overflow-y-auto">

            </div>
          </div>
        </div>
        <div className="display h-[50%] flex items-center justify-center">
          <div className="box h-[90%] w-[90%] bg-purple-100 rounded-2xl overflow-hidden">
            <div className="header h-[15%] bg-purple-800/50 flex items-center justify-center">
              <p className='text-center text-white font-bold '>⚠️ Pending tasks</p>
            </div>
            <div className="info h-[70%] my-5 overflow-y-auto">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDo
