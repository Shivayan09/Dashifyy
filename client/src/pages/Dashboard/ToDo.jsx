import { CheckCheck, Delete, DeleteIcon, LeafyGreen, Pencil, Plus } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import home_icon from '../../assets/home-icon.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import delete_icon from '../../assets/delete-icon.png'

const ToDo = () => {

  axios.defaults.withCredentials = true;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const {backendUrl} = useContext(AppContext)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async() => {
    try {
      const {data} = await axios.get(backendUrl + '/api/task/getTasks')
      setTasks(data.tasks)
    } catch(error) {
      toast.error(error.message)
    }
  }

  const handleAdd = async() => {
    try {
      const {data} = await axios.post(backendUrl + '/api/task/addTask', {task: task})
      if(data.success) {
        fetchTasks()
        setTask('')
        toast.success("Task added successfully!")
      }
    } catch(error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='px-5 md:px-10 pt-5 min-h-full'>
      <div className="header flex flex-col md:flex-row items-center justify-between mb-3 md:mb-5">
        <p className='text-[1.5rem] text-purple-900/80 font-bold'>Task Manager</p>
        <div className="search flex items-center justify-center gap-3 w-full md:w-[70%] mt-3 md:mt-0">
          <input type="text" placeholder='Add a task' className='h-9 md:h-10 w-[72%] text-purple-900 bg-gray-200/80 rounded-xl p-3 outline-none'
          onChange={(e) => setTask(e.target.value)}/>
          <button
            className='border border-purple-700 bg-purple-100 cursor-pointer flex items-center justify-center h-10 w-10 rounded-md text-purple-900 hover:shadow-xl'
            onClick={handleAdd}
          >
            <Plus className='h-6 w-6 opacity-70' />
          </button>
        </div>
        {!isMobile &&
          <button className='cursor-pointer transition-all duration-300 hover:scale-[1.02]' onClick={() => navigate('/')}>
            <img src={home_icon} alt="" className='h-8 opacity-30' />
          </button>}
      </div>
      <div className="box h-[70vh] w-[100%] flex items-center justify-center mx-auto mb-7">
        <div className="display shadow-md w-[70%] h-[60vh] rounded-3xl my-7 overflow-hidden">
          <div className="top h-8 bg-purple-800/70 flex items-center gap-2 pl-3">
            <div className="circle h-4 w-4 bg-red-400 rounded-full"></div>
            <div className="circle h-4 w-4 bg-yellow-400 rounded-full"></div>
            <div className="circle h-4 w-4 bg-green-400 rounded-full"></div>
          </div>
          <div className="info">
            {tasks.length===0 ? <p className='text-center text-gray-400 text-[1.1rem] my-10'>No tasks added yet</p>
            :
            (tasks.map((task, index) => (
              <div key={task._id}>
                <div className='border-b border-purple-200 h-14 flex items-center mx-5 justify-between'>
                  <p className='font-semibold text-purple-900/70 text-[1.15rem]'><span className='mx-2'>{index+1}.</span>{task.task}</p>
                  <div className="buttons flex gap-2">
                    <button className='h-7 border w-14 flex items-center justify-center rounded-md border-purple-300 bg-purple-50 transition-all duration-300 hover:scale-[1.02] hover:bg-purple-100 cursor-pointer'>
                      <Pencil className='text-purple-900 h-4 opacity-70'></Pencil>
                    </button>
                    <button className='h-7 border w-14 flex items-center justify-center rounded-md border-purple-300 bg-purple-50 transition-all duration-300 hover:scale-[1.02] hover:bg-purple-100 cursor-pointer'>
                      <img src={delete_icon} alt="" className='h-7 opacity-60'/>
                    </button>
                  </div>
                </div>
              </div>
            )))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDo
