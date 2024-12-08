"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import teslaIcon from "../../../public/tesla-icon.png";
import getStarted from "../../../public/getStarted.png";
import library from "../../../public/library.png";
import settings from "../../../public/settings.png";
import activities from "../../../public/activities.png";
import reports from "../../../public/reports.png";
import people from "../../../public/people.png";
import user from "../../../public/user.png";
import download from "../../../public/Download.png";
import drop_down from "../../../public/drop_down.png";
import drop_down_up from "../../../public/drop_down_up.png";
import toast from "react-hot-toast";
import weak1 from "../../../public/weak1.png";
import weak2 from "../../../public/weak2.png";
import weak3 from "../../../public/weak3.png";
import strong1 from "../../../public/strong1.png";
import strong2 from "../../../public/strong2.png";
import strong3 from "../../../public/strong3.png";
import thomas from "../../../public/thomas.png";
import thisal from "../../../public/thisal.png";
import helen from "../../../public/helen.png";
import lura from "../../../public/lura.png";
import leaderboard_arrow_up from "../../../public/leaderboard_arrow_up.png";
import leaderboard_arrow_down from "../../../public/leaderboard_arrow_down.png";

// interface for topic
interface Topic {
  name: string;
  correct_percentage: number;
}

// interface for data
interface Data {
  api_secret: string;
  topics?: {
    weakest: Topic[];
    strongest: Topic[];
  };
  user_leaderboard?: {
    name: string;
    points: number;
    accuracy_percentage: number;
  }[];
  groups_leaderboard?: {
    group_name: string;
    points_per_user: number;
    accuracy_percentage: number;
  }[];
  metrics?: {
    active_users?: {
      current: number;
      total: number;
    };
    questions_answered: number;
    average_session_length_seconds: number;
    starting_knowledge_percentage: number;
    current_knowledge_percentage: number;
  };
}

