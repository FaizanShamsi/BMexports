"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [bodyType, setBodyType] = useState();

  const fetchBodyType = async () => {
    try {
      const response = await fetch(
        "https://bmexports.elitecoderstestlink.com/api/add-car-bt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body_type: bodyType,
          }),
        },
      );
      if (response.ok) {
        toast.success("new body type has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car Body Type"
          inputHeading="Car Body Type"
          onChangeInput={(e) => setBodyType(e.target.value)}
          onButtonClick={() => fetchBodyType()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
