"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [steering, setSteering] = useState();

  const fetchSteering = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/add-car-steering",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            steering: steering,
          }),
        },
      );
      if (response.ok) {
        toast.success("new steering has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car Steering"
          inputHeading="Car Steering"
          onChangeInput={(e) => setSteering(e.target.value)}
          onButtonClick={() => fetchSteering()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
