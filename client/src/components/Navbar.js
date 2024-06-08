import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

const Logout = async () => {
    try {
        await axios.delete('http://localhost:8080/logout');
        navigate('/')
    } catch (error) {
        console.log(error);
    }

}

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
                              <li className="active"><a href="/">Home</a></li>

                           
                              <li><a  onClick={Logout}>Logout</a></li>
                              
                              
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Navbar