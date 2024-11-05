import React, { useState } from 'react';
import './signIn.css';

function SignIn() {
    const [showPwd, setShowPwd] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    const handleShowPwd=(e)=>{
        setShowPwd(!showPwd);
    }

    return (
        <div className="signin-container">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* <button
                        type="button"
                        onClick={handleShowPwd}
                        className="show-hide-btn"
                    >
                        {showP ? "Hide" : "Show"}
                    </button> */}
                </div>
                <button type="submit">Sign In</button><br/>
                <p>Don't have an account? <a href="#">create</a></p>
            </form>
        </div>
    );
}

export default SignIn;