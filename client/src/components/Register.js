import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        Object.keys(form).forEach(key => {
            formData.append(key, form[key])
        })


        try {
            const response = await axios.post("http://localhost:3300/users", formData,)
            console.log('Server response:', response.data);
            navigate('/login')
        } catch (error) {
            console.error('axios error:', error);
        }
    }


    return (
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form method="POST" className="register-form" id="register-form">

                            <div className="form-group">
                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name="name"
                                    id="name"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={handleChange}
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
                                    value={form.email}
                                    onChange={handleChange}
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
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input
                                    type="password"
                                    className='form-control'
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Repeat your password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" onClick={handleClick} />
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src="images/signup-image.jpg" alt="sign up image" /></figure>
                        <a href="/login" className="signup-image-link">I am already member</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register