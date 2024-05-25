import React from 'react'

function Navbar() {
  return (
      <div className="navbar navbar-inverse">
          <div className="container-fluid">
              <div className="row">
                  <div className="col-lg-12">

                      <div className="navbar-header">
                          <button className="navbar-toggle" data-target="#mobile_menu" data-toggle="collapse"><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                          <a href="/" className="navbar-brand">GROUP.COM</a>
                      </div>

                      <div className="navbar-collapse collapse" id="mobile_menu">
                    
                         <ul className="nav navbar-nav navbar-right">
                              <li className="active"><a href="/home">Home</a></li>

                              <li><a href="/contact">Contact Us</a></li>
                              <li><a href="/profile"><span className="glyphicon glyphicon-user"></span> Profile</a></li>
                              <li><a href="/login">Login</a></li>
                              <li><a href="/users">Sign Up</a></li>
                              
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Navbar