import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import add_icon from '../../assets/add-icon.png'
import add_icon_black from '../../assets/add-icon-black.png'
import delete_icon from '../../assets/delete-icon.png'
import home_icon from '../../assets/home-icon.png'
import no_data_icon from '../../assets/no-data-icon.png'
import { Bookmark, BookOpen, Delete, Edit, LucideArrowDownToDot, Plus } from 'lucide-react';
import ConfirmDelete from '../../components/ConfirmDelete';

const Subjects = () => {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()

  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credit, setCredit] = useState('');
  const [importance, setImportance] = useState('')

  const [loading, setLoading] = useState(false);

  const getImportance = (credit) => {
    if (credit <= 1) {
      return {
        label: 'Low Importance',
        color: 'text-white',
        bgColor: 'bg-green-400/80'
      };
    }
    if (credit <= 3) {
      return {
        label: 'Med Importance',
        color: 'text-white',
        bgColor: 'bg-yellow-400/80'
      };
    }
    return {
      label: 'High Importance',
      color: 'text-white',
      bgColor: 'bg-red-400/80'
    };
  };



  const { backendUrl } = useContext(AppContext)

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/subject/getSubjects');
      setSubjects(data.subjects);
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAddSubject = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/subject/addSubject', { name, code, credit })
      if (data.success) {
        fetchSubjects();
        setName('');
        setCode('');
        setCredit('');
        toast.success(data.message)
      } else {
        toast.warn(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    setLoading(true)
    try {
      const { data } = await axios.delete(backendUrl + '/api/subject/deleteSubject/' + subjectId);
      if (data.success) {
        fetchSubjects();
        toast.success(data.message)
      } else {
        toast.warn(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      setLoading(false)
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [search, setSearch] = useState('')

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(search.toLowerCase()) ||
    subject.code.toLowerCase().includes(search.toLowerCase())
  )

  const [editSubjectId, setEditSubjectId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editCode, setEditCode] = useState('')
  const [editCredit, setEditCredit] = useState('')

  const handleEdit = (subject) => {
    setEditSubjectId(subject._id)
    setEditName(subject.name)
    setEditCode(subject.code)
    setEditCredit(subject.credit)
  }

  const handleSubjectEdit = async () => {
    setLoading(true)
    try {
      const { data } = await axios.put(backendUrl + '/api/subject/editSubject/' + editSubjectId, {
        name: editName,
        code: editCode,
        credit: editCredit
      })
      if (data.success) {
        toast.success(data.message)
        fetchSubjects()
        setEditSubjectId(null)
      } else {
        toast.warn(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openDeleteModal = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className='px-5 md:px-10 pt-5 min-h-full'>
      <div className="header flex flex-col md:flex-row items-center justify-between mb-3 md:mb-5">
        <p className='text-[1.5rem] text-purple-900/80 font-bold'>Subjects</p>
        <div className="search flex items-center justify-center gap-3 w-full md:w-[70%] mt-3 md:mt-0">
          <input type="text" placeholder='Search a subject' className='h-9 md:h-10 w-[72%] text-purple-900 bg-gray-200/80 rounded-xl p-3 outline-none'
            onChange={(e) => setSearch(e.target.value)} />
          <button className='h-9 md:h-10 w-20 md:w-32 transition-all hover:shadow-md bg-purple-900/75 rounded-xl cursor-pointer text-white'>Search</button>
        </div>
        {!isMobile &&
          <button className='cursor-pointer transition-all duration-300 hover:scale-[1.02]' onClick={() => navigate('/')}>
            <img src={home_icon} alt="" className='h-8 opacity-30' />
          </button>}
      </div>

      <div className="add py-5 flex flex-col md:flex-row gap-3 md:gap-5 mb-5 md:mb-0">
        <input type="text" placeholder='Subject name' className='h-10 w-full relative z-10 bg-purple-100 text-purple-900 md:w-[30%] rounded-md p-3 outline-none'
          onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder='Subject code' className='h-10 w-full relative z-10 bg-purple-100 text-purple-900 md:w-[30%] rounded-md p-3 outline-none'
          onChange={(e) => setCode(e.target.value)} />
        <input type="number" placeholder='Subject credit' className='h-10 w-full relative z-10 bg-purple-100 text-purple-900 md:w-[30%] rounded-md p-3 outline-none'
          onChange={(e) => setCredit(e.target.value)} />
        <button className={`${loading ? 'bg-purple-50 text-purple-900/70' : 'bg-purple-100 text-purple-900/80 '} transition-all mx-auto md:mx-0 hover:shadow-md flex items-center justify-center border border-purple-800 h-10 w-full md:w-20 font-semibold rounded-md cursor-pointer`}
          onClick={handleAddSubject}>
            {isMobile && (loading ? "Adding.." : "Add subject")}
          {!isMobile && (loading ? "Adding.." : "Add")}
        </button>
      </div>

      <div className="display">
        <div className="box w-full flex flex-col gap-10 md:gap-5 h-[70vh] md:overflow-y-auto">
          {filteredSubjects.length === 0 ? (
            <div className='flex flex-col items-center justify-center'>
              <img src={no_data_icon} alt="" className='h-[65vh]' />
            </div>
          ) : (
            filteredSubjects.map((subject, index) => (
              <div className="box flex flex-col md:flex-row gap-3 md:gap-7 items-center">
                <div
                  key={subject._id}
                  className="flex flex-col relative z-10 gap-3 cursor-pointer shadow-sm hover:shadow-md justify-between w-full md:w-[70%] px-5 py-3 rounded-2xl bg-purple-50 transition-all"
                >
                  <div className="header flex items-center gap-3">
                    <p className='text-purple-800/80 font-bold text-[1.15rem]'>{index + 1}.</p>
                    {editSubjectId === subject._id ? (
                      <input value={editName} onChange={(e) => setEditName(e.target.value)} className='text-purple-800/70 uppercase font-bold md:text-[1.15rem] border p-1 rounded-md w-32 outline-none' />
                    ) : (
                      <p className='text-purple-800/80 uppercase font-bold md:text-[1.15rem]'>{subject.name[0]?.toUpperCase() + subject.name?.slice(1)}</p>
                    )}
                    {editSubjectId !== subject._id && (
                      <p className={`ml-auto rounded-md h-6 md:h-8 text-[0.8rem] md:text-[0.9rem] w-28 md:w-38 flex items-center justify-center ${getImportance(subject.credit).color} ${getImportance(subject.credit).bgColor} text-shadow-md font-bold`}>
                        {getImportance(subject.credit).label}
                      </p>
                    )}
                  </div>
                  <div className="details flex justify-between">
                    {editSubjectId === subject._id ? (
                      <>
                        <input value={editCode} onChange={(e) => setEditCode(e.target.value)} className='text-sm text-purple-400 border border-purple-900 p-1 rounded-md w-24 outline-none' />
                        <input type="number" value={editCredit} onChange={(e) => setEditCredit(e.target.value)} className='text-sm text-purple-400 border border-purple-900 p-1 rounded-md w-16 outline-none' />
                      </>
                    ) : (
                      <>
                        <p className='text-purple-400 text-sm'><span className='text-purple-900'>Code:</span> {subject.code}</p>
                        <p className='text-purple-400 text-sm'><span className='text-purple-900 font-semibold'>Credits:</span> {subject.credit}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="buttons h-10 flex items-center gap-5">
                  {editSubjectId === subject._id ? (
                    <>
                      <button onClick={handleSubjectEdit} className='text-sm bg-purple-800/60 text-white h-9 w-20 rounded-md cursor-pointer hover:shadow-md'>{loading ? "Saving.." : "Save"}</button>
                      <button onClick={() => setEditSubjectId(null)} className='text-sm bg-white border border-purple-700 text-purple-900 h-9 w-20 rounded-md cursor-pointer hover:shadow-md'>Cancel</button>
                    </>
                  ) : (
                    <>
                      <div className="add h-8 md:h-full w-32 flex items-center justify-center rounded-md relative z-10 bg-purple-100 text-purple-900 border border-purple-700 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-md text-[0.9rem]"
                      onClick={() => navigate(`/dashboard/subjects/${subject._id}/resources`)}>
                        See Resources
                      </div>
                      <Edit className='h-6 w-6 opacity-45 cursor-pointer' onClick={() => handleEdit(subject)} />
                      <div className="delete" onClick={() => openDeleteModal(subject._id)}>
                        <img src={delete_icon} alt="" className='h-8 w-8 opacity-55 cursor-pointer' />
                      </div>
                      <ConfirmDelete
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onConfirm={() => handleDeleteSubject(itemToDelete)}
                        title="Delete Subject?"
                        message="Are you sure you want to delete this subject? This action cannot be undone!"
                        confirmText="Yes, Delete"
                        cancelText="Cancel"
                      />
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>


    </div>
  );
};

export default Subjects;
