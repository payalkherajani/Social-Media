import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetails, updatePost } from './profileSlice'


const Modal = (props) => {

    const profile = useSelector((state) => state.profile)

    const [formData, setFormData] = useState({});

    const dispatch = useDispatch()

    const { caption, description } = formData;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        dispatch(updatePost({ 'postId': props.id, description, caption }))
        props.setShowEditModal(false)
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        dispatch(fetchPostDetails({ 'postId': props.id }))
    }, [])

    useEffect(() => {
        if (profile.status === 'Profile Post Fetch Success') {
            setFormData(profile.singlePostDetails)
        }
    }, [profile.status])

    return (
        <>
            <form className="flex flex-col bg-white shadow-2xl border-2 border-pink-800 absolute w-9/12 md:w-6/12 xl:w-5/12  z-50 p-4"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}
                onSubmit={onSubmitHandler}
            >
                <input
                    type="text"
                    name="caption"
                    placeholder="Enter Caption"
                    className="px-4 py-3 mb-8 text-pink-500 border-2 border-pink-400 focus:border-pink-600 hover:border-pink-300 focus:outline-none mb-4"
                    value={caption}
                    onChange={onChangeHandler}
                    required={true}
                />

                <textarea
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    className="px-4 py-3 mb-8 text-pink-500 border-2 border-pink-400 focus:border-pink-600 hover:border-pink-300 focus:outline-none mb-4"
                    value={description}
                    onChange={onChangeHandler}
                    required={true}
                    rows={5}
                ></textarea>

                <button
                    className="text-white py-2 px-4 font-semibold rounded-lg bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50 mb-8"
                >
                    Save
                </button>

                <button
                    className="text-white py-2 px-4 font-semibold rounded-lg bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 mb-8"
                    onClick={() => props.setShowEditModal(false)}
                >
                    Close
                </button>
            </form>
        </>
    );
};

export default Modal;