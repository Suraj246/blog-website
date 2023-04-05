import React, { useEffect, useState } from 'react'
import "./blogs.scss"
import axios from 'axios'
const CreateBlog = () => {
    const [input, setInput] = useState({
        title: "", content: ""
    })

    const [image, setImage] = useState('')

    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { title, content } = input

        const formData = new FormData()
        formData.append("title", title)
        formData.append("image", image)
        formData.append("content", content)
        if (!title || !content) {
            alert("Please enter a valid email or password")
            return
        }
        try {
            const { data } = await axios.post("http://localhost:4000/create-post",
                formData,
            );
            if (data) {
                localStorage.setItem("blogId", data.newPost._id)
                window.location.reload()
            }
            else {
                return false;
            }
        } catch (ex) {
            console.log(ex);
        }
    };
    useEffect(() => {
        const blogId = localStorage.getItem("blogId") || ''
        const userId = JSON.parse(localStorage.getItem("blog userData"))
        axios.post("http://localhost:4000/store-post-to-each-user", {
            userId, blogId
        })
    }, [])
    return (
        <div className="create-blog-page">
            <span className="create-blog-title">Create Blog </span>
            <form>
                <input type="text" name="title"
                    value={input.title}
                    placeholder='Title'
                    onChange={inputHandler}
                />
                <input type="file" name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <textarea name="content" cols="30" rows="10"
                    placeholder='Content'
                    onChange={inputHandler}
                    value={input.content}
                />
                <input type="button" value="Create" className='btn' onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default CreateBlog
