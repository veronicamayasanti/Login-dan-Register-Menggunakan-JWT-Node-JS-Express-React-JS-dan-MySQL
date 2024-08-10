import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [users, setUsers] = useState([]);
  const [expire, setExpire] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    refreshToken();
  }, []);

  
  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:8080/token');
      setToken(response.data.accesToken);
      const decoded = jwtDecode(response.data.accesToken);
      setName(response.data.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate('/login');
      } 
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:8080/token');
      config.headers.Authorization = `Bearer ${response.data.accesToken}`;
      setToken(response.data.accesToken);
      const decoded = jwtDecode(response.data.accesToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
    
  
  const getUsers = async () => {
    const response = await axiosJWT.get('http://localhost:8080/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });
    setUsers(response.data);
  }

  return (
    <div>
      <h1>Welcome {name}</h1>
      <button onClick={getUsers}>Get Users</button>
      <table border="1" cellPadding="10" className='table'>
   <thead>
     <tr>
      <th>No</th>
       <th>Name</th>
       <th>Email</th>
     </tr>
   </thead>
   <tbody>
     {users.map(user => (
       <tr key={user.id}>
         <td>{user.id}</td>
         <td>{user.name}</td>
         <td>{user.email}</td>
       </tr>
     ))}
   </tbody>
      </table>

    
     

    
    </div>
  )
}



export default Dashboard