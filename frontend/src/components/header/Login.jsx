import React, { useState, useEffect } from "react";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss"

function Login() {
    const navigate = useNavigate();


    const [input, setInput] = useState({ email: "", password: "" });


    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = input

        if (!email || !password) {
            alert("Please enter a valid email or password")
            return
        }
        try {
            const { data } = await axios.post("http://localhost:4000/login", {
                ...input,
            },
            );
            if (data) {
                console.log(data);
                localStorage.setItem("blog userData", JSON.stringify(data));
                // localStorage.setItem("blog userId", data.userAvailable._id)
                navigate("/")
            }
            else {
                return false;
            }
        } catch (ex) {
            console.log(ex);
        }
    };
    return (
        <div className="sing_up_page">
            <div className="signup-right">
                <div className="signup-form-container">
                    <div className="signup-msg-right">
                        <span className="signup-title-right">Welcome Back</span>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="email"
                            className="input"
                            name="email"
                            placeholder="email"
                            autoComplete="off"
                            value={input.email}
                            onChange={inputHandler}
                        />
                        <input
                            type="password"
                            className="input"
                            name="password"
                            placeholder="password"
                            autoComplete="off"
                            value={input.password}
                            onChange={inputHandler}
                        />
                        <button type="submit" className="signup">Login</button>
                        <div className="signup-btn-container">
                            <span>Don't have an account ?</span>
                            <NavLink to="/signup" className="a">Register</NavLink>
                        </div>
                    </form>
                </div>

            </div>

            {/* <ToastContainer /> */}
        </div>
    );
}

export default Login;