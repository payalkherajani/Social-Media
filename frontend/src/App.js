import React, { Fragment, useEffect } from 'react';
import { Register, Login, Profile } from './features';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navbar, Home, Footer } from './components'
import { useSelector, useDispatch } from 'react-redux'
// import { getLoggedInUser } from './features/user/userSlice';
import axios from 'axios'
import { SelectedPost, Suggestion } from './features/post'

function App() {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (localStorage.token) {
  //     if (user.token === '') {
  //       dispatch(getLoggedInUser())
  //     }

  //   }
  // }, [user])

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.token;
  }, [user]);

  return (
    <div className="min-h-screen">
      <Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Home />} />
            <Route path='/post/:id' element={<SelectedPost />} />
            <Route path='/suggestion' element={<Suggestion />} />
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
