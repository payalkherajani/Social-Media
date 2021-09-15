import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletePost, getAllPostsOfUser, toggleLikeProfileBtn } from './profileSlice'
import add_post from '../../assets/add_post.svg'
import { Modal } from '../../components'
import { Link } from 'react-router-dom'
import dateformat from 'dateformat'
import EditPostModal from './EditPostModal'


const Profile = () => {

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedPostID, setSelectedPostID] = useState('')

    const loggedInUser = useSelector(state => state.user)
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()

    const checkIfYouHaveLiked = (likesArray) => {
        return likesArray.some(({ user }) => user == loggedInUser?.userDetails?.id)
    }

    const toggleLike = (postId) => {
        dispatch(toggleLikeProfileBtn({ postId }))

    }

    const deletePostBtnPressed = (postId) => {
        dispatch(deletePost({ postId }))
    }

    const onEditIconClicked = (id) => {
        setSelectedPostID(id)
        setShowEditModal(true)
    }

    useEffect(() => {
        dispatch(getAllPostsOfUser())
    }, [profile.status])

    return (
        <div className="container mx-auto min-h-screen bg-pink-50">

            <h2 className="text-center font-serif uppercase text-2xl xl:text-3xl mb-4 pt-4">profile</h2>
            {
                showModal === false ? (<button
                    className="fixed right-0 bottom-35  h-20 w-20  z-10 rounded-full p-5 bg-pink-400  md:right-10 md:bottom-20"
                    onClick={() => setShowModal(true)}

                >
                    <i className="fas fa-plus text-2xl text-white"></i>
                </button>) : (null)
            }
            {
                showModal && <Modal setShowModal={setShowModal} />
            }
            <div className="container w-11/12 md:w-8/12 mx-auto flex flex-col items-center">

                <div className="max-w-2xl flex h-auto flex-wrap mx-auto my-16 lg:my-4">

                    <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">

                        <div className="p-4 md:p-12 text-center lg:text-left">
                            <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style={{
                                backgroundImage:
                                    `url(${loggedInUser?.userDetails?.avatar})` || `url('https://cdn.dribbble.com/users/2243610/screenshots/14147441/media/0099de4c63da0f32770c4694235a504c.jpg')`
                            }}></div>

                            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{loggedInUser?.userDetails?.name}</h1>
                            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                            <p className="pt-8 text-xl"><span className="text-pink-800 text-xl ">Bio:</span> {loggedInUser?.userDetails?.bio}!</p>

                            <div className="text-l pt-8 lg:pt-0 flex flex-col md:flex-row md:justify-between flex-wrap mt-4">
                                <div>
                                    <span className="text-pink-800 text-l ">Followers {" "}</span>
                                    <span className=" ml-2 md:hidden">{loggedInUser?.userDetails?.followers?.length}</span>

                                </div>
                                <div>
                                    <span className="text-pink-800 text-l ">Following</span>
                                    <span className=" ml-2 md:hidden">{loggedInUser?.userDetails?.following?.length}</span>
                                </div>
                                <div>
                                    <span className="text-pink-800 text-l">Posts</span>
                                    <span className=" ml-2 md:hidden">{profile?.loggedInUserPosts?.length}</span>
                                </div>
                            </div>

                            <div className=" hidden md:flex text-xl pt-8 lg:pt-0 justify-between items-center mt-4">
                                <div className="ml-4">{loggedInUser?.userDetails?.followers?.length} </div>
                                <div >{loggedInUser?.userDetails?.following?.length} </div>
                                <div className="mr-4"> {profile?.loggedInUserPosts?.length}</div>
                            </div>

                            <div className="pt-4">
                                <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                                    Update Profile
                                </button>
                            </div>

                        </div>

                    </div>
                    <div className="w-full lg:w-2/5">
                        <img src={loggedInUser?.userDetails?.avatar} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block h-full" />
                    </div>
                </div>

                <div className="mt-4 mb-4">
                    {
                        profile?.loggedInUserPosts?.length === 0 ? (<div>
                            <h1 className="text-center text-pink-700 font-serif uppercase text-2xl xl:text-3xl mb-4">
                                No Posts, Add Some! 😄</h1>
                            <img src={add_post} alt="Add Post SVG" />

                        </div>) : (<div>

                            {
                                profile?.loggedInUserPosts?.map((onePost) => {
                                    return (
                                        <div
                                            className="max-w-sm w-full lg:max-w-full lg:flex mb-4" key={onePost._id}>

                                            <div className="border border-gray-400 h-48 lg:h-auto lg:w-48 flex-none bg-contain bg-no-repeat bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{
                                                backgroundImage:
                                                    `url(${onePost.image_of_post})` || `url('https://cdn.dribbble.com/users/2243610/screenshots/14147441/media/0099de4c63da0f32770c4694235a504c.jpg')`
                                            }}>

                                            </div>

                                            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal flex-grow">

                                                <div className="flex justify-between items-center  mb-4">
                                                    <div className="flex justify-center items-center">
                                                        <img className="w-10 h-10 rounded-full mr-4" src={loggedInUser?.userDetails?.avatar || "https://cdn.dribbble.com/users/3844750/screenshots/10729124/media/2523facfa3e436b8331c316dcc4998f2.jpg"} alt="Avatar User" />
                                                        <div className="text-sm">
                                                            <p className="text-gray-900 leading-none">{onePost.user.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-600">{dateformat(onePost.updatedAt, "fullDate")}</div>
                                                </div>

                                                <div className="mb-8 text-left">
                                                    <div className="text-gray-900 font-bold text-xl mb-2">{onePost.caption}</div>
                                                    <p className="text-gray-700 text-base">{onePost.description}</p>
                                                </div>

                                                <hr />

                                                <div className="flex mt-4 justify-between">

                                                    <div>
                                                        <span className="ml-4 text-2xl">{onePost.likes.length > 0 ? (onePost.likes.length) : ('')} </span>
                                                        {
                                                            checkIfYouHaveLiked(onePost.likes) ?
                                                                (
                                                                    <i
                                                                        className="fas fa-heart text-2xl cursor-pointer"
                                                                        onClick={() => toggleLike(onePost._id)}
                                                                        style={{ color: 'red' }}
                                                                    >

                                                                    </i>) :
                                                                (<i className="far fa-heart text-2xl cursor-pointer" onClick={() => toggleLike(onePost._id)}></i>)
                                                        }

                                                    </div>

                                                    <div>
                                                        <span className="ml-4 text-2xl">
                                                            <Link to={`/post/${onePost._id}`}><i className="fas fa-eye text-2xl cursor-pointer"></i></Link>
                                                        </span>


                                                    </div>


                                                    <div>
                                                        <span className="ml-4 text-2xl">

                                                            <i className="fas fa-edit text-2xl cursor-pointer"
                                                                onClick={() => onEditIconClicked(onePost._id)}

                                                                style={{ color: 'blue' }}></i>
                                                        </span>


                                                    </div>

                                                    <div>
                                                        <span className="ml-4 text-2xl">

                                                            <i className="fas fa-trash text-2xl cursor-pointer" style={{ color: 'red' }} onClick={() => deletePostBtnPressed(onePost._id)}></i>
                                                        </span>


                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>)
                    }
                </div>
            </div>
            {showEditModal && <EditPostModal
                setShowEditModal={setShowEditModal}
                id={selectedPostID}

            />}

        </div>
    )
}

export default Profile