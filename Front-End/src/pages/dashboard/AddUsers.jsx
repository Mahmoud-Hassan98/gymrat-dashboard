import React, { useState } from 'react';
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import Select from 'react-select';
import axios from 'axios';

const options = [
  { value: 'Admin', label: 'Admin' },
  { value: 'server provider', label: 'server provider' },
  { value: 'User', label: 'User' }
];

export function AddUsers() {
  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [user_password, setUserPassword] = useState('');
  const [role, setRole] = useState('');

  const addOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8181/addUser', {
        user_name,
        user_email,
        user_password,
        role
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mx-auto my-20 flex flex-col items-center">
      <div className="max-w-screen-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Add User to website
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
           
          </p>
        </div>
        <div className="flex items-center justify-center">

      <div className="flex flex-col w-72 items-end gap-6 ">
        <form onSubmit={addOnSubmit}>
          <Input
            className="bg-white"
            type="text"
            size="lg"
            label="Name"
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <Input
            type="email"
            size="lg"
            label="Email"
            value={user_email}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <br />
          <Input
            type="password"
            size="lg"
            label="Password"
            value={user_password}
            onChange={(e) => setUserPassword(e.target.value)}
          />
           <br />
          <Select
            className="w-72"
            options={options}
            label="Role"
            value={role}
            onChange={(selectedOption) => setRole(selectedOption.value)}
          />
           <br />
          <Button type='submit' className="w-72" color="green" ripple={true}>Add User</Button>
        </form>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default AddUsers;
