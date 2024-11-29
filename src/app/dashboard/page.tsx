"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import teslaIcon from "../../../public/tesla-icon.png";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // fetching the data using axios
  useEffect(() => {
    // Declare an async function inside useEffect
    const fetchData = async () => {
      try {
        // Fetch data from the public folder
        const response = await axios.get("/task-data.json");
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (data == null) {
    toast.error(error)
  }

  return (
    // dashboard page
    <div className="relative flex text-gray-600">
      {/* side bar */}
      <div className="relative flex flex-col bg-white xl:w-[230px] xl:min-h-screen">
        {/* logo div */}
        <div className="relative flex xl:top-[43px] xl:left-[38px]">
          <Image
            src={teslaIcon}
            alt="tesla icon"
            className="xl:w-[138px] xl:h-[17px]"
          />
        </div>
        {/* end logo div */}

        {/* menu buttons */}
        <div className="relative flex flex-col xl:top-[90px] gap-2">
          <button className="relative flex items-center justify-center xl:w-[193px] xl:h-[46px] xl:rounded-lg border">
            Reports
          </button>
          <button className="relative flex items-center justify-center xl:w-[193px] xl:h-[46px]  xl:rounded-lg border">
            Library
          </button>
          <button className="relative flex items-center justify-center xl:w-[193px] xl:h-[46px] xl:rounded-lg border">
            People
          </button>
          <button className="relative flex items-center justify-center xl:w-[193px] xl:h-[46px] xl:rounded-lg border">
            Activities
          </button>
        </div>
        {/* end menu buttons */}
      </div>
      {/* end side bar */}

      {/* main content */}
      <div className="relative flex w-full">
        {/* <Image src={rightContent} alt="main content" /> */}
      </div>
      {/* end main content */}
    </div>
  );
};

export default Dashboard;
