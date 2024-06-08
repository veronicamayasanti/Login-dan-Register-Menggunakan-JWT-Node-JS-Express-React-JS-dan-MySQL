import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  {jwtDecode}   from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const initialize = async () => {
    refreshToken();
    getUsers();
  }
 initialize();
}, []);


 const refreshToken = async () => {
  try {
    const response = await axios.get('http://localhost:8080/token');
    console.log('Token response:', response.data);
    const accessToken = response.data.accessToken;

    if (!accessToken ||typeof accessToken !== 'string' || accessToken.trim() === '') {
      throw new Error('Invalid token received');
    }


    setToken(accessToken);
    const decoded = jwtDecode(accessToken);
    console.log('decodes token: ',decoded);
    
    setName(decoded.name);
    setExpire(decoded.exp);
  } catch (error) {
    console.error('Error refreshing token:', error);
    if(error.response) {
      navigate('/dashboard')
    }
  }
 }

 
const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(async (config) => {
  const currentDate = new Date();
  if (expire * 1000 < currentDate.getTime()) {

    try {
      const response = await axios.get('http://localhost:8080/token');
      const accessToken = response.data.accessToken;

      if (!accessToken ||typeof accessToken !== 'string' || accessToken.trim() === '') {
        throw new Error('Invalid token received');
      }

      config.headers.Authorization = `Bearer ${accessToken}`;
      setToken(accessToken);
      const decoded = jwtDecode(accessToken);
      console.log('decoded token in interceptor: ', decoded);

      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      console.error('Error refreshing token inside interceptor:', error);
      navigate('/dashboard');
      return Promise.reject(error);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


 


const getUsers = async () => {
 try {
   const response = await axiosJWT.get('http://localhost:8080/users', {
     headers: {
       Authorization: `Bearer ${token}`
     }
   });
   setUsers(response.data);
  console.log(response.data);
 } catch (error) {
  console.error('error fetching users: ', error);
 }
}



  return (
    <div>
        <h1 className='title'>welcome Back: {name}</h1>
      <button onClick={getUsers}>Get users</button>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
         { users.map((user, index) => (
           <tr key={user.id}>
             <td>{index + 1}</td>
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