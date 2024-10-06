// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  };

  const createUser = (user) => {
    setUsers([...users, user]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsEditing(false);
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => setUsers(users.filter(user => user.id !== id)))
        .catch(error => console.error("Error deleting user:", error));
    }
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  return (
    <div>
      <h1>User Management</h1>
      <CreateUser onCreate={createUser} />
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{user.id}</td>
              <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.username}</td>
              <td>
                <button className='editbutton' onClick={() => openEdit(user)}>Edit</button>
                <button className='deletebutton' onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && <EditUser user={selectedUser} onUpdate={updateUser} />}
    </div>
  );
};

export default UserList;
