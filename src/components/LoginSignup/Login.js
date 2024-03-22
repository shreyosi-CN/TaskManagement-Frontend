import React, { useEffect, useState } from 'react'
import './LoginSignup.css'
import email_icon from '../Assets/email_icon.png'
import { Link , useNavigate} from 'react-router-dom';


const Login = ({ onLogin }) => {
    const navigate = useNavigate();


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function login() {
        console.warn(email, password);
        let item = { email, password };
        let result = await fetch("http://localhost:8000/api/login", {
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
            window.localStorage.setItem("isLoggedIn",true);
            window.localStorage.setItem("LoginToken",result.data.token);

            onLogin();

            navigate("/dashboard");

        }
        
    }
    return (
        <div className="container">
            <div className='header'>
                <div className='text'>Sign In</div>
                <div className="underline"></div>
            </div>
            <div className='inputs'>

                <div className='input'>
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input'>
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className='submit-container'>
                <div className='submit'>
                    <button className='btn btn-primary' onClick={login}>Login</button>
                </div>
            </div>

            <Link to="/signup">Create Account</Link>


        </div>
    )
}

export default Login
