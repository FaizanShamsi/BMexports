"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [fuelType, setFuelType] = useState();

  const fetchFuelType = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/add-car-ft",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fuel_type: fuelType,
          }),
        },
      );
      if (response.ok) {
        toast.success("new fuel type has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car Fuel Type"
          inputHeading="Car Fuel Type"
          onChangeInput={(e) => setFuelType(e.target.value)}
          onButtonClick={() => fetchFuelType()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
