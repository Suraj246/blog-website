import './App.scss';
import SignUp from './components/header/SingUp'
import Login from './components/header/Login'
import BlogPage from './components/blogs/BlogPage'
import CreateBlog from './components/blogs/CreateBlog'
import Header from './components/header/Header'
import { Routes, Route } from 'react-router-dom'
import UserBlogs from './components/blogs/UserBlogs';
import SingleBlogScreen from './components/blogs/SingleBlogScreen';
import React, { useEffect, useState } from 'react'

function App() {
  const [inputTitle, setInputTitle] = useState("");

  return (
    <div className="App">
      <Header inputTitle={inputTitle} setInputTitle={setInputTitle} />
      <Routes>
        <Route path="/" element={<BlogPage inputTitle={inputTitle} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/user-blogs" element={<UserBlogs />} />
        <Route path="/blog/:id" element={<SingleBlogScreen />} />
      </Routes>
    </div>
  );
}

export default App;
