import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import { logoutButtonPressed } from '../features/user/userSlice';

const Navbar = () => {

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutButtonPressed())
        navigate('/');
    };

    const user = useSelector(state => state.user)

    return (
        user.token ? (
            <>
                <div className="container items-center bg-pink-400 py-8 px-4 flex flex-wrap md:px-8 text-white flex justify-between" style={{ maxWidth: '100%' }}>

                    <h1 className="uppercase"><strong>Panchayat</strong></h1>

                    <div className="flex gap-2 flex-wrap hidden md:flex">
                        <NavLink to='/feed' activeClassName="active" end>
                            <button className="uppercase"> Feed </button>
                        </NavLink>
                        <NavLink to='/profile' activeClassName="active" end><button className="uppercase">

                            Profile
                        </button> </NavLink>
                        <NavLink to='/suggestion' activeClassName="active" end><button className="uppercase">

                            Suggestions
                        </button></NavLink>
                        <Link to='/'><button className="uppercase" onClick={logout}> Logout</button> </Link>
                    </div>
                    <button className="md:hidden" onClick={() => setOpen(!open)}>
                        <i className="fas fa-bars text-2xl"></i>
                    </button>
                </div>
                <nav className="md:hidden">
                    {
                        open &&
                        <div className="flex justify-start items-start text-white  bg-pink-400  mb-4">

                            <NavLink to='/feed' activeClassName="active" end>
                                <button className="mr-2 mb-2 px-4 uppercase"> Feed </button>
                            </NavLink>

                            <NavLink to='/profile' activeClassName="active" end >
                                <button className="mr-2 mb-2 px-4 uppercase">Profile </button>
                            </NavLink>

                            <NavLink to='/suggestion' activeClassName="active" end>
                                <button className="mr-2 mb-2 px-4 uppercase"> Suggestions </button>
                            </NavLink>

                            <button className="mr-2 px-4 uppercase" onClick={logout}> Logout</button>
                        </div>
                    }
                </nav>
            </>
        ) : (
            <div className="container items-center bg-pink-400 py-8 px-4 flex md:px-8 text-white flex justify-between" style={{ maxWidth: '100%' }}>
                <h1 className="uppercase"><strong>Panchayat</strong></h1>
                <div className="flex gap-2">
                    <NavLink to='/' activeClassName="active" end><button className="uppercase">LOGIN</button></NavLink>
                    <NavLink to='/register' activeClassName="active" end><button className="uppercase">REGISTER</button></NavLink>
                </div>

            </div>
        )

    );
}

export default Navbar