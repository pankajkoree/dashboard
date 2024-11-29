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
      <button onClick={gotToDashboard}>Dashboard</button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
