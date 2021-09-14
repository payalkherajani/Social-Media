import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSuggestion, toggleFollow } from './postSlice'
import { getLoggedInUser } from '../user/userSlice'
import { Link } from 'react-router-dom'


const Suggestion = () => {

    const dispatch = useDispatch()

    const post = useSelector((state) => state.post)
    const loggedInuser = useSelector((state) => state.user)


    useEffect(() => {
        dispatch(getSuggestion())
        dispatch(getLoggedInUser())
    }, [])

    const checkWhetherUserIsFollowedorNot = (userId) => {

        return loggedInuser?.userDetails?.following?.some(({ user }) => user == userId)
    }

    const toggleFollowFunction = (followingpersonId) => {
        dispatch(toggleFollow({ followingpersonId }))

    }

    return (
        <div className="min-h-screen bg-pink-50">

            <h2 className="text-center font-serif uppercase text-2xl xl:text-3xl mb-4">SUGGESTIONS</h2>
            <div className="m-4">
                <div className="flex flex-center justify-center gap-4 flex-wrap ">

                    {
                        post.suggestion && post.suggestion.map((user) => {

                            return (
                                <div className="w-1/2 py-4 px-8 bg-white shadow-lg rounded-lg my-10" key={user._id}>
                                    <div className="flex justify-center md:justify-end -mt-16">
                                        <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src={user.avatar || `https://cdn.dribbble.com/users/3844750/screenshots/10729124/media/2523facfa3e436b8331c316dcc4998f2.jpg`} />
                                    </div>
                                    <div>
                                        <h2 className="text-gray-800 text-3xl font-semibold mb-4">{user.name}</h2>
                                        <div className="mt-2 text-gray-600 flex flex-col">
                                            <p className="mt-2 text-gray-600"><strong>Following:</strong> {user.following.length}</p>
                                            <p className="mt-2 text-gray-600"><strong>Followers: </strong> {user.followers.length}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-4">

                                        {/* need to remove Link tag, its wrong, but referesh is not working */}
                                        {
                                            checkWhetherUserIsFollowedorNot(user?._id) ? (
                                                <a href='/suggestion'>
                                                    <button
                                                        className="text-white py-2 px-4 font-semibold rounded-lg bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 uppercase"
                                                        onClick={() => toggleFollowFunction(user._id)}

                                                    >
                                                        Following
                                                    </button></a>
                                            ) :
                                                (

                                                    <a href='/suggestion'>
                                                        <button
                                                            className="text-white py-2 px-4 font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 uppercase"
                                                            onClick={() => toggleFollowFunction(user._id)}
                                                        >
                                                            Follow
                                                        </button>
                                                    </a>
                                                )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>

            </div>
        </div>
    )
}

export default Suggestion