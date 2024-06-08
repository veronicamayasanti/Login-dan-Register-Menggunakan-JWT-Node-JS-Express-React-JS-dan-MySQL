import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setconfPassword] = useState('');
    const [msg, setMsg] = useState('');
    
    const navigate = useNavigate()

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/users', {
                //data yang ingin kita submit
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            })
            navigate('/')
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }
    }


    return (
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Register</h2>
                        <form onSubmit={Register} className="register-form" id="register-form">
                            <p>{msg}</p>
                            <div className="form-group">
                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name="name"
                                    id="name"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                <input
                                    type="email"
                                    className='form-control'
                                    name="email"
                                    id="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input
                                    type="password"
                                    className='form-control'
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input
                                    type="password"
                                    className='form-control'
                                    name="confPassword"
                                    id="confPassword"
                                    placeholder="Repeat your password"
                                    value={confPassword}
                                    onChange={(e) => setconfPassword(e.target.value)}
                                />
                            </div>


                            <div className="form-group form-button">
                                <button name="signup" id="signup" className="form-submit">Register</button>
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src="images/signup-image.jpg" alt="sign up image" /></figure>
                        <a href="/" className="signup-image-link">I am already member</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register