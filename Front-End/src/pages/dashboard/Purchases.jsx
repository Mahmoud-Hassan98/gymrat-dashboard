import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import axios from "axios";

export function Purchases() {
  const [purchases, setPurchases] = useState([]);

  const handleDelete = async (id) => {
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      try {
        await axios.put(`http://localhost:8181/payments/${id}`);
        console.log(response);
        // Perform any necessary actions after deletion
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

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:8181/payments");
        const uniquePayments = removeDuplicates(response.data.payments, "payment_id");
        setPurchases(uniquePayments);
        console.log(uniquePayments); // Log the fetched purchases data without duplicates
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPayments();
  }, []);

  const removeDuplicates = (arr, key) => {
    return Object.values(
      arr.reduce((acc, obj) => {
        if (!acc[obj[key]]) {
          acc[obj[key]] = obj;
        }
        return acc;
      }, {})
    );
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
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
            >
              Add
            </Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "PurchasesID",
                  "userName",
                  "user_id",
                  "date",
                  "cost",
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
              {purchases.map(
                (
                  {
                    payment_id,
                    name,
                    user_id,
                    payment_date,
                    payment_cost,
                    phone,
                  },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === purchases.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  const modifiedDate = new Date(payment_date);
                  const modifiedDateStr = modifiedDate
                    .toISOString()
                    .slice(0, 10);

                  return (
                    <tr key={payment_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {payment_id}
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
                          {payment_cost}
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
                                handleDelete(payment_id);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </IconButton>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Purchases;
