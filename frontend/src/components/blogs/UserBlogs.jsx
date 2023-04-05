import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [updatePost, setUpdatePost] = useState([])
    const [image, setImage] = useState('')
    // console.log(image)

    const [show, setShow] = useState(false);
    // console.log(blogs)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getBlogsData = async (event) => {
        const userId = JSON.parse(localStorage.getItem("blog userData"))
        try {
            const { data } = await axios.post("http://localhost:4000/get-user", userId);
            if (data) {
                setBlogs(data.data.blogs)
            }
            else {
                return false;
            }
        } catch (ex) {
            console.log(ex);
            return false;
        }
    };
    useEffect(() => {
        getBlogsData()
    }, [blogs])
    const handleChange = (e) => {
        const { name, value } = e.target

        setUpdatePost(prev => {
            return { ...prev, [name]: value }
        })
    }
    const deleteBlog = async (idx) => {
        const userId = JSON.parse(localStorage.getItem("blog userData"))
        console.log(idx)
        try {
            const { data } = await axios.delete(`http://localhost:4000/${userId.userId}/${idx}`);
            if (data) {
                setBlogs(data.data.blogs)
            }
            else {
                return false;
            }
        } catch (ex) {
            console.log(ex);
        }
    }
    const updateBlog = async (idx) => {
        setUpdatePost(idx)
        handleShow()

    }
    const saveUpdatePost = (e) => {
        console.log(updatePost)
        const formData = new FormData()
        formData.append("title", updatePost.title)
        formData.append("image", image)
        formData.append("content", updatePost.content)
        axios.put(`http://localhost:4000/update/${updatePost._id}`, formData)
            .then((res) => { console.log(res) })
            .catch((err) => { console.log(err) })
        handleClose()
    }
    return (
        <div className='user-blogs-page'>
            {blogs.map((elem, idx) => {
                return (
                    <div className="user-blog-container" key={idx}>
                        <img src={`http://localhost:4000/uploads/${elem?.image}`} alt={elem?.title} />
                        <div className='title-container'>
                            <span>{elem?.title}</span>
                            <span>{elem?.createdAt.slice(0, 10)}</span>
                        </div>
                        <div className="edit-delete-container">
                            <span onClick={() => updateBlog(elem)}>edit</span>
                            <span onClick={() => deleteBlog(idx)}>delete</span>
                        </div>
                    </div>
                )
            })}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className=''>Update Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="Title">Title</Form.Label>
                    <Form.Control
                        type="text"
                        id="title"
                        name="title"
                        value={updatePost.title}
                        onChange={handleChange}
                        className="mb-3"
                    />

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {/* <Form.Label>Image</Form.Label> */}
                        <input type="file" name="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Form.Group>

                    <Form.Label htmlFor="content">Content</Form.Label>

                    <textarea name="content" id="content" cols="60" rows="10"
                        value={updatePost.content}
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveUpdatePost}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserBlogs
