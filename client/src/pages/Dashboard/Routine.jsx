import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { BookOpen, Clock, Edit, MapPin, Plus } from 'lucide-react';
import delete_icon from '../../assets/delete-icon.png';
import home_icon from '../../assets/home-icon.png';
import calendar_icon from '../../assets/calendar-icon.png';
import ConfirmDelete from '../../components/ConfirmDelete';
import { useNavigate } from 'react-router-dom';
import DayDropdown from '../../components/DayDropdown';
import no_data_icon from '../../assets/no-data-icon.png'
import no_data_icon2 from '../../assets/no-data-icon2.jpg'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Routine = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState('');
  const [routines, setRoutines] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [selectedDay, setSelectedDay] = useState('Monday');

  const [editRoutineId, setEditRoutineId] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editStart, setEditStart] = useState('');
  const [editEnd, setEditEnd] = useState('');
  const [editLocation, setEditLocation] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [loading, setLoading] = useState();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchRoutine();
  }, []);

  const fetchRoutine = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/routine/getRoutine`);
      setRoutines(data.routines);
    } catch (err) {
      toast.error("Failed to load routines");
    }
  };

  const handleInputChange = (day, field, value) => {
    setFormInputs(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleAddRoutine = async (day) => {
    const { subject, start, end, location } = formInputs[day] || {};
    try {
      setLoading(true)
      const { data } = await axios.post(`${backendUrl}/api/routine/addRoutine`, {
        subject, start, end, location, day
      });

      if (data.success) {
        toast.success(data.message);
        fetchRoutine();
        setFormInputs(prev => ({ ...prev, [day]: {} }));
      } else {
        toast.warn(data.message);
      }
    } catch (err) {
      toast.error("Could not add routine");
    } finally {
      setLoading(false)
    }
  };

  const handleEdit = (routine) => {
    setEditRoutineId(routine._id);
    setEditSubject(routine.subject);
    setEditStart(routine.start);
    setEditEnd(routine.end);
    setEditLocation(routine.location);
  };

  const handleEditReq = async () => {
    try {
      setLoading(true)
      const { data } = await axios.put(`${backendUrl}/api/routine/editRoutine/${editRoutineId}`, {
        subject: editSubject,
        start: editStart,
        end: editEnd,
        location: editLocation
      });
      if (data.success) {
        toast.success(data.message);
        fetchRoutine();
        setEditRoutineId(null);
      } else {
        toast.warn(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  const openDeleteModal = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async (routineId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/routine/deleteRoutine/${routineId}`);
      if (data.success) {
        toast.success(data.message);
        fetchRoutine();
      } else {
        toast.warn(data.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setItemToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const routinesByDay = days.reduce((acc, d) => {
    acc[d] = routines
      .filter(r => r.day === d)
      .filter(r => r.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    return acc;
  }, {});

  return (
    <div className="px-5 md:px-10 pt-5">
      <div className="header flex flex-col md:flex-row items-center justify-between mb-6">
        <p className='text-[1.5rem] text-purple-900/80 font-bold'>Routine</p>
        <div className="search flex items-center gap-3 w-full md:w-[70%] mt-3 md:mt-0">
          <input
            type="text"
            placeholder='Search a subject'
            className='h-10 w-[72%] text-purple-900 bg-gray-200/80 rounded-xl p-3 outline-none'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='h-10 w-24 transition-all bg-purple-900/70 rounded-xl text-white cursor-pointer'>Search</button>
        </div>
        {!isMobile && (
          <button onClick={() => navigate('/')}>
            <img src={home_icon} alt="home" className='h-8 opacity-30' />
          </button>
        )}
      </div>

      <div className='input box mb-6 flex flex-col md:flex-row items-center gap-3'>
        <div className="inputs flex items-center w-full flex-col md:flex-row gap-3 md:gap-4">
          <DayDropdown selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
          <input
            value={formInputs[selectedDay]?.subject || ''}
            onChange={(e) => handleInputChange(selectedDay, 'subject', e.target.value)}
            type="text"
            maxLength={25}
            className='h-10 w-[100%] md:w-[20%] rounded-lg bg-white border border-purple-900 text-purple-900 outline-none p-3'
            placeholder='Subject'
          />
          <input
            value={formInputs[selectedDay]?.start || ''}
            onChange={(e) => handleInputChange(selectedDay, 'start', e.target.value)}
            type="number"
            max={12}
            min={1}
            className='h-10 w-[100%] md:w-[20%] rounded-lg bg-white border border-purple-900 text-purple-900 outline-none p-3'
            placeholder='Start time'
          />
          <input
            value={formInputs[selectedDay]?.end || ''}
            onChange={(e) => handleInputChange(selectedDay, 'end', e.target.value)}
            type="number"
            max={12}
            min={1}
            className='h-10 w-[100%] md:w-[20%] rounded-lg bg-white border border-purple-900 text-purple-900 outline-none p-3'
            placeholder='End time'
          />
          <input
            value={formInputs[selectedDay]?.location || ''}
            onChange={(e) => handleInputChange(selectedDay, 'location', e.target.value)}
            type="text"
            className='h-10 w-[100%] md:w-[20%] rounded-lg bg-white border border-purple-900 text-purple-900 outline-none p-3'
            placeholder='Location'
          />
        </div>
        <button
          className={`${loading ? "bg-purple-50 text-purple-900/70" : "bg-purple-100 text-purple-900/80"} border font-semibold border-purple-700 cursor-pointer flex items-center justify-center h-10 w-full md:w-16 rounded-md hover:shadow-xl`}
          onClick={() => handleAddRoutine(selectedDay)}
        >
          {loading ? "Adding.." : "Add"}
        </button>
      </div>

      <div>
        <h2 className="text-lg text-purple-800/90 font-bold mb-3 uppercase text-[1.4rem] flex items-center gap-2">
          <img src={calendar_icon} alt="calendar" className='h-8' />
          {selectedDay}
        </h2>

        {routinesByDay[selectedDay]?.length === 0 ? (
          <div className='flex items-center justify-center flex-col h-[65vh]'>
            <p className="text-gray-400 italic text-[1.1rem]">No routines added yet for {selectedDay}</p>
            <img src={no_data_icon2} alt="" className='h-[90%] opacity-90'/>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-5 md:mb-0">
            {routinesByDay[selectedDay].map(routine => (
              <div key={routine._id} className="rounded-xl bg-purple-50/70 px-5 py-2 shadow-sm hover:shadow-md flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">

                  <div className="flex items-center gap-2 w-[100%] md:w-[36%]">
                    <BookOpen className="w-5 h-5 text-purple-900 opacity-60" />
                    {editRoutineId === routine._id ? (
                      <input value={editSubject} onChange={(e) => setEditSubject(e.target.value)} className="border p-1 rounded-md w-full border-purple-700 text-purple-900" />
                    ) : (
                      <p className="text-indigo-900/60 text-[1.2rem] font-semibold">{routine.subject}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-[100%] md:w-[20%]">
                    <Clock className="w-5 h-5 text-purple-900 opacity-60" />
                    {editRoutineId === routine._id ? (
                      <div className="flex gap-2">
                        <input value={editStart} onChange={(e) => setEditStart(e.target.value)} type="number" className="border p-1 w-16 rounded-md border-purple-700 text-purple-900" />
                        <input value={editEnd} onChange={(e) => setEditEnd(e.target.value)} type="number" className="border p-1 w-16 rounded-md border-purple-700 text-purple-900" />
                      </div>
                    ) : (
                      <p className="text-indigo-900/60 text-[1.2rem] font-semibold">{routine.start} - {routine.end}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-[100%] md:w-[20%]">
                    <MapPin className="w-5 h-5 text-purple-900 opacity-60" />
                    {editRoutineId === routine._id ? (
                      <input value={editLocation} onChange={(e) => setEditLocation(e.target.value)} className="border p-1 w-24 rounded-md border-purple-700 text-purple-900" />
                    ) : (
                      <p className="text-indigo-900/60 text-[1.2rem] font-semibold">{routine.location || 'null'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  {editRoutineId === routine._id ? (
                    <>
                      <button onClick={handleEditReq} className="bg-purple-900/70 text-white h-8 w-20 rounded-md">{loading ? "Saving.." : "Save"}</button>
                      <button onClick={() => setEditRoutineId(null)} className="border border-purple-700 text-purple-900 h-8 w-20 rounded-md">Cancel</button>
                    </>
                  ) : (
                    <>
                      <Edit className="h-5 md:h-6 w-5 md:w-6 text-purple-900 opacity-50 cursor-pointer" onClick={() => handleEdit(routine)} />
                      <img src={delete_icon} alt="delete" className="h-7 w-7 opacity-60 cursor-pointer" onClick={() => openDeleteModal(routine._id)} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(itemToDelete)}
        title="Delete class?"
        message="Are you sure you want to delete this class from routine? This action cannot be undone!"
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Routine;
