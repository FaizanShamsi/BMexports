"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [transmission, setTransmission] = useState();

  const fetchTransmission = async () => {
    try {
      const response = await fetch(
        "https://bmexports.elitecoderstestlink.com/api/add-car-transmission",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transmission: transmission,
          }),
        },
      );
      if (response.ok) {
        toast.success("new transmision has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car Transmission"
          inputHeading="Car Transmission"
          onChangeInput={(e) => setTransmission(e.target.value)}
          onButtonClick={() => fetchTransmission()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
