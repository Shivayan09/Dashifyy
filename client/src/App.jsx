import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
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
import Loading from './components/Loading'
import ToDo from './pages/Dashboard/ToDo'
import { AnimatePresence } from 'framer-motion'
import PageWrapper from './components/PageWrapper'
import Resources from './pages/Dashboard/Resources'
import Account from './pages/Dashboard/Account'

function App() {
  
  const { isLoggedIn, loading} = useContext(AppContext)

  const location = useLocation();

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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/signup" />} />
          <Route path="/dashboard" element={isLoggedIn ? <DashboardLayout/> : <Navigate to="/signup" />}>
            <Route index element={<Navigate to='subjects'/>}/>
            <Route path="subjects/:subjectId/resources" element={<Resources />} />
            <Route path='subjects' element={<PageWrapper><Subjects/></PageWrapper>}/>
            <Route path='routine' element={<PageWrapper><Routine/></PageWrapper>}/>
            <Route path='todo' element={<PageWrapper><ToDo/></PageWrapper>}/>
            <Route path='analytics' element={<PageWrapper><Analytics/></PageWrapper>}/>
            <Route path='contact' element={<PageWrapper><Contact/></PageWrapper>}/>
            <Route path='account' element={<PageWrapper><Account/></PageWrapper>}/>
          </Route>
          <Route path="/signup" element={<PageWrapper><Signup/></PageWrapper>} />
          <Route path="/verify-email" element={<PageWrapper><VerifyEmail/></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
