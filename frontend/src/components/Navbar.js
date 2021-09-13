import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    const user = useSelector(state => state.user)

    return (
        user.token ? (
            <>
                <div className="container items-center bg-pink-400 py-8 px-4 flex flex-wrap md:px-8 text-white flex justify-between" style={{ maxWidth: '100%' }}>

                    <h1><strong>Panchayat</strong></h1>

                    <div className="flex gap-2 flex-wrap hidden md:flex">
                        <button className="mr-2"><i className="fas fa-user"></i> Profile </button>
                        <button className="mr-2"><i className="fas fa-users"></i> Suggestions </button>
                        <button className="mr-2" onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</button>
                    </div>
                    <button className="md:hidden" onClick={() => setOpen(!open)}>
                        <i className="fas fa-bars text-2xl"></i>
                    </button>
                </div>
                <nav className="md:hidden">

                    {
                        open &&
                        <ul className="flex justify-start items-start text-white  bg-pink-400  mb-4">
                            <button className="mr-2 mb-2 px-4"><i className="fas fa-user"></i> Profile </button>
                            <button className="mr-2 mb-2 px-4"><i className="fas fa-users"></i> Suggestions </button>
                            <button className="mr-2 mb-2 px-4" onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</button>
                        </ul>
                    }
                </nav>
            </>
        ) : (
            <div className="container items-center bg-pink-400 py-8 px-4 flex md:px-8 text-white flex justify-between" style={{ maxWidth: '100%' }}>
                <h1><strong>Panchayat</strong></h1>
                <div className="flex gap-2">
                    <Link to='/'><button>LOGIN</button></Link>
                    <Link to='/register'><button>REGISTER</button></Link>
                </div>

            </div>
        )

    );
}

export default Navbar