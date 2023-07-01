import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  IconButton
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

export function Users() {
  // State to store users data
  const [usersData, setUsersData] = useState([]);

  // Fetch users data from the server
  const getUsersData = async () => {
    try {
      const response = await axios.get('http://localhost:8181/usersData');
      setUsersData(response.data);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const handleUpdate = async (id, role) => {
    const confirmed = await showUpdatePrompt();
    if (confirmed) {
      try {
        await axios.put(`http://localhost:8181/mais/${id}`, {
          id: id,
          role: role
        });
        getUsersData(); // Refresh data after update
      } catch (error) {
        console.error(error);
      }
    }
  };


  // const handleUpdate = async (id, role) => {
  //   const confirmed = await showUpdatePrompt();
  //   if (confirmed) {
  //     try {
  //       const response = await axios.put(`http://localhost:8181/mais/${id}`, {
  //         id: id,
  //         role: role
  //       });
  //       // Check if the update was successful
  //       if (response.status === 200) {
  //         // Update the role for the specific user in the state immediately
  //         setUsersData(prevData => {
  //           return prevData.map(user => {
  //             if (user.user_id === id) {
  //               return { ...user, role: role };
  //             }
  //             return user;
  //           });
  //         });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };



  const showUpdatePrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to change the user state?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!",
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };



  // Update the handleDelete function to remove the deleted user from the state
  const handleDelete = async (user_id) => {
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      try {
        await axios.put(`http://localhost:8181/deleteUser/${user_id}`);
        // Remove the deleted user from the state
        setUsersData(prevData => prevData.filter(user => user.user_id !== user_id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Update the getUsersData function to exclude soft-deleted users
  useEffect(() => {
    axios
      .get('http://localhost:8181/usersData')
      .then((response) => {
        // Filter out soft-deleted users
        const filteredData = response.data.filter(user => !user.deleted);
        // Update the usersData state with the filtered data
        setUsersData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching users data:', error);
      });
  }, []);



  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to soft delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="yellow" className="mb-8 p-6">
          <div className="grid grid-cols-6 gap-x-8 justify-end">
            <Typography variant="h6" color="black">
              Users Table
            </Typography>
            <Typography
              as={Link}
              to="/dashboard/Users/add"
              className="text-xs font-semibold text-blue-gray-600 justify-center"
            >
              <Button color="blue-gray" size="sm">
                Add User
              </Button>
            </Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Name", "Email", "Role", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usersData.map(({ user_id, user_name, user_email, role }, key) => {
                const className = `py-3 px-5 ${key === usersData.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;

                return (
                  <tr key={user_id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {user_id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user_name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user_email}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {role}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="grid grid-cols-2 gap-2 justify-center">
                        <div className="justify-center" onClick={() => handleUpdate(user_id, role)}>
                          <Typography className="text-xs font-semibold text-blue-gray-600 justify-center">
                            <IconButton ripple={true} color="green">
                              <i className="fa-regular fa-pen-to-square"></i>
                            </IconButton>
                          </Typography>
                        </div>
                        <div className="justify-center">
                          <IconButton color="red" onClick={() => handleDelete(user_id)}>
                            <i className="fa-solid fa-trash"></i>
                          </IconButton>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Users;
