import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'

const SingleBlogScreen = () => {
    const navigate = useNavigate()
    const params = useParams();
    const { id } = params;
    const [title, setTitle] = useState('')
    const [blog, setBlog] = useState([])
    function b() {
        axios.get(`http://localhost:4000/${id}`)
            .then((res) => {
                setBlog(res.data)
            })
            .catch((err) => { console.log(err) })
    }
    useEffect(() => {
        b()
    }, [blog])
    const addComment = async () => {
        if (!title) {
            alert('comment is empty')
            return false
        }
        await axios.post('http://localhost:4000/create-comment', { title })
            .then((response) => {
                // console.log(response)
                localStorage.setItem("commentId", response.data.newPost._id)
                setTitle('')
                setTimeout(() => {
                    localStorage.removeItem('commentId')
                }, 2000)
            })
            .catch((err) => console.log(err))

    }
    useEffect(() => {
        const commentId = localStorage.getItem('commentId')
        axios.post('http://localhost:4000/store-comment-to-each-blog', { blogId: id, commentId: commentId })
            .then((response) => {
                console.log(response)
                // window.location.reload()
            })
            .catch((err) => console.log(err))
    }, [blog])
    return (
        <div className="blog-screen-page">
            <div className="blog-container">
                <span className="title">{blog?.title}</span>
                <img src={`http://localhost:4000/uploads/${blog?.image}`} alt={blog?.title} />
                <p className="content">{blog?.content}</p>
            </div>
            <div className="comments-container">
                <span className="title">Comment Section</span>
                <div className="input-container">
                    <input type="text" name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="add comment"
                    />
                    <button onClick={addComment}>Add </button>
                </div>
                <div className="comment-section">
                    {blog?.comments?.map((elem, id) => {
                        return (
                            <div className="comment-container" key={id}>
                                <span className="comment">{elem?.title}</span>
                                <span>{elem?.createdAt.slice(0, 10)}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SingleBlogScreen
