import { Link } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import Select from 'react-select'
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { usersData } from "@/data";
const options = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Campany', label: 'Campany' },
  { value: 'User', label: 'User' }
]

export function EditUsers() {
  return (
    <>
      {/* <div className="flex flex-col w-72 items-end gap-6">
        <Input className="bg-white" type="text" size="lg" label="Name" />
        <Input type="email" size="lg" label="Email" />
        <Input type="password" size="lg" label="Password" />
        <Select className="w-72" options={options} label="Role" />

        <Button className="w-72" color="green" ripple={true}>Save</Button>
      </div> */}
    </>
  );
}

export default EditUsers;
