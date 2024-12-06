"use client";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [priceRange, setPriceRange] = useState();

  const fetchPriceRange = async () => {
    try {
      const response = await fetch(
        "https://backend.bmglobalexports.com/api/add-car-pr",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price_range: priceRange,
          }),
        },
      );
      if (response.ok) {
        toast.success("new price range has been added");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <DefaultLayout>
      <div>
        <AddDataContent
          inputPlaceholder="Enter Car Price Range"
          inputHeading="Car Price Range"
          onChangeInput={(e) => setPriceRange(e.target.value)}
          onButtonClick={() => fetchPriceRange()}
        />
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};

export default Page;
