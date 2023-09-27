import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import "../Css/LoginSignup.css";
import { authentication } from '../Auth';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    let { SignIn} = useContext(authentication);


    if (!localStorage.getItem("credentials")) {
        localStorage.setItem("credentials", JSON.stringify([]));
    }
    const navigate = useNavigate();



    const handleSignIn = async (e) => {
        e.preventDefault()
        await SignIn(email, password);
        const user = JSON.parse(localStorage.getItem("logedinuser"));

        if (user) {
            console.log(user[0].username);
            navigate("/home");
        }
        else{
            alert("enter valid data");
        }



    }
    return (
        <div className='login-container'>
            <div className='form-container'>
                <div className='app-name'> <h3>Todo-List</h3> </div>
                <div className='form-wrapper'>
                    <form className='login-details'>
                        <div className='input-container'>
                            <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required
                            />
                        </div>
                        <div className='input-container'>
                            <input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='login-btn'>
                            <button className='login' onClick={handleSignIn}>Login</button>
                        </div>
                    </form>
                    <hr />
                    <div className='signup'> <span> Don't have an account? </span> <span onClick={() => navigate("/Signup")} style={{ color: "white" }}>Signup</span> </div>
                </div>
            </div>
        </div >
    )
}
