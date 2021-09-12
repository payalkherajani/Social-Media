import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { registerANewUser } from './UserSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const { name, email, password, confirmpassword } = formData

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (confirmpassword === password) {
            dispatch(registerANewUser({ name, email, password }))
            if (user.status === 'Success') {
                navigate('/register')
            }
            else if (user.status === 'Failed') {
                console.log(user, "rejected")
                toast.error(user.error)
            }
        } else {
            toast.error(`Passwords Don't Match`)
        }
    }

    return (
        <div className="container mx-auto p-4 min-h-screen bg-pink-50">

            <h2 className="text-2xl font-medium mb-8">SIGN UP</h2>

            <form
                className="flex flex-col p-6 md:w-3/4 m-auto lg:w-8/12 shadow-xl bg-white"
                onSubmit={onSubmitHandler}
            >
                <input type="text" placeholder="Full Name" name="name" value={name} onChange={onChangeHandler} className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4" />

                <input type="text" placeholder="Email" name="email" value={email} onChange={onChangeHandler} className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4" />

                <input type="password" placeholder="Password" name="password" value={password} onChange={onChangeHandler} className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4" />

                <input type="password" placeholder="Confirm Password" name="confirmpassword" value={confirmpassword} onChange={onChangeHandler} className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4" />

                <button className="text-white py-2 px-4 font-semibold rounded-lg bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50 mb-4">Register</button>

                <p>Already have an account?
                    <span className="text-pink-800 underline">
                        <Link to='/'>
                            LOGIN
                        </Link>
                    </span>
                </p>
            </form>
        </div>
    )
}


export default Register