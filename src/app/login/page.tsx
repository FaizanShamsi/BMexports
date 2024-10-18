"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const [user, setUser] = useState<any>();

  const router = useRouter();

  const inputField = (key: any, value: any) => {
    setUser({ ...user, [key]: value });
  };

  const Submit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://bmexports.elitecoderstestlink.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        },
      );
      const data = await response.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      if (response.ok) {
        toast.success("login successfully");
        router.push("/");
      }
    } catch (err: any) {
      console.log(err.message);
    }

    console.log(user);
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="flex h-96 w-1/3 flex-col items-center py-8 shadow-lg">
          <h1 className="text-4xl font-bold text-black">Log In</h1>
          <form
            onSubmit={Submit}
            className="mt-6 flex w-full flex-col items-center gap-8"
          >
            <input
              placeholder="Enter Email"
              type="email"
              id="email"
              onChange={(e) => inputField(e.target.id, e.target.value)}
              required
              className="text-md h-14 w-4/5 border-b-1 border-black px-4 outline-none"
            />
            <input
              placeholder="Password"
              type="password"
              id="password"
              onChange={(e) => inputField(e.target.id, e.target.value)}
              required
              className="text-md h-14 w-4/5 border-b-1 border-black px-4 outline-none"
            />
            <button type="submit" className="h-12 w-4/5 bg-black text-white">
              Log In
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;
