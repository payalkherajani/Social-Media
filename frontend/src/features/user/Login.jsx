import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUser } from './UserSlice'

const Login = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const dispatch = useDispatch()

    const { email, password } = formData

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    useEffect(() => {
        if (user.status === 'Failed') {
            toast.error(user.error)
        }
    }, [user])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(loginUser({ 'email': formData.email, 'password': formData.password, navigate }))
        setFormData({ ...formData, email: '', password: '' })
    }

    return (
        localStorage.getItem('token') ? (<Navigate to="/profile" />) : (
            <div className="container mx-auto p-4 min-h-screen bg-pink-50">

                <h2 className="text-2xl font-medium mb-8">SIGN IN</h2>

                <form
                    className="flex flex-col p-6 md:w-3/4 m-auto lg:w-8/12 shadow-xl bg-white"
                    onSubmit={onSubmitHandler}
                >

                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChangeHandler}
                        className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4"
                    />


                    <button
                        className="text-white py-2 px-4 font-semibold rounded-lg bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50 mb-4"
                    >
                        Login
                    </button>

                    <p>Don't have an account?
                        <span className="text-pink-800 underline">
                            <Link to='/register'>
                                REGISTER
                            </Link>
                        </span>
                    </p>
                </form>
            </div>
        )

    )
}


export default Login


