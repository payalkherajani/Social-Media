import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const { name, email, password, confirmpassword } = formData
    return (
        <div className="container mx-auto p-4 min-h-screen bg-pink-50">

            <h2 className="text-2xl font-medium mb-8">SIGN UP</h2>

            <form className="flex flex-col p-6 md:w-3/4 m-auto lg:w-8/12 shadow-xl bg-white">


                <input type="text" placeholder="Full Name" name="name" value={name} onChange="" className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4" />

                <input type="text" placeholder="Email" name="email" value={email} onChange="" className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4" />

                <input type="password" placeholder="Password" name="password" value={password} onChange="" className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4" />

                <input type="password" placeholder="Confirm Password" name="confirmpassword" value={confirmpassword} onChange="" className="px-4 py-3 mb-8 text-pink-500  border-0 border-2 border-pink-600 focus:border-pink-200 hover:border-pink-300 focus:outline-none mb-4" />

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