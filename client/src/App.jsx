import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import VerifyEmail from './pages/VerifyEmail'
import Subjects from './pages/Dashboard/Subjects'
import Routine from './pages/Dashboard/Routine'
import DashboardLayout from './pages/Dashboard/DashboardLayout'
import Analytics from './pages/Dashboard/Analytics'
import Contact from './pages/Dashboard/Contact'
import ConstellationBackground from './components/ConstellationBackground'
import Loading from './components/Loading'
import ToDo from './pages/Dashboard/ToDo'

function App() {
  
  const { isLoggedIn, loading} = useContext(AppContext)

  if(loading) return <Loading/>
  
  return (
    <div>
      <ToastContainer
        toastClassName="!rounded-xl !shadow-lg !text-md !font-medium"
        bodyClassName="!text-gray-800"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/signup" />} />
        <Route path="/dashboard" element={isLoggedIn ? <DashboardLayout/> : <Navigate to="/signup" />}>
          <Route index element={<Navigate to='subjects'/>}/>
          <Route path='subjects' element={<Subjects/>}/>
          <Route path='routine' element={<Routine/>}/>
          <Route path='todo' element={<ToDo/>}/>
          <Route path='analytics' element={<Analytics/>}/>
          <Route path='contact' element={<Contact/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
      </Routes>
    </div>
  )
}

export default App
