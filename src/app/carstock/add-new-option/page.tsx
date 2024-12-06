"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [option, setOption] = useState();

  const fetchOption = async () => {
    try {
      const response = await fetch(
        "https://backend.bmglobalexports.com/api/add-car-option",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            option: option,
          }),
        },
      );
      if (response.ok) {
        toast.success("new option has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car Option"
          inputHeading="Car Option"
          onChangeInput={(e) => setOption(e.target.value)}
          onButtonClick={() => fetchOption()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
