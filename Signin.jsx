import React, { useState } from 'react';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = () => {
        console.log('Signin clicked with:', { username,email, password });
      };
  return (
    <div className="signin-container">
        <div className='signin-form'>
            <h2>Signin</h2>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={handleSignin}>
                    Signin
                </button>
            </form>
        </div>
    </div>
  )
}

export default Signin