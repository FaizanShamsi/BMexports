"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Dispatch, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export default function Page() {
  const [heading, setHeading] = useState();
  const [image, setImage] = useState<any>("");

  const imageToBase64 = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const fetchMachinery = async () => {
    try {
      const response = await fetch(
        "https://backend.bmglobalexports.com/api/add-machinery-type",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            machinery_type: heading,
            featured_image: image,
          }),
        },
      );
      if (response.ok) {
        toast.success("new machinery has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <AddDataContent
        inputHeading="Car Machinery"
        inputPlaceholder="Enter machinery name"
        onChangeInput={(e) => setHeading(e.target.value)}
        onChangeImage={(e) => imageToBase64(e.target.files[0])}
        onButtonClick={() => fetchMachinery()}
        imageHeading="Feature Image"
      />
      <ToastContainer position="top-right" />
    </DefaultLayout>
  );
}
