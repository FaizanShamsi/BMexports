"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [mileageRange, setMileageRange] = useState();

  const fetchMileageRange = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/add-car-mr",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mileage_range: mileageRange,
          }),
        },
      );
      if (response.ok) {
        toast.success("new mileage range has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car Mileage Range"
          inputHeading="Car Mileage Range"
          onChangeInput={(e) => setMileageRange(e.target.value)}
          onButtonClick={() => fetchMileageRange()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
