"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [placement, setPlacement] = useState();

  const fetchPlacement = async () => {
    try {
      const response = await fetch(
        "https://bmexports.elitecoderstestlink.com/api/add-car-placement",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            placement: placement,
          }),
        },
      );
      if (response.ok) {
        toast.success("new placement has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Placement"
          inputHeading="Placement"
          onChangeInput={(e) => setPlacement(e.target.value)}
          onButtonClick={() => fetchPlacement()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
