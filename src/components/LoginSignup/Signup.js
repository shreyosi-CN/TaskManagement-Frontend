import React from 'react'
import './LoginSignup.css'
import email_icon from '../Assets/email_icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';



const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [c_password, setC_password] = useState();

    async function signup() {
        let item = { name, email, password, c_password }
        let result = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(item)

        });

        result = await result.json();
        console.log(result);

        if (result && result.success === true) {
            {
            navigate("/login");
        }

        
    }


    return (
        <div className="container">
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <label>Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='input'>
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input'>
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='input'>
                    <label>Confirm Password</label>
                    <input type="password" onChange={(e) => setC_password(e.target.value)} />
                </div>
            </div>
            <div className='submit-container'>
                <div className='submit'><button className='btn btn-primary' onClick={signup}> SignUp</button></div>
            </div>

            <Link to="/login">Login</Link>

        </div>
    )
}
}

export default Signup
