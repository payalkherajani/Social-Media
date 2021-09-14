import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { loadFeedForUser } from './postSlice'
import no_posts from '../../assets/no_posts.svg'
import dateformat from 'dateformat'


const Feed = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.user)
    const posts = useSelector((state) => state.post)


    useEffect(() => {
        if (localStorage.token === '') {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        dispatch(loadFeedForUser())

    }, [user.following])

    console.log(posts.feed)

    return (
        <>
            <h2 className="text-center font-serif uppercase text-2xl xl:text-3xl mb-4">FEED</h2>

            <div className="container w-11/12 md:w-8/12 mx-auto flex flex-col">
                {
                    posts.feed.length === 1 && posts.feed[0].length === 0 ? (
                        <div>
                            <h1 className="text-center text-pink-700 font-serif uppercase text-2xl xl:text-3xl mb-4">
                                No Posts, Follow Users</h1>
                            <img src={no_posts} alt="No Post SVG" />

                        </div>) : (
                        posts.feed.map((followersPostArray) => {
                            return followersPostArray.map((post) => {
                                console.log(post.image_of_post, "45")
                                return <div key={post._id}
                                    className="max-w-sm w-full lg:max-w-full lg:flex mb-4">

                                    <div className=" border border-gray-400 h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-contain bg-no-repeat bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{
                                        backgroundImage:
                                            `url(${post.image_of_post})` || `url('https://cdn.dribbble.com/users/2243610/screenshots/14147441/media/0099de4c63da0f32770c4694235a504c.jpg')`
                                    }}>

                                    </div>

                                    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">

                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex justify-center items-center">
                                                <img className="w-10 h-10 rounded-full mr-4" src={"https://cdn.dribbble.com/users/3844750/screenshots/10729124/media/2523facfa3e436b8331c316dcc4998f2.jpg"} alt="Avatar User" />
                                                <div className="text-sm">
                                                    <p className="text-gray-900 leading-none">{post.user.name}</p>
                                                </div>
                                            </div>
                                            <div className="text-gray-600">{dateformat(post.updatedAt, "fullDate")}</div>
                                        </div>

                                        <div className="mb-8 text-left">
                                            <div className="text-gray-900 font-bold text-xl mb-2">{post.caption}</div>
                                            <p className="text-gray-700 text-base">{post.description}</p>
                                        </div>

                                        <hr />

                                        <div className="flex mt-4 justify-between">
                                            <i className="far fa-heart text-2xl"></i>
                                            <i className="far fa-comment text-2xl"></i>
                                        </div>

                                    </div>
                                </div>
                            })
                        })
                    )
                }



            </div>
        </>
    )
}


export default Feed


//<div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">

// {/* <!-- media --> */}
// <div className="h-64 w-auto md:w-1/2">
//     <img className="inset-0 h-full w-full object-cover object-center" src="https://cdn.dribbble.com/users/2268251/screenshots/5903041/dribla.jpg?compress=1&resize=800x600" />
// </div>

// {/* <!-- content --> */ }
// <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
//     <h3 className="font-semibold text-lg leading-tight truncate">title</h3>
//     <p className="mt-2">
//         paragraph
//     </p>
//     <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
//         author &bull; date
//     </p>
// </div>
// </div > 