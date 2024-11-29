"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import teslaIcon from "../../../public/tesla-icon.png";
import toast from "react-hot-toast";
import getStarted from "../../../public/getStarted.png";
import library from "../../../public/library.png";
import settings from "../../../public/settings.png";
import activities from "../../../public/activities.png";
import reports from "../../../public/reports.png";
import people from "../../../public/people.png";
import user from "../../../public/user.png";
import download from "../../../public/Download.png";



const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [activeView, setActiveView] = useState<string>("Reports");
  console.log(data)

  // fetching the data using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the public folder
        const response = await axios.get("/task-data.json");
        setData(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unexpected error occurred"));
        }
      }
    };

    fetchData();
  }, []);

  const clickDownload = async () => {
    if (data && data.api_secret) {
      try {
        const apiSecret = data.api_secret;
  
        // Send the api_secret to the newly created proxy API
        const response = await axios.post('/api/proxy/imgDownload', {
          api: apiSecret
        });
  
        // Process the Base64 image data
        const base64Image = response.data;
  
        // Trigger the download of the Base64 image
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${base64Image}`;
        link.download = 'downloaded_image.png';
        link.click();
      } catch (error) {
        console.error('Error processing the request or downloading image:', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('API secret is missing or data is not available.');
    }
  };
  
  
  



  const renderContent = () => {
    switch (activeView) {
      case "Reports":
        return (
          <div className="pt-4 pl-6 pr-6 w-full">
            {/* div to determine section */}
            <div className="relative flex w-full justify-between items-center">
              {/* Reports section */}
              <div className="relative flex xl:w-[150px]">
                <p>Reports</p>
              </div>

              {/* Download section */}
              <div className="relative flex xl:w-[150px] justify-end items-center" onClick={clickDownload}>
                <Image src={download} alt="download" className="mr-2" />
                <p>Download</p>
              </div>
            </div>

            {/* end div to determine section */}
          </div>
        );
      case "Library":
        return <div className="p-4">Library section</div>;
      case "People":
        return <div className="p-4">People section.</div>;
      case "Activities":
        return <div className="p-4">Activities section.</div>;
    }
  };

  return (
    // dashboard page
    <div className="relative flex text-gray-600 bg-gray-100">
      {/* side bar */}
      <div className="relative flex flex-col bg-white rounded-r-3xl xl:w-[250px] xl:min-h-screen">
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
        <div className="relative flex flex-col xl:top-[90px] gap-2 font-bold justify-center xl:w-full">
          <button
            onClick={() => setActiveView("Reports")}
            className={`relative flex items-center justify-center xl:w-[80%] xl:left-[10%] xl:h-[46px] xl:rounded-lg hover:bg-blue-100 hover:text-blue-400 ${
              activeView === "Reports" ? "bg-blue-100 text-blue-400" : ""
            }`}
          >
            <Image src={reports} alt="reports" className="xl:w-[24px] mr-2.5" />
            Reports
          </button>
          <button
            onClick={() => setActiveView("Library")}
            className={`relative flex items-center justify-center xl:w-[80%] xl:left-[10%] xl:h-[46px] xl:rounded-lg hover:bg-blue-100 hover:text-blue-400 ${
              activeView === "Library" ? "bg-blue-100 text-blue-400" : ""
            }`}
          >
            <Image src={library} alt="library" className="mr-2.5" />
            Library
          </button>
          <button
            onClick={() => setActiveView("People")}
            className={`relative flex items-center justify-center xl:w-[80%] xl:left-[10%] xl:h-[46px] xl:rounded-lg hover:bg-blue-100 hover:text-blue-400 ${
              activeView === "People" ? "bg-blue-100 text-blue-400" : ""
            }`}
          >
            <Image src={people} alt="people" className="mr-2.5" />
            People
          </button>
          <button
            onClick={() => setActiveView("Activities")}
            className={`relative flex items-center justify-center xl:w-[80%] xl:left-[10%] xl:h-[46px] xl:rounded-lg hover:bg-blue-100 hover:text-blue-400 ${
              activeView === "Activities" ? "bg-blue-100 text-blue-400" : ""
            }`}
          >
            <Image src={activities} alt="activities" className="mr-2.5" />
            Activities
          </button>
        </div>
        {/* end menu buttons */}

        {/* support bar */}
        <div className="relative flex flex-col xl:top-[140px] font-bold">
          <h2 className="relative flex xl:left-[42px]">Support</h2>

          <button className="relative flex xl:top-[20px] xl:rounded-lg hover:bg-blue-100 hover:text-blue-400 items-center justify-center xl:w-[80%] xl:left-[10%] xl:h-[46px]">
            <Image src={getStarted} alt="get started" className="-ml-2" />
            <p className="ml-4">Get started</p>
          </button>
          <button className="relative flex xl:top-[40px] xl:rounded-lg hover:bg-blue-100 hover:text-blue-400 items-center justify-center xl:w-[80%] xl:left-[10%] xl:h-[46px] ">
            <Image src={settings} alt="settings" className="-ml-[28px]" />
            <p className="ml-[16px]">Settings</p>
          </button>
        </div>
        {/* end support bar */}

        {/* current user */}
        <div className="relative flex flex-col xl:top-[47%]">
          <div className="relative flex xl:w-[90%] xl:h-[1px] bg-gray-300 xl:left-[10%]"></div>
          <div className="relative flex flex-col xl:w-[80%] xl:left-[20%] xl:top-12">
            <Image src={user} alt="current user" />
            <h3 className="font-bold">Sam Wheeler</h3>
            <p className="text-[10px]">samwheeler@example.com</p>
          </div>
        </div>
        {/* end current user */}
      </div>
      {/* end side bar */}

      {/* main content */}
      <div className="relative flex w-full">{renderContent()}</div>
      {/* end main content */}
    </div>
  );
};

export default Dashboard;
