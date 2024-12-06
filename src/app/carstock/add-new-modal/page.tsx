"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [heading, setHeading] = useState();
  const [image, setImage] = useState<any>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

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

  const fetchModel = async () => {
    try {
      const response = await fetch(
        "https://backend.bmglobalexports.com/api/add-car-model",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            car_model: heading,
            featured_image: image,
            car_make: selectedOption,
          }),
        },
      );
      if (response.ok) {
        toast.success("new modal has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <AddDataContent
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        inputHeading="Car Machinery"
        onChangeInput={(e) => setHeading(e.target.value)}
        onChangeImage={(e) => imageToBase64(e.target.files[0])}
        inputPlaceholder="Enter machinery name"
        onButtonClick={() => fetchModel()}
        dropdownHeading="Select Car Make"
        imageHeading="Feature Image"
      />
      <ToastContainer position="top-right" />
    </DefaultLayout>
  );
}
