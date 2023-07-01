import React from 'react'
import  { useState , useEffect  } from 'react';
import axios from "axios";

export default function Addproducts() {


    const [pischanged, setPisChanged] = useState(false);



    const [selectedFiles, setSelectedFiles] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [details, setDetails] = useState('');
    const [Gender, setGender] = useState('');
    const [Product_Type, setProduct_Type] = useState('');
  
  
    // File change handler
    const handleFileChange = (event) => {
      setSelectedFiles(Array.from(event.target.files));
    };
  
    // Form submit handler
    const handleSubmit = (event) => {
      event.preventDefault();
      
  
      // Create FormData object
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append('images', file, `image-${index}`);
      });
      formData.append('name', name);
      formData.append('price', price);
      formData.append('size', size);
      formData.append('details', details);
      formData.append('Gender', Gender);
      formData.append('Product_Type', Product_Type);
      
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
  
  
  
      // Send the form data to the server
      axios.post('http://localhost:8181/senddata', formData, config)
        .then((response) => {
          console.log('Data sent:', response.data);
          setPisChanged(!pischanged);
  
          // Do something with the response data
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    };

    


  return (
 <>
  <section className="max-w-2xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
    <h1 className="text-xl font-bold text-black capitalize dark:text-white">
          Add Field
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="small_size"
            >
              image
            </label>
            <input
              className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="small_size"
              type="file"
              multiple

              onChange={handleFileChange}
            />

            <div>
              <label className="text-black dark:text-gray-200" htmlFor="username">
              Product name :
              </label>
              <input
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div>
              <label className="text-black dark:text-gray-200" htmlFor="emailAddress">
              Product Price : 
              </label>
              <input
                id="emailAddress"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div>
              <label className="text-black dark:text-gray-200" htmlFor="fieldType">
               size :
              </label>
              <select
                id="fieldType"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              >
              <option value="">Select Size</option>
                <option value="SM">SM</option>
                <option value="MD">MD</option>
                <option value="LG">LG</option>
                <option value="XL">XL</option>
                <option value="2X">2X</option>
                <option value="3X">3X</option>
              </select>
            </div>
          
            <div>
            <label className="text-black dark:text-gray-200" htmlFor="citySelect">
              Product Type  :
            </label>
            <select
              id="citySelect"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={Product_Type}
              onChange={(event) => setProduct_Type(event.target.value)}
              
            >
              <option value="">Select Type</option>
              <option value="clothes">clothes </option>
              <option value="cardio">cardio</option>
              <option value="strength">strength</option>
              <option value="Weights">Weights</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
            <div>
              <label className="text-black dark:text-gray-200" htmlFor="textarea">
                Details:
              </label>
              <textarea
                id="textarea"
                className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
              ></textarea>
            </div>
            <div>
            <label className="text-black dark:text-gray-200" htmlFor="citySelect">
              Gender :
            </label>
            <select
              id="citySelect"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              value={Gender}
              onChange={(event) => setGender(event.target.value)}   
            
            >
              <option value="">Select Type</option>
              <option value="Men">Men </option>
              <option value="woman">Woman</option>
          
            </select>
          </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-yellow-500 rounded-md hover:bg-yellow-700 focus:outline-none focus:bg-gray-600"
              style={{ backgroundColor: '#54B435' }}
            >
              Submit
            </button>
          </div>
        </form>
      </section> 
 </>
  )
}

