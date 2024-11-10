"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [color, setColor] = useState();

  const fetchColor = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/add-car-color",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            color: color,
          }),
        },
      );
      if (response.ok) {
        toast.success("new color has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car Color"
          inputHeading="Car Color"
          onChangeInput={(e) => setColor(e.target.value)}
          onButtonClick={() => fetchColor()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
