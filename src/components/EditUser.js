// src/components/EditUser.js
import React, { useState } from 'react';
import axios from 'axios';

const EditUser = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [company, setCompany] = useState(user.company?.name || '');
  const [username, setUsername] = useState(user.username);  // Keep the existing username

  const handleSubmit = () => {
    if (!name || name.length < 3) {
      alert("Name must be at least 3 characters.");
      return;
    }
    if (!email.includes('@')) {
      alert("Please provide a valid email.");
      return;
    }
    // Add more validations as per the requirement

    const updatedUser = {
      ...user, // Preserve the original user ID and other unchanged fields
      name,
      email,
      phone,
      address,
      company: { name: company },
      username,  // Keep the existing username unchanged
    };

    axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, updatedUser)
      .then(response => {
        onUpdate(response.data);
      })
      .catch(error => console.error("Error updating user:", error));
  };

  return (
    <div className='edit'>
      <h2>Edit User</h2>
      <input 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Name"
        required
      />
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email"
        required
      />
      <input 
        type="tel" 
        value={phone} 
        onChange={e => setPhone(e.target.value)} 
        placeholder="Phone"
        required
      />
      <input 
        type="text" 
        value={address.street} 
        onChange={e => setAddress({ ...address, street: e.target.value })} 
        placeholder="Street"
        required
      />
      <input 
        type="text" 
        value={address.city} 
        onChange={e => setAddress({ ...address, city: e.target.value })} 
        placeholder="City"
        required
      />
      <input 
        type="text" 
        value={company} 
        onChange={e => setCompany(e.target.value)} 
        placeholder="Company (optional)"
      />
      <input 
        type="text" 
        value={username} 
        readOnly  // Prevent editing the username
        placeholder="Username (auto-generated)"
      />
      <button className=" update" onClick={handleSubmit}>Update </button>
    </div>
  );
};

export default EditUser;
