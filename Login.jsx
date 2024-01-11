import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data.message);
                // Store userId in localStorage for future use
                localStorage.setItem('userId', data.userId);
                // Redirect to Userdash with the username as a parameter
                navigate(`/userdash/${username}`);
            } else {
                console.error('Login failed:', data.message);
                window.alert('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='login-page'>
            {/* Header Section */}
            <header className="header">
                <div className="logo-container">
                    <div className="logo">
                        <img
                            src="/img/166028664_padded_logo-removebg-preview.png"
                            alt="Gourmet Grove"
                            className="logo-img"
                            style={{ height: '70px', width: '70px' }}
                        />
                    </div>
                    <h3>Gourmet Grove</h3>
                </div>
                <nav className="nav">
                    <ul>
                        <li>
                            <Link style={{ textDecoration: "none", color: "black" }} to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link style={{ textDecoration: "none", color: "black" }} to={'/about'}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link style={{ textDecoration: "none", color: "black" }} to={'/login'}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link style={{ textDecoration: "none", color: "black" }} to={'/signup'}>
                                Signup
                            </Link>
                        </li>
                        <li>
                            <Link style={{ textDecoration: "none", color: "black" }} to={'/search'}>
                                <span className="material-symbols-outlined">
                                    search
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Login Form Section */}
            <div className='login-container'
                style={{
                    backgroundImage: `url('/img/pexels-ella-olsson-1640777.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    color: '#fff',
                }}
            >
                <div className='login-wrapper'>
                    <div className="login-form">
                        <h2>Login</h2>
                        <form>
                            <label htmlFor="username">User Name</label>
                            <input type="text" id='username' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="password">Password</label>
                            <input type="password" id='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type='button' onClick={handleLogin}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
