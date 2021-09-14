import React, { Fragment, useEffect } from 'react';
import { Register, Login, Profile } from './features';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navbar, Home, Footer } from './components'
import { useSelector, useDispatch } from 'react-redux'
import { getLoggedInUser } from './features/user/userSlice';



function App() {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.token) {
      dispatch(getLoggedInUser())
    }
  }, [])

  return (
    <div className="App min-h-screen">
      <Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Fragment>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
