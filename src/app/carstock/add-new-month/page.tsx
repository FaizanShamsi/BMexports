"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [month, setMonth] = useState();

  const fetchYear = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/add-car-month",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Month: month,
          }),
        },
      );
      if (response.ok) {
        toast.success("new month has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car month"
          inputHeading="Car Month"
          onChangeInput={(e) => setMonth(e.target.value)}
          onButtonClick={() => fetchYear()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
