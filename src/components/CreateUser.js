// src/components/CreateUser.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CreateUser.css';

const CreateUser = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({ street: '', city: '' });
  const [company, setCompany] = useState('');
  const [username, setUsername] = useState('');

  // auto-fill username when 'name' changes
  useEffect(()=>{
    if(name.length>=3){
      setUsername(`USER-${name}`);

    } else{
      setUsername('');
    }
  },[name]);


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

    const newUser = {
      name,
      email,
      phone,
      address,
      company: { name: company },
      username, // use auto-generated username
    };

    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        onCreate(response.data);
        setName('');
        setEmail('');
        setPhone('');
        setAddress({ street: '', city: '' });
        setCompany('');
        setUsername('');
      })
      .catch(error => console.error("Error creating user:", error));
  };

  return (
    <div className='createuser'>
      <h2>Create User</h2>
      <input className='name'
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Name" required 
      />
      <input className='email'
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email" required 
      />

      <input 
      type="tel"
      value={phone}
      onChange={e => setPhone(e.target.value)}
      placeholder='Phone'
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
        placeholder="Company"
      />
      <input 
        type="text" 
        value={username} 
        readOnly 
        placeholder="Username"
      />
      
      <button className=" create" onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateUser;
