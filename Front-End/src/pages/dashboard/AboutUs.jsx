import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useEffect, useState } from "react";
import axios from "axios";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
</style>

export function AboutUs() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');


  const [about, setAbout] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8181/getTeam')
      .then((response) => {
        setAbout(response.data);
        console.log(response.data)
      })
      .catch((error) => console.log(error.message))
  }, [])



  const handleTeam = (e, userInfo) => {
    e.preventDefault();
    console.log(name, role, github, linkedin);
    console.log(userInfo)
    let x = userInfo.id
    axios
      .put(`http://localhost:8181/editTeam/${x}`, {
        name: name,
        role: role,
        github: github,
        linkedin: linkedin,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  return (
    <div style={{ fontFamily: 'Roboto Slab, serif' }}>
      {/* <section className="flex items-center py-10 bg-stone-100 xl:h-screen font-poppins dark:bg-white-300"
      >
        <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap ">
            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <div className="relative">
                <img
                  src="https://img.freepik.com/free-photo/diverse-businesspeople-having-meeting_53876-103954.jpg?w=1380&t=st=1685543448~exp=1685544048~hmac=aed33e88652f280146a7d522b2c9c1f01daf545354b2b502b6efea3d12e886c8"
                  alt=""
                  className="relative z-40 object-cover w-full h-96 lg:rounded-tr-[80px] lg:rounded-bl-[80px] rounded"
                />
                <div className="absolute z-10 hidden w-full h-full bg-[#82CD47] rounded-bl-[80px] rounded -bottom-6 right-6 lg:block"></div>
                <div className="absolute z-50 text-[#82CD47] transform -translate-y-1/2 cursor-pointer top-1/2 left-[46%] hover:text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="w-14 h-14 bi bi-play-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
              <div className="relative">
                <h1 className="absolute -top-20   left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold  dark:text-black opacity-5 md:block hidden">
                  About Us
                </h1>
                <h1 className="pl-2 text-3xl font-bold border-l-8 border-[#82CD47] md:text-5xl text-black-300">
                  Welcome to our site
                </h1>
              </div>
              <p className="mt-6 mb-10 text-base leading-7 text-gray-800 dark:text-gray-800">
                Welcome to our website, the leading platform for Purchases sports fields and playgrounds. We strive to provide a seamless and convenient experience for sports enthusiasts and athletes to reserve their preferred venues.</p>
            </div >
          </div >
        </div >
      </section > */}



      <div div >
        <div className="container flex justify-center mx-auto pt-16">
          <div>
            <p className="text-black-500 text-lg text-center font-normal pb-3">Edit Meet our team section</p>
            <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">Those who work behind the scene</h1>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">

          {
            about.map((aboutus) => (
              <form onSubmit={(e) => handleTeam(e, aboutus)} className="w-1/3 px-10" key={aboutus.id}>

                <div className="">
                  <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
                    <div className=" relative mt-16 mb-32   ">
                      <div className="rounded overflow-hidden shadow-md bg-white">
                        <div className="absolute -mt-20 w-full flex justify-center"></div>
                        <div className="px-6 mt-16">
                          <div className="font-bold text-2xl text-center pb-1">{aboutus.name}</div>
                          <input type="text" placeholder="Update name here" className="input input-bordered input-success w-full max-w-xs"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />

                          <h3 className="font-bold text-2xl text-center pb-1">{aboutus.role}</h3>

                          <input type="text" placeholder="Update role here" className="input input-bordered input-success w-full max-w-xs"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <h3 className="font-bold text-2xl text-center pb-1">github</h3>

                          <input type="text" placeholder="Update github Link here" className="input input-bordered input-success w-full max-w-xs"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                          />
                          <h3 className="font-bold text-2xl text-center pb-1">Linkedin</h3>

                          <input type="text" placeholder="Update Linkedin Link here" className="input input-bordered input-success w-full max-w-xs"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-wrap justify-center mt-5 mb-5">
                          <button className="flex btn btn-outline btn-success w-20 bg-black">Update</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

            ))
          }
        </div>


      </div >

    </div >
  );
}

export default AboutUs;