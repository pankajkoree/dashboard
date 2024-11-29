'use client'

import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const gotToDashboard = () => {
    router.push("/dashboard");
  };
  return (
    <div>
     <div className="relative flex justify-center xl:mt-[400px]">
     <button onClick={gotToDashboard} className="relative flex border p-4 xl:text-2xl hover:bg-green-600 rounded-lg">Dashboard</button>
     </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
