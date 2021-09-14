import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addComment, deleteComment, getSelectedPostDetails, goBackButtonIsPressed } from './postSlice'
import { Link } from 'react-router-dom'
import dateformat from 'dateformat'


const SelectedPost = () => {

    const [showBox, setShowBox] = useState(false)
    const [commentText, setCommentText] = useState('')

    const { id } = useParams()
    const dispatch = useDispatch()
    const posts = useSelector(state => state.post)
    const loggedInuser = useSelector(state => state.user)
    const { selectedPostDetails } = posts

    useEffect(() => {
        if (loggedInuser.token !== '') {
            dispatch(getSelectedPostDetails({ 'postId': id }))

        }
    }, [loggedInuser])

    const handleCommentText = (e) => {
        setCommentText(e.target.value)
    }

    const handleCloseCommentBox = () => {
        setShowBox(false)
        setCommentText('')
    }

    const onSubmitComment = (e) => {
        e.preventDefault()
        dispatch(addComment({ 'postId': id, 'text': commentText }))
        setShowBox(false)
        setCommentText('')
    }

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment({ 'postId': id, commentId }))
    }

    return (
        <div className="container mx-auto min-h-screen bg-pink-50">
            <Link to={`/feed`}>
                <button className="text-left text-white py-2 px-4 font-semibold rounded-lg bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50 mt-4 ml-4" onClick={() => dispatch(goBackButtonIsPressed())}>Go Back</button>
            </Link>
            <h2 className="text-center font-serif uppercase text-2xl xl:text-3xl mb-4">POST</h2>
            <div className="container w-11/12 md:w-8/12 lg:w-6/12 mx-auto">
                <div className="text-center ">

                    <div className="flex flex-col border border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 justify-between leading-normal flex-grow">

                        <img src={selectedPostDetails?.image_of_post || "https://cdn.dribbble.com/users/2243610/screenshots/14147441/media/0099de4c63da0f32770c4694235a504c.jpg"} alt="post image"
                            className="w-2/4 h-2/4 self-center mb-2"
                        />
                        <div className="flex justify-between items-center  mb-4">
                            <div className="flex justify-center items-center">
                                <img className="w-10 h-10 rounded-full mr-4" src={selectedPostDetails?.user?.avatar || "https://cdn.dribbble.com/users/3844750/screenshots/10729124/media/2523facfa3e436b8331c316dcc4998f2.jpg"} alt="Avatar User" />
                                <div className="text-sm">
                                    <p className="text-gray-900 leading-none">{selectedPostDetails?.user?.name}</p>
                                </div>
                            </div>
                            <div className="text-gray-600">{dateformat(selectedPostDetails.updatedAt, "fullDate")}</div>
                        </div>

                        <div className="mb-8 text-left">
                            <div className="text-gray-900 font-bold text-xl mb-2">{selectedPostDetails?.caption}</div>
                            <p className="text-gray-700 text-base">{selectedPostDetails?.description}</p>
                        </div>
                    </div>
                </div>

                <div className="text-center flex flex-col">
                    <button className="text-left text-white py-2 px-4 font-semibold rounded-lg bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 mt-4 mb-4" onClick={() => setShowBox(true)}>Add Comment</button>

                    {
                        showBox && <>

                            <form
                                onSubmit={(e) => onSubmitComment(e)}
                                className="flex flex-col p-6 shadow-xl bg-white mb-4"
                            >
                                <input
                                    type="text"
                                    placeholder="Write Your comment here"
                                    value={commentText}
                                    onChange={handleCommentText}
                                    className="px-4 py-3 mb-8 border-2 border-gray-600 focus:border-gray-200 hover:border-gray-300 focus:outline-none mb-4"
                                    required={true}

                                />
                                <div className="flex justify-between">
                                    <button onClick={handleCloseCommentBox} className="text-left text-white py-2 px-4 font-semibold rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 mt-4 mb-4">Close</button>
                                    <button className="text-left text-white py-2 px-4 font-semibold rounded-lg bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mt-4 mb-4" type="submit">Submit</button>
                                </div>
                            </form>
                        </>
                    }
                    {
                        selectedPostDetails?.comments?.length > 0 ? (
                            <>
                                <h1 className="text-center font-serif uppercase text-2xl xl:text-3xl mb-4">Comments</h1>
                                {
                                    selectedPostDetails?.comments.map((oneComment) => {

                                        return (
                                            <div className="flex flex-col mb-4 p-4 bg-gray-300" key={oneComment._id}>

                                                <div className=" flex justify-between">
                                                    <p className="mb-2">
                                                        <strong>{oneComment?.name}
                                                        </strong>
                                                    </p>
                                                    <p className="mb-2 ">{dateformat(oneComment.date, "fullDate")}</p>
                                                </div>


                                                <div className=" flex justify-between" >
                                                    <p className="mb-2 text-left">
                                                        <strong className="mr-2"> Description:</strong>
                                                        {oneComment.text}
                                                    </p>
                                                    {loggedInuser?.userDetails?.id == oneComment.user ? (
                                                        <i className="fas fa-trash text-2xl"
                                                            style={{ color: 'red' }} onClick={() => handleDeleteComment(oneComment._id)}>

                                                        </i>) : (null)}
                                                </div>
                                            </div>
                                        )

                                    })
                                }


                            </>
                        ) : ('No Comments to show! :)')
                    }
                </div>
            </div>



        </div >
    )
}

export default SelectedPost