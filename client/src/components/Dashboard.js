import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [name, setName] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    refreshToken();
  }, []);

  
  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:8080/token');
      setToken(response.data.accessToken);
      setName(response.data.name);
      console.log(response.data);

      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate('/login');
      } 
    }
  };


  const getUsers = async () => {
    const response = await axios.get('http://localhost:8080/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  }

  return (
    <div>
      <h1>Welcome {name}</h1>
      <button onClick={getUsers}>Get Users</button>
    </div>
  )
}



export default Dashboard