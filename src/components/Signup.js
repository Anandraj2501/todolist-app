import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import "../Css/LoginSignup.css";

export default function Signup() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const navigate = useNavigate();
    if (!localStorage.getItem("credentials")) {
        localStorage.setItem("credentials", JSON.stringify([]));
    }
    let arr = JSON.parse(localStorage.getItem("credentials"));
    const handleClick = (e) => {
        e.preventDefault();
        if (name && email && password) {
            arr.push({username: name, password: password , email: email});
            localStorage.setItem("credentials", JSON.stringify(arr));

            alert("Account created successfully!!")
        }
    }

    return (
        <div className='login-container'>
            <div className='form-container'>
                <div className='app-name'> <h3>Todo-List</h3> </div>
                <div className='form-wrapper'>
                    <form className='login-details'>
                        <div className='input-container'>
                            <input type='text' placeholder='Enter Your Name' value={name} required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='input-container'>
                            <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required
                            />
                        </div>
                        <div className='input-container'>
                            <input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='login-btn'>
                            <button className='login' onClick={handleClick}>Signup</button>
                        </div>
                    </form>
                    <hr />
                    <div className='signup'> <span> Already have an account? </span> <span style={{ color: "white" }} onClick={() => navigate("/")}>Login</span> </div>
                </div>
            </div>
        </div >
    )
}
