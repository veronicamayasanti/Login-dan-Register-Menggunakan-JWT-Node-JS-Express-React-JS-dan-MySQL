import React, {useEffect, useState} from 'react'
import axios from 'axios';


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get('http://localhost:8080/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setProfile(response.data);
  } catch (error) {
    console.log('error fetching profile:', error);
    setError('failed to fetch profile')
  }
};

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get('http://localhost:8080/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setUsers(response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
    setError('Failed to fetch users');
  }
};

  useEffect(() => {
    fetchProfile();
    fetchUsers();
  }, []);


   return (
    <div>
       <h1>Welcome back, {profile.name}</h1>
       {error && <p>{error}</p>}
       <h2>All Users</h2>
       <ul>
         {users.map(user => (
           <li key={user.id}>{user.name} - {user.email}</li>
         ))}
       </ul>
    </div>
  )
}

export default Dashboard