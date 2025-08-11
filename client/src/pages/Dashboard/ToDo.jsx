import { CheckCheck, Pencil, Plus } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import home_icon from '../../assets/home-icon.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import delete_icon from '../../assets/delete-icon.png';
import ConfirmDelete from '../../components/ConfirmDelete';
import { useNavigate } from 'react-router-dom';

const ToDo = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { backendUrl } = useContext(AppContext);

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [deleteId, setDeleteId] = useState(null); // for modal

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/task/getTasks`);
      setTasks(data.tasks);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAdd = async () => {
    if (!task.trim()) {
      toast.warn('Task cannot be empty!');
      return;
    }
    try {
      const { data } = await axios.post(`${backendUrl}/api/task/addTask`, { task });
      if (data.success) {
        fetchTasks();
        setTask('');
        toast.success('Task added successfully!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditedTask(task.task);
  };

  const handleSaveEdit = async (id) => {
    if (!editedTask.trim()) {
      toast.error('Task cannot be empty!');
      return;
    }
    try {
      const { data } = await axios.put(`${backendUrl}/api/task/editTask/${id}`, { task: editedTask });
      if (data.success) {
        toast.success('Task updated successfully!');
        setEditingId(null);
        setEditedTask('');
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggleDone = async (id, currentStatus) => {
    try {
      const { data } = await axios.put(backendUrl + '/api/task/taskStatus/' + id, { isCompleted: !currentStatus })
      if (data.success) {
        toast.success(data.message)
        fetchTasks()
      } else {
        toast.warn(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/task/deleteTask/${deleteId}`);
      if (data.success) {
        toast.success('Task deleted successfully!');
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="px-5 md:px-10 pt-5 min-h-full">
      <div className="header flex flex-col md:flex-row items-center justify-between mb-3 md:mb-5">
        <p className="text-[1.5rem] text-purple-900/80 font-bold">Task Manager</p>
        <div className="search flex items-center justify-center gap-3 w-full md:w-[70%] mt-3 md:mt-0">
          <input
            type="text"
            placeholder="Add a task"
            value={task}
            max={20}
            onChange={(e) => setTask(e.target.value)}
            className="h-9 md:h-10 w-[72%] text-purple-900 bg-gray-200/80 rounded-xl p-3 outline-none"
          />
          <button
            className="border border-purple-700 bg-purple-100 cursor-pointer flex items-center justify-center h-10 w-10 rounded-md text-purple-900 hover:shadow-xl"
            onClick={handleAdd}
          >
            <Plus className="h-6 w-6 opacity-70" />
          </button>
        </div>
        {!isMobile && (
          <button
            className="cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            onClick={() => navigate('/')}
          >
            <img src={home_icon} alt="" className="h-8 opacity-30" />
          </button>
        )}
      </div>

      <div className="box h-[70vh] w-full flex items-center justify-center mx-auto my-12">
        <div className="display shadow-md w-[90%] md:w-[80%] h-[65vh] rounded-3xl my-7 flex flex-col overflow-hidden">

          <div className="top h-8 bg-purple-800/70 flex items-center gap-2 pl-3 flex-shrink-0">
            <div className="circle h-4 w-4 bg-red-400 rounded-full"></div>
            <div className="circle h-4 w-4 bg-yellow-400 rounded-full"></div>
            <div className="circle h-4 w-4 bg-green-400 rounded-full"></div>
          </div>

          <div className="info flex flex-col gap-2 overflow-y-auto mx-5 mt-2">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-400 text-[1.1rem] my-10">
                No tasks added yet
              </p>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="border-b border-purple-200 h-20 md:h-14 flex items-center mx-2 justify-between"
                >
                  {editingId === task._id ? (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-purple-900/70 text-[1.15rem]">
                        {index + 1}.
                      </span>
                      <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        className="font-semibold text-purple-900/70 text-[1.15rem] h-10 p-3 border rounded-xl outline-none"
                      />
                    </div>
                  ) : (
                    <p className={`font-semibold w-[60%] overflow-hidden text-[1rem] md:text-[1.15rem] ${task.isCompleted
                      ? 'text-green-600/60'
                      : 'text-purple-900/70'
                      }`}>
                      <span className="mx-2">{index + 1}.</span>
                      {task.task}
                    </p>
                  )}

                  <div className="buttons flex gap-3 items-center">

                    {editingId === task._id ? (
                      <button
                        onClick={() => handleSaveEdit(task._id)}
                        className="flex items-center justify-center hover:scale-[1.02] cursor-pointer"
                      >
                        <CheckCheck className="text-green-900 h-6 opacity-70" />
                      </button>
                    ) : (
                      <div className='flex'>
                        <button className={`h-8 md:h-10 mx-3 border w-28 md:w-30 rounded-md cursor-pointer transition-all duration-300 font-semibold text-[0.8rem] md:text-[0.9rem] hover:shadow-md
                        ${task.isCompleted ? 'text-red-800/60 border-red-500 bg-red-100/40 hover:bg-red-100' : 'text-green-800/60 border-green-500 bg-green-100/40 hover:bg-green-100'}`}
                          onClick={() => handleToggleDone(task._id, task.isCompleted)}>
                          {task.isCompleted ? 'Mark undone' : 'Mark as done'}
                        </button>
                        <div className='flex gap-2 items-center justify-center'>
                          <button
                          onClick={() => handleEdit(task)}
                          className="flex items-center justify-center hover:scale-[1.02] cursor-pointer"
                        >
                          <Pencil className="text-black h-4 md:h-5 opacity-50" />
                        </button>
                        <button
                          onClick={() => setDeleteId(task._id)}
                          className="flex items-center justify-center hover:scale-[1.02] cursor-pointer"
                        >
                          <img src={delete_icon} alt="" className="h-7 md:h-7.5 w-7 md:w-7.5 opacity-60" />
                        </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ConfirmDelete
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ToDo;
