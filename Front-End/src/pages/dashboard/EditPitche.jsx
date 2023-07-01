import { Link } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import Select from 'react-select'



const options = [
  { value: '0', label: 'pending' },
  { value: '1', label: 'approved' },
 
]

export function EditPitche() {
  return (
    <>
      <div className="flex flex-col w-72 items-end gap-6">
      <Input className="bg-white" type="text" size="lg" label="Pitch-Owner" />
      <Input type="text" size="lg" label="Pitch-Name" />
      <Input type="number" size="lg" label="Capacity" />
      <Input type="text" size="lg" label="Discription" />
      <Input type="file" accept="image/*" label="upload image" />

      <Select className="w-72" options={options} label=" State" />

      <Button  className="w-72"  color="green" ripple={true}>Edit Pitch</Button>
    </div>
  </> 
  );
}

export default EditPitche;