"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Dispatch, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [driveType, setDriveType] = useState();

  const fetchDriveType = async () => {
    try {
      const response = await fetch(
        "https://backend.bmglobalexports.com/api/add-car-dt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            drive_type: driveType,
          }),
        },
      );
      if (response.ok) {
        toast.success("new drive type has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car Drave Type"
          inputHeading="Car Drive Type"
          onChangeInput={(e) => setDriveType(e.target.value)}
          onButtonClick={() => fetchDriveType()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
