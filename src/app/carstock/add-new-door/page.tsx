"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [door, setDoor] = useState();

  const fetchDoor = async () => {
    try {
      const response = await fetch(
        "https://bmexports.elitecoderstestlink.com/api/add-car-door",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            door: door,
          }),
        },
      );
      if (response.ok) {
        toast.success("new door has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car Door"
          inputHeading="Car Door"
          onChangeInput={(e) => setDoor(e.target.value)}
          onButtonClick={() => fetchDoor()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
