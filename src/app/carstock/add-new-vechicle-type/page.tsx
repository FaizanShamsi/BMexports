"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [carType, setCarType] = useState();
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

  const fetchCarType = async () => {
    try {
      const response = await fetch(
        "https://backend.bmglobalexports.com/api/add-car-type",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicle_type: carType,
            vehicle_image: image,
          }),
        },
      );
      if (response.ok) {
        toast.success("new vehicle type has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <AddDataContent
        inputHeading="Car Type"
        inputPlaceholder="Enter Car Type"
        onChangeInput={(e) => setCarType(e.target.value)}
        onChangeImage={(e) => imageToBase64(e.target.files[0])}
        onButtonClick={() => fetchCarType()}
        imageHeading="Feature Image"
      />
      <ToastContainer position="top-right" />
    </DefaultLayout>
  );
}
