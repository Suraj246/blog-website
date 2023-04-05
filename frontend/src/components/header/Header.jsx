import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const Header = ({ inputTitle, setInputTitle }) => {
    const navigate = useNavigate()
    const [dropdown, setDropdown] = useState(false)

    const userData = JSON.parse(localStorage.getItem("blog userData"))

    useEffect(() => {
        // JSON.parse(localStorage.getItem("blog userData"))
        if (!localStorage.getItem("blog userData")) {
            navigate("/")
        }
        else { return }
    }, [])
    const menuRef = useRef()
    const imgRef = useRef()
    window.addEventListener("click", (e) => {
        console.log()
        if (e.target !== menuRef.current && e.target !== imgRef.current) {
            setDropdown(false)
        }
    })
    return (
        <header className="header">
            <span className="title" onClick={() => navigate("/")}>My Blog</span>
            <div className="search-container">
                <input type="search" id="search" placeholder="Search Blogs"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                />
            </div>
            {userData?.userAvailable?.username || userData?.adminAvailable ?
                <div className="logout-container">
                    <span className='user-title'
                        ref={imgRef}
                        onClick={() => setDropdown(!dropdown)}
                    >{userData?.userAvailable?.username || userData?.adminAvailable?.type}</span>
                    {dropdown && userData?.userAvailable?.username ?
                        <div className="dropdown-container" ref={menuRef}>
                            <NavLink to='/create-blog' className="a">Create Blog</NavLink>
                            <NavLink to="/user-blogs" className="a">Your Blogs</NavLink>
                            <span onClick={() => {
                                localStorage.clear()
                                // localStorage.removeItem("blog userData")
                                window.location.reload()
                            }} className='logout'>logout</span>
                        </div> : null
                    }
                    {dropdown && userData?.adminAvailable ?
                        <div className="dropdown-container">
                            <span onClick={() => {
                                localStorage.clear()
                                // localStorage.removeItem("blog userData")
                                window.location.reload()
                            }} className='logout'>logout</span>
                        </div> : null
                    }
                </div>
                :
                <NavLink to="/login" className='login-title'>Login</NavLink>
            }
        </header>
    )
}

export default Header
