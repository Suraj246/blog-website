import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Pagination from './Pagination'

const BlogPage = ({ inputTitle }) => {
    const [blogs, setBlogs] = useState([])
    const [updatePost, setUpdatePost] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const user = JSON.parse(localStorage.getItem('blog userData'))
    const [image, setImage] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(2)

    const l = []

    const f = () => {
        const g = blogs.map((item) => {
            return item.blogs.map((elem) => {
                return l.push(elem)
            })
        })
        // const d = g?.blogs.map((e) => {
        //     return e
        // })
        return g
    }
    console.log(f())
    console.log(l)

    function b() {
        axios.get('http://localhost:4000')
            .then((res) => {
                setBlogs(res.data)
            })
            .catch((err) => { console.log(err) })
    }
    useEffect(() => {
        b()
    }, [blogs])

    const handleChange = (e) => {
        const { name, value } = e.target

        setUpdatePost(prev => {
            return { ...prev, [name]: value }
        })
    }
    const updateBlog = async (item) => {
        console.log(item)
        setUpdatePost(item)
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

    const deleteBlog = async (idx) => {
        const userId = JSON.parse(localStorage.getItem("blog userData"))
        const admin_id = userId.adminAvailable._id
        // console.log("delete", elem)
        // console.log(idx)
        try {
            const { data } = await axios.delete(`http://localhost:4000/admin/${admin_id}/${idx}`);
            // const { data } = await axios.delete(`http://localhost:4000/admin/${adminId}/${elem._id}/${idx}`);
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
    // get current page
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = l.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    if (user?.adminAvailable?.type === 'admin') {
        return (
            <div className='blog-page'>
                <div className="blog-page-container">
                    {currentPosts.length === 0 && "no blogs posted"}
                    {currentPosts
                        .filter((elem) => {
                            if (inputTitle === elem) {
                                return elem;
                            } else if (elem.title.toLowerCase().includes(inputTitle)) {
                                return elem;
                            }
                        })
                        .map((item, id) => {
                            return (
                                <div key={id} className="blog-container-admin">
                                    <NavLink to={`blog/${item._id}`} className="a">
                                        <div className='title-container'>
                                            <div>
                                                <img src={`http://localhost:4000/uploads/${item?.image}`} alt={item?.title} />
                                                <span className='title'>{item?.title}</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                    <div>
                                        <span onClick={() => updateBlog(item)}>edit</span>
                                        <span onClick={() => deleteBlog(item._id)}>delete</span>
                                    </div>
                                </div>
                            )
                        })}
                    {/* ignore following comment lines */}
                    {/* {blogs.map((elem, idx) => {
                        return (
                            <div key={idx} >
                                {elem.blogs
                                    .filter((elem) => {
                                        if (inputTitle === elem) {
                                            return elem;
                                        } else if (elem.title.toLowerCase().includes(inputTitle)) {
                                            return elem;
                                        }
                                    })
                                    .map((item, id) => {

                                        return (
                                            <div key={id} className="blog-container-admin">
                                                <NavLink to={`blog/${item._id}`} className="a">
                                                    <div className='title-container'>
                                                        <div>
                                                            <img src={`http://localhost:4000/uploads/${item?.image}`} alt={item?.title} />
                                                            <span className='title'>{item?.title}</span>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                                <div>
                                                    <span onClick={() => updateBlog(item)}>edit</span>
                                                    <span onClick={() => deleteBlog(item._id)}>delete</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        )
                    })} */}
                    <div className="pagination-container">
                        <button
                            onClick={() => setCurrentPage((page) => page - 1)}
                            disabled={currentPage === 1}
                        >
                            <i className='bx bx-chevron-left bx-sm'>{'<'}</i>
                        </button>
                        <Pagination postsPerPage={postsPerPage} totalPosts={l.length} paginate={paginate} />
                        <button
                            onClick={() => setCurrentPage((page) => page + 1)}
                            disabled={currentPage === 3 ? 1 : null}
                        >
                            <i className='bx bx-chevron-right bx-sm'>{'>'}</i>
                        </button>

                    </div>
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
                            <Form.Control
                                type="tel"
                                id="content"
                                aria-describedby="passwordHelpBlock"
                                name="content"
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
            </div>
        )
    }
    else {
        return (
            <div className='blog-page'>
                <div className="blog-page-container">
                    {/* {currentPosts.length === 0 && "no blogs posted"} */}

                    {currentPosts
                        .filter((elem) => {
                            if (inputTitle === elem) {
                                return elem;
                            } else if (elem.title.toLowerCase().includes(inputTitle)) {
                                return elem;
                            }
                        })
                        .map((item, id) => {
                            return (
                                <div key={id} className="blog-container-admin">
                                    <NavLink to={`blog/${item._id}`} className="a">
                                        <div className='title-container'>
                                            <div>
                                                <img src={`http://localhost:4000/uploads/${item?.image}`} alt={item?.title} />
                                                <span className='title'>{item?.title}</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        })}
                    {/* {blogs.map((elem, idx) => {
                        return (
                            <div key={idx} >
                                {elem.blogs
                                    .filter((elem) => {
                                        if (inputTitle === elem) {
                                            return elem;
                                        } else if (elem.title.toLowerCase().includes(inputTitle)) {
                                            return elem;
                                        }
                                    })
                                    .map((item, id) => {
                                        return (
                                            <NavLink to={`blog/${item._id}`} key={id} className="a">
                                                <div className="blog-container-admin" >
                                                    <div>
                                                        <img src={`http://localhost:4000/uploads/${item?.image}`} alt={item?.title} />
                                                        <span className='title'>{item?.title}</span>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        )
                                    })}
                            </div>
                        )
                    })} */}
                    {currentPosts.length === 0 && "no blogs posted"}
                    <div className="pagination-container">
                        <button
                            onClick={() => setCurrentPage((page) => page - 1)}
                            disabled={currentPage === 1}
                        >
                            <i className='bx bx-chevron-left bx-sm'>{'<'}</i>
                        </button>
                        <Pagination postsPerPage={postsPerPage} totalPosts={l.length} paginate={paginate} />
                        <button
                            onClick={() => setCurrentPage((page) => page + 1)}
                            disabled={currentPage === 3 ? 1 : null}
                        >
                            <i className='bx bx-chevron-right bx-sm'>{'>'}</i>
                        </button>

                    </div>


                </div>
            </div>
        )
    }

}

export default BlogPage
