import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    getContactInfo();
  }, []);

  const getContactInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8181/getContact");
      const jsonData = response.data;
      console.log(jsonData);
      if (jsonData.length > 0) {
        const { phone_number, email, location_link } = jsonData[0];
        setPhone(phone_number);
        setEmail(email);
        setLocation(location_link);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleContact = (e) => {
    e.preventDefault();

    console.log(phone, email, location);

    axios
      .put(`http://localhost:8181/contactus00/2`, {
        email: email,
        phone_number: phone,
        location_link: location,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>

      <form onSubmit={handleContact}>
        <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
          <div className=" ">
            <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
              <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                    update contact us information
                  </h2>
                  <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
                    You can contact us anytime to share your ideas on how to improve our company. We value your support
                    and would be glad to have you as a valuable contributor.
                  </p>
                </div>

                <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
                  <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
                    <div className="overflow-hidden bg-white rounded-xl">
                      <div className="p-6">
                        <svg
                          className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            fill="#2E594A"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <p className="mt-6 text-lg font-medium text-gray-900">
                          {/* <a href="tel:+962790012079">+962 790012079</a> */}
                        </p>

                        <input type="text" placeholder="Type here" className="input input-bordered input-success w-full max-w-xs"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="overflow-hidden bg-white rounded-xl">
                      <div className="p-6">
                        <svg
                          className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            fill="#2E594A"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="mt-6 text-lg font-medium text-gray-900">

                        </p>
                        {/* <input
                          className="border border-black border-solid"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        /> */}
                        <input type="text" placeholder="Type here" className="input input-bordered input-success w-full max-w-xs"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} />
                      </div>
                     
                    </div>

                    <div className="overflow-hidden bg-white rounded-xl">
                      <div className="p-6">
                        <svg
                          className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            fill="#2E594A"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            fill="#2E594A"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="mt-6 text-lg font-medium leading-relaxed text-gray-900">
                          {/* <a
                            href="https://goo.gl/maps/5xLRKXYoJmdNnYtw6?coh=178573&entry=tt"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Our Location
                          </a> */}
                        </p>
                        <input type="text" placeholder="Type here" className="input input-bordered input-success w-full max-w-xs"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)} />
                      </div>
                    </div>


                  </div>
                </div>
                <div className="flex flex-wrap justify-center mt-5">
                        <button className="flex btn btn-outline btn-success w-20 bg-black">Update</button>
                      </div>


              </div>
            </section>
          </div>
        </div>
      </form>


    </div>


  );
};

export default ContactForm;
