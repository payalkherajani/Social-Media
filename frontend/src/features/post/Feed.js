import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'


const Feed = () => {

    const user = useSelector((state) => state.user)
    const navigate = useNavigate()


    useEffect(() => {
        if (user.status === 'idle') {
            navigate('/')
        }
    }, [])

    return (
        <div>
            <h2 className="text-center font-serif uppercase text-2xl xl:text-3xl">FEED</h2>
            {/* <!-- container for all cards --> */}
            <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">

                {/* <!-- card --> */}
                <div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">

                    {/* <!-- media --> */}
                    <div className="h-64 w-auto md:w-1/2">
                        <img className="inset-0 h-full w-full object-cover object-center" src="https://cdn.dribbble.com/users/2268251/screenshots/5903041/dribla.jpg?compress=1&resize=800x600" />
                    </div>

                    {/* <!-- content --> */}
                    <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                        <h3 className="font-semibold text-lg leading-tight truncate">title</h3>
                        <p className="mt-2">
                            paragraph
                        </p>
                        <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                            author &bull; date
                        </p>
                    </div>
                </div>


                <div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">

                    {/* <!-- content --> */}
                    <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                        <h3 className="font-semibold text-lg leading-tight truncate">title</h3>
                        <p className="mt-2">
                            paragraph
                        </p>
                        <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                            author &bull; date
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Feed