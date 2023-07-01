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
  IconButton,
} from "@material-tailwind/react";
import { bookingData } from "@/data";
import axios from "axios";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";

export function Purchases() {
  const [Purchases, setPurchases] = useState([]);

  const handledelete = async (id) => {
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      try {
        await axios.put(`http://localhost:8181/bookings/${id}`);
        getPurchases(); // Refresh data after deletion
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to soft delete this row?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, soft delete it!",
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  const getPurchases = () => {
    axios
      .get("http://localhost:8181/bookings")
      .then((response) => {
        setPurchases(response.data.rows);
      })
      .catch((error) => {
        console.error(error);
      });
    // setPurchases(response.date.rows)
  };

  useEffect(() => {
    getPurchases();
  }, []);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 ">
      <Card>
        <CardHeader variant="gradient" color="yellow" className="mb-8 p-6">
          <div className="grid grid-cols-6 justify-end gap-x-8">
            <Typography variant="h6" color="black">
            Purchases Table
            </Typography>

            <Typography
              as="a"
              href="Purchases/add"
              className="justify-center text-xs font-semibold text-blue-gray-600"
            ></Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "bookingID",
                  " userName",
                  "user_id",
                  "date",
                  "time",
                  "phone",
                  "Action",
                ].map((el) => (
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
              {Purchases.map(({ id, name, user_id, date, time, phone }, key) => {
                const className = `py-3 px-5 ${
                  key === Purchases.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                const dateStr = date;
                const datePart = dateStr.slice(0, 10); // Extract correct format
                const modifiedDate = new Date(datePart);
                modifiedDate.setDate(modifiedDate.getDate() + 1);
                const modifiedDateStr = modifiedDate.toISOString().slice(0, 10);
                return (
                  <tr key={id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user_id}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {modifiedDateStr}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {time}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {phone}
                      </Typography>
                    </td>

                    <td className={className}>
                      <div className="grid grid-cols-2 justify-center gap-2">
                        <div className="justify-center">
                          <IconButton
                            color="red"
                            onClick={() => {
                              handledelete(id);
                            }}
                          >
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

export default Purchases;