const Dashboard = () => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [activeView, setActiveView] = useState<string>("Reports");
  const [isOpenTime, setIsOpenTime] = useState<boolean>(false);
  const [isOpenPeople, setIsOpenPeople] = useState<boolean>(false);
  const [isOpenTopic, setIsOpenTopic] = useState<boolean>(false);

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

  // download function
  const clickDownload = async () => {
    if (data && data.api_secret) {
      console.log(data.api_secret);
      try {
        const apiSecret = data.api_secret;

        // Send the api_secret to the newly created proxy API
        const response = await axios.post("/api/proxy/imgDownload", {
          api: apiSecret,
        });

        const base64Image = response.data;

        // Trigger the download of the Base64 image
        const link = document.createElement("a");
        link.href = `data:image/png;base64,${base64Image}`;
        link.download = "downloaded_image.png";
        link.click();
      } catch (error) {
        toast.error((error as any).message || "An unexpected error occurred.");
      }
    } else {
      alert("API secret is missing or data is not available.");
    }
  };

  // function to change icon
  const changeDropDownTimeFrame = (): void => {
    setIsOpenTime((prevState) => !prevState);
  };

  const changeDropDownPeople = (): void => {
    setIsOpenPeople((prevState) => !prevState);
  };

  const changeDropDownTopic = (): void => {
    setIsOpenTopic((prevState) => !prevState);
  };

  // content for reports
  const renderContent = () => {
    switch (activeView) {
      case "Reports":
        return (
          <div className="pt-4 pl-6 pr-6 w-full">
            {/* div to determine section */}
            <div className="relative flex w-full justify-between items-center">
              {/* Reports section */}
              <div className="relative flex xl:w-[150px]">
                <p className="font-bold xl:text-2xl">Reports</p>
              </div>

              {/* Download section */}
              <div
                className="relative flex xl:w-[150px] justify-end items-center"
                onClick={clickDownload}
              >
                <Image src={download} alt="download" className="mr-2" />
                <p className="font-bold">Download</p>
              </div>
            </div>
            {/* end div to determine section */}

            {/* horizontal bar */}
            <div className="relative flex h-[1px] bg-gray-400 xl:top-6"></div>
            {/* end horizontal bar */}

            {/* horizontal bar */}
            <div className="relative grid grid-cols-3 gap-6 xl:top-10">
              {/* time frame */}
              <div
                className="relative flex justify-between items-center w-full bg-slate-50 px-4 py-2 rounded-2xl"
                onClick={changeDropDownTimeFrame}
              >
                <div>
                  <p>
                    Timeframe: <span className="font-semibold">All-time</span>
                  </p>
                </div>
                <div className="relative flex justify-end items-center">
                  <Image
                    src={isOpenTime ? drop_down_up : drop_down}
                    alt="drop down"
                  />
                </div>
              </div>
              {/* end time frame */}

              {/* people */}
              <div
                className="relative flex justify-between items-center w-full border bg-slate-50 p-2 rounded-2xl"
                onClick={changeDropDownPeople}
              >
                <div>
                  <p>
                    People: <span className="font-semibold">All</span>
                  </p>
                </div>
                <div className="relative flex justify-end items-center">
                  <Image
                    src={isOpenPeople ? drop_down_up : drop_down}
                    alt="drop down"
                  />
                </div>
              </div>
              {/* end people */}

              {/* topic */}
              <div
                className="relative flex justify-between items-center w-full border bg-slate-50 p-2 rounded-2xl"
                onClick={changeDropDownTopic}
              >
                <div>
                  <p>
                    Topic: <span className="font-semibold">All</span>
                  </p>
                </div>
                <div className="relative flex justify-end">
                  <Image
                    src={isOpenTopic ? drop_down_up : drop_down}
                    alt="drop down"
                  />
                </div>
              </div>
              {/* end topic */}
            </div>
            {/* end horizontal bar */}

            {/* activity */}
            <div className="relative grid grid-cols-2 xl:top-14 gap-4">
              <div className="relative grid grid-cols-3 rounded-2xl h-[280px]">
                {/* active users */}
                <div className="relative bg-slate-50">
                  <p>Active Users</p>
                  <p>
                    <span>{data?.metrics?.active_users?.current}</span>
                    {"/"}
                    <span>{data?.metrics?.active_users?.current}</span>
                  </p>
                </div>
                {/* end active users */}

                {/* question answered */}
                <div className="relative bg-slate-50">
                  <p>Active Users</p>
                  <p>
                    <span>{data?.metrics?.active_users?.current}</span>
                    {"/"}
                    <span>{data?.metrics?.active_users?.current}</span>
                  </p>
                </div>
                {/* end question answered */}

                {/* average session length */}
                <div className="relative bg-slate-50">
                  <p>Active Users</p>
                  <p>
                    <span>{data?.metrics?.active_users?.current}</span>
                    {"/"}
                    <span>{data?.metrics?.active_users?.current}</span>
                  </p>
                </div>
                {/* average session length */}

                {/* starting knowledge */}
                <div className="relative bg-slate-50">
                  <p>Active Users</p>
                  <p>
                    <span>{data?.metrics?.active_users?.current}</span>
                    {"/"}
                    <span>{data?.metrics?.active_users?.current}</span>
                  </p>
                </div>
                {/* end starting knowledge */}

                {/* current knowledge */}
                <div className="relative bg-slate-50">
                  <p>Active Users</p>
                  <p>
                    <span>{data?.metrics?.active_users?.current}</span>
                    {"/"}
                    <span>{data?.metrics?.active_users?.current}</span>
                  </p>
                </div>
                {/* current knowledge */}

                {/* knowledge gain */}
                <div className="relative bg-slate-50">
                  <p>Active Users</p>
                  <p>
                    <span>{data?.metrics?.active_users?.current}</span>
                    {"/"}
                    <span>{data?.metrics?.active_users?.current}</span>
                  </p>
                </div>
                {/* knowledge gain */}
              </div>
              <div className="bg-slate-50 rounded-2xl p-4">
                <p>place to show bar chart</p>
              </div>
            </div>
            {/* end activity */}

            {/* topics */}
            <div className="relative grid grid-cols-2 text-gray-800 xl:top-[72px] gap-4">
              {/* weakest */}
              <div className="relative flex flex-col p-4 gap-2 bg-slate-50 rounded-2xl">
                <div className="text-gray-600 font-semibold">
                  Weakest Topics
                </div>
                <div className="relative flex gap-4">
                  <div>
                    <Image
                      src={weak1}
                      alt={data?.topics?.weakest[0].name || "image"}
                      width="80"
                      height="80"
                    />
                  </div>
                  <div>
                    <p>{data?.topics?.weakest[0].name}</p>
                    <p className="relative flex items-center">
                      <span className="display flex flex-col w-[590px] mr-2">
                        {" "}
                        <span className="bg-red-200 h-[14px] w-full rounded-xl"></span>
                        <span
                          className={`relative flex bg-gradient-to-r from-orange-400 to-red-500 h-[14px] -mt-[14px] rounded-xl`}
                          style={{
                            width: `${data?.topics?.weakest[0]?.correct_percentage}%`,
                          }}
                        ></span>
                      </span>
                      {data?.topics?.weakest[0].correct_percentage}%{"  "}
                      <span className="text-gray-400 ml-1">Correct</span>
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div>
                    <Image
                      src={weak2}
                      alt={data?.topics?.weakest[1].name || "image"}
                      width="80"
                      height="80"
                    />
                  </div>
                  <div>
                    <p>{data?.topics?.weakest[1].name}</p>
                    <p className="relative flex items-center">
                      <span className="display flex flex-col w-[590px] mr-2">
                        {" "}
                        <span className="bg-red-200 h-[14px] w-full rounded-xl"></span>
                        <span
                          className={`relative flex bg-gradient-to-r from-orange-400 to-red-500 h-[14px] -mt-[14px] rounded-xl`}
                          style={{
                            width: `${data?.topics?.weakest[1]?.correct_percentage}%`,
                          }}
                        ></span>
                      </span>
                      {data?.topics?.weakest[1].correct_percentage}%{"  "}
                      <span className="text-gray-400 ml-1">Correct</span>
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div>
                    <Image
                      src={weak3}
                      alt={data?.topics?.weakest[2].name || "image"}
                      width="80"
                      height="80"
                    />
                  </div>
                  <div>
                    <p>{data?.topics?.weakest[2].name}</p>
                    <p className="relative flex items-center">
                      <span className="display flex flex-col w-[590px] mr-2">
                        {" "}
                        <span className="bg-red-200 h-[14px] w-full rounded-xl"></span>
                        <span
                          className={`relative flex bg-gradient-to-r from-orange-400 to-red-500 h-[14px] -mt-[14px] rounded-xl`}
                          style={{
                            width: `${data?.topics?.weakest[2]?.correct_percentage}%`,
                          }}
                        ></span>
                      </span>
                      {data?.topics?.weakest[2].correct_percentage}%{"  "}
                      <span className="text-gray-400 ml-1">Correct</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* strongest */}
              <div className="relative flex flex-col p-4 gap-2 bg-slate-50 rounded-2xl">
                <div className="text-gray-600 font-semibold">
                  Strongest Topics
                </div>
                <div className="relative flex gap-4">
                  <div>
                    <Image
                      src={strong1}
                      alt={data?.topics?.strongest[0].name || "image"}
                      width="80"
                      height="80"
                    />
                  </div>
                  <div>
                    <p>{data?.topics?.strongest[0].name}</p>
                    <p className="relative flex items-center">
                      <span className="display flex flex-col w-[590px] mr-2">
                        {" "}
                        <span className="bg-green-200 h-[14px] w-full rounded-xl"></span>
                        <span
                          className={`relative flex bg-gradient-to-r from-lime-500 to-green-500 h-[14px] -mt-[14px] rounded-xl`}
                          style={{
                            width: `${data?.topics?.strongest[0]?.correct_percentage}%`,
                          }}
                        ></span>
                      </span>
                      {data?.topics?.strongest[0].correct_percentage}%{"  "}
                      <span className="text-gray-400 ml-1">Correct</span>
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div>
                    <Image
                      src={strong2}
                      alt={data?.topics?.strongest[1].name || "image"}
                      width="80"
                      height="80"
                    />
                  </div>
                  <div>
                    <p>{data?.topics?.strongest[1].name}</p>
                    <p className="relative flex items-center">
                      <span className="display flex flex-col w-[590px] mr-2">
                        {" "}
                        <span className="bg-green-200 h-[14px] w-full rounded-xl"></span>
                        <span
                          className={`relative flex bg-gradient-to-r from-lime-500 to-green-500 h-[14px] -mt-[14px] rounded-xl`}
                          style={{
                            width: `${data?.topics?.strongest[1]?.correct_percentage}%`,
                          }}
                        ></span>
                      </span>
                      {data?.topics?.strongest[1].correct_percentage}%{"  "}
                      <span className="text-gray-400 ml-1">Correct</span>
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div>
                    <Image
                      src={strong3}
                      alt={data?.topics?.strongest[2].name || "image"}
                      width="80"
                      height="80"
                    />
                  </div>
                  <div>
                    <p>{data?.topics?.strongest[2].name}</p>
                    <p className="relative flex items-center">
                      <span className="display flex flex-col w-[590px] mr-2">
                        {" "}
                        <span className="bg-green-200 h-[14px] w-full rounded-xl"></span>
                        <span
                          className={`relative flex bg-gradient-to-r from-lime-500 to-green-500 h-[14px] -mt-[14px] rounded-xl`}
                          style={{
                            width: `${data?.topics?.strongest[2]?.correct_percentage}%`,
                          }}
                        ></span>
                      </span>
                      {data?.topics?.strongest[2].correct_percentage}%{"  "}
                      <span className="text-gray-400 ml-1">Correct</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* end topics */}

            {/* leaderboard */}
            <div className="relative grid grid-cols-2 gap-4 text-gray-800 xl:h-[248px] xl:top-[88px]">
              {/* user leaderboard */}
              <div className="relative bg-slate-50 p-4 rounded-2xl">
                <div>
                  <h1 className="font-semibold text-gray-600">
                    User Leaderboard
                  </h1>
                </div>
                {/* 1st user */}
                <div className="relative flex items-center gap-4 xl:top-4 w-full">
                  <div className="xl:w-[5%]">
                    <Image
                      src={thomas}
                      alt={data?.user_leaderboard?.[0].name || "user image"}
                    />
                  </div>
                  <div className="xl:w-[90%]">
                    <div>
                      <p className="font-semibold">
                        {data?.user_leaderboard?.[0].name}
                      </p>
                    </div>
                    <div className="relative flex text-xs gap-4">
                      <p>{data?.user_leaderboard?.[0].points} Points</p>
                      <p>-</p>
                      <p>
                        {data?.user_leaderboard?.[0].accuracy_percentage}%
                        Correct
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-1 items-center">
                    <p className="font-semibold">1</p>
                    <Image
                      src={leaderboard_arrow_up}
                      alt="leaderboard_arrow_up"
                      className="w-[20px] h-[16px]"
                    />
                  </div>
                </div>
                {/* 1st user */}

                {/* 2nd user */}
                <div className="relative flex items-center gap-4 xl:top-6 w-full">
                  <div className="xl:w-[5%]">
                    <Image
                      src={thisal}
                      alt={data?.user_leaderboard?.[1].name || "user image"}
                    />
                  </div>
                  <div className="xl:w-[90%]">
                    <div>
                      <p className="font-semibold">
                        {data?.user_leaderboard?.[1].name}
                      </p>
                    </div>
                    <div className="relative flex text-xs gap-4">
                      <p>{data?.user_leaderboard?.[1].points} Points</p>
                      <p>-</p>
                      <p>
                        {data?.user_leaderboard?.[1].accuracy_percentage}%
                        Correct
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-1 items-center">
                    <p className="font-semibold">2</p>
                    <Image
                      src={leaderboard_arrow_down}
                      alt="leaderboard_arrow_down"
                      className="w-[20px] h-[16px]"
                    />
                  </div>
                </div>
                {/* 2nd user */}

                {/* 3rd user */}
                <div className="relative flex items-center gap-4 xl:top-8 w-full">
                  <div className="xl:w-[5%]">
                    <Image
                      src={helen}
                      alt={data?.user_leaderboard?.[2].name || "user image"}
                    />
                  </div>
                  <div className="xl:w-[90%]">
                    <div>
                      <p className="font-semibold">
                        {data?.user_leaderboard?.[2].name}
                      </p>
                    </div>
                    <div className="relative flex text-xs gap-4">
                      <p>{data?.user_leaderboard?.[2].points} Points</p>
                      <p>-</p>
                      <p>
                        {data?.user_leaderboard?.[2].accuracy_percentage}%
                        Correct
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-1 items-center">
                    <p className="font-semibold">3</p>
                    <Image
                      src={leaderboard_arrow_up}
                      alt="leaderboard_arrow_up"
                      className="w-[20px] h-[16px]"
                    />
                  </div>
                </div>
                {/* 3rd user */}

                {/* 4th user */}
                <div className="relative flex items-center gap-4 xl:top-10 w-full">
                  <div className="xl:w-[5%]">
                    <Image
                      src={lura}
                      alt={data?.user_leaderboard?.[3].name || "user image"}
                    />
                  </div>
                  <div className="xl:w-[90%]">
                    <div>
                      <p className="font-semibold">
                        {data?.user_leaderboard?.[3].name}
                      </p>
                    </div>
                    <div className="relative flex text-xs gap-4">
                      <p>{data?.user_leaderboard?.[3].points} Points</p>
                      <p>-</p>
                      <p>
                        {data?.user_leaderboard?.[3].accuracy_percentage}%
                        Correct
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-1 items-center">
                    <p className="font-semibold">4</p>
                    <Image
                      src={leaderboard_arrow_up}
                      alt="leaderboard_arrow_up"
                      className="w-[20px] h-[16px]"
                    />
                  </div>
                </div>
                {/* 4th user */}
              </div>
              {/* end user leaderboard */}

              {/* groups leaderboard */}
              <div className="relative bg-slate-50 p-4 rounded-2xl">
                <div>
                  <h1 className="font-semibold text-gray-600">
                    Groups Leaderboard
                  </h1>
                </div>
                {/* 1st user */}
                <div className="relative flex items-center gap-4 xl:top-4 w-full">
                  <div className="xl:w-[95%]">
                    <div>
                      <p className="font-semibold">
                        {data?.groups_leaderboard?.[0].group_name}
                      </p>
                    </div>
                    <div className="relative flex text-xs gap-4">
                      <p>
                        {data?.groups_leaderboard?.[0].points_per_user} Points /
                        User
                      </p>
                      <p>-</p>
                      <p>
                        {data?.groups_leaderboard?.[0].accuracy_percentage}%
                        Correct
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-1 items-center">
                    <p className="font-semibold">1</p>
                    <Image
                      src={leaderboard_arrow_up}
                      alt="leaderboard_arrow_up"
                      className="w-[20px] h-[16px]"
                    />
                  </div>
                </div>
                {/* 1st user */}

                {/* 2nd user */}
                <div className="relative flex items-center gap-4 xl:top-6 w-full">
                  <div className="xl:w-[95%]">
                    <div>
                      <p className="font-semibold">
                        {data?.groups_leaderboard?.[1].group_name}
                      </p>
                    </div>
                    <div className="relative flex text-xs gap-4">
                      <p>
                        {data?.groups_leaderboard?.[1].points_per_user} Points /
                        User
                      </p>
                      <p>-</p>
                      <p>
                        {data?.groups_leaderboard?.[1].accuracy_percentage}%
                        Correct
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-1 items-center">
                    <p className="font-semibold">2</p>
                    <Image
                      src={leaderboard_arrow_down}
                      alt="leaderboard_arrow_down"
                      className="w-[20px] h-[16px]"
                    />
                  </div>
                </div>
                {/* 2nd user */}

                {/* 3rd user */}
                <div className="relative flex items-center gap-4 xl:top-8 w-full">
                  <div className="xl:w-[95%]">
                    <div>
                      <p className="font-semibold">
                        {data?.groups_leaderboard?.[2].group_name}
                      </p>
                    </div>
                    <div className="relative flex text-xs gap-4">
                      <p>
                        {data?.groups_leaderboard?.[2].points_per_user} Points /
                        User
                      </p>
                      <p>-</p>
                      <p>
                        {data?.groups_leaderboard?.[2].accuracy_percentage}%
                        Correct
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-1 items-center">
                    <p className="font-semibold">3</p>
                    <Image
                      src={leaderboard_arrow_up}
                      alt="leaderboard_arrow_up"
                      className="w-[20px] h-[16px]"
                    />
                  </div>
                </div>
                {/* 3rd user */}

                {/* 4th user */}
                <div className="relative flex items-center gap-4 xl:top-10 w-full">
                  <div className="xl:w-[95%]">
                    <div>
                      <p className="font-semibold">
                        {data?.groups_leaderboard?.[3].group_name}
                      </p>
                    </div>
                    <div className="relative flex text-xs gap-4">
                      <p>
                        {data?.groups_leaderboard?.[3].points_per_user} Points /
                        User
                      </p>
                      <p>-</p>
                      <p>
                        {data?.groups_leaderboard?.[3].accuracy_percentage}%
                        Correct
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-1 items-center">
                    <p className="font-semibold">4</p>
                    <Image
                      src={leaderboard_arrow_up}
                      alt="leaderboard_arrow_up"
                      className="w-[20px] h-[16px]"
                    />
                  </div>
                </div>
                {/* 4th user */}
              </div>
              {/* end groups leaderboard */}
            </div>
            {/* end leaderboard */}
          </div>
        );
      case "Library":
        return <div className="p-4">Library section for future work</div>;
      case "People":
        return <div className="p-4">People section.</div>;
      case "Activities":
        return <div className="p-4">Activities section.</div>;
    }
  };

  if (error) {
    toast.error((error as any).message || "An unexpected error occurred.");
  }

  return (
    // dashboard page
    <div className="relative flex text-gray-600 bg-gray-200">
      {/* side bar */}
      <div className="relative flex flex-col bg-slate-50 rounded-r-3xl xl:w-[250px] xl:min-h-screen">
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
