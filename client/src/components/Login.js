import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert';

function Login() {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();


    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/login', {
                email: email,
                password: password
            })
            navigate('/dashboard');
        } catch (error) {
            if (error.response){
                setMsg(error.response.data.msg)
            }
        }
    }

return (
    <section className="sign-in">
            <div className="container">
                <div className="signin-content">

                    <div className="signin-image">
                        <figure><img src="images/signin-image.jpg" alt="sign up image" /></figure>
                        <a href="/register" className="signup-image-link">Create an account</a>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Login</h2>
                    
                        <form onSubmit={Auth} className="register-form" id="login-form">
                        <p>{msg}</p>
                            <div className="form-group">
                                <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="email" name="email" id="email" placeholder="Your Email" value={email}  onChange={(e) => setEmail(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                            <input type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            
                            <div className="form-group form-button">
                                <button type="submit" name="signin" id="signin" className="form-submit" value="Log in">Login</button>
                            </div>
                        </form>
                    
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Login