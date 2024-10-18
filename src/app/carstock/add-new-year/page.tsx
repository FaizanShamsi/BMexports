"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [year, setYear] = useState();

  const fetchYear = async () => {
    try {
      const response = await fetch(
        "https://bmexports.elitecoderstestlink.com/api/add-car-year",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Year: year,
          }),
        },
      );
      if (response.ok) {
        toast.success("new year has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <AddDataContent
        inputPlaceholder="Enter Car Year"
        inputHeading="Car Year"
        onChangeInput={(e) => setYear(e.target.value)}
        onButtonClick={() => fetchYear()}
      />
      <ToastContainer position="top-right" />
    </DefaultLayout>
  );
};

export default Page;
