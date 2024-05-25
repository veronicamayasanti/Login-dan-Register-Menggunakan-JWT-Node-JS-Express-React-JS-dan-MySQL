import React from 'react'

function Login() {
return (
    <section className="sign-in">
            <div className="container">
                <div className="signin-content">

                    <div className="signin-image">
                        <figure><img src="images/signin-image.jpg" alt="sign up image" /></figure>
                        <a href="/" className="signup-image-link">Create an account</a>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Login</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group">
                                <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" placeholder="Your Name"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="password" id="password" placeholder="Password"/>
                            </div>
                            
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </form>
                    
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Login