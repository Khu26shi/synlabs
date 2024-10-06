// src/components/UserDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user details:", error));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Details for {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Username: {user.username}</p>
      <p>Address: {user.address.street}, {user.address.city}</p>
      <p>Company: {user.company?.name}</p>
      <p>Website: {user.website}</p>
    </div>
  );
};

export default UserDetail;
