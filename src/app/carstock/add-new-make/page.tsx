"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Dispatch, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
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

  const fetchMakes = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/add-car-make",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Make: heading,
            featured_image: image,
          }),
        },
      );
      if (response.ok) {
        toast.success("new make has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <AddDataContent
        inputHeading="Car Make"
        inputPlaceholder="Enter Car Make"
        onChangeInput={(e) => setHeading(e.target.value)}
        onChangeImage={(e) => imageToBase64(e.target.files[0])}
        onButtonClick={() => fetchMakes()}
        imageHeading="Feature Image"
      />
      <ToastContainer position="top-right" />
    </DefaultLayout>
  );
};

export default Page;
