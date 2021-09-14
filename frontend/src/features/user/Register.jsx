import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { registerANewUser } from './userSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
        image: ''
    })

    const { name, email, password, confirmpassword, image } = formData

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (confirmpassword === password) {

            dispatch(registerANewUser({ name, email, password, navigate }))
        } else {
            toast.error(`Passwords Don't Match`)
        }

        setFormData({ ...formData, email: '', password: '', confirmpassword: '', name: '' })
    }

    const handleImageSelected = (e) => {
        const { target } = e;
        setFormData({ ...formData, image: target.files[0] })
    }



    return (
        <div className="container mx-auto p-4 min-h-screen bg-pink-50">

            <h2 className="text-2xl font-medium mb-8">SIGN UP</h2>

            <form
                className="flex flex-col p-6 md:w-3/4 m-auto lg:w-8/12 shadow-xl bg-white"
                onSubmit={onSubmitHandler}
                encType="multipart/form-data"
            >
                <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={name}
                    onChange={onChangeHandler}
                    className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4"
                    required={true}

                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4"
                    required={true}

                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
                    className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4"
                    required={true}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    value={confirmpassword}
                    onChange={onChangeHandler}
                    className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4"
                    required={true}

                />

                {/* <label
                    className="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-pink-600 hover:text-white text-pink-600 ease-linear transition-all duration-150 mb-8">
                    <i className="fas fa-cloud-upload-alt fa-3x"></i>
                    <span className="mt-2 text-base leading-normal">Profile Pic</span>
                    <input type='file' className="hidden" required={true} onChange={handleImageSelected} />
                </label> */}


                <button
                    className="text-white py-2 px-4 font-semibold rounded-lg bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50 mb-4"
                >
                    Register
                </button>

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