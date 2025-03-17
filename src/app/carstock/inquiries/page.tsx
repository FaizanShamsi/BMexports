"use client";

import AddDataTable from "@/components/AddDataTable/AddDataTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Updateinquiriesmodal from "@/components/modal/update-inquirie-modal";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ViewInquiry() {
  const [inquiries, setInquiries] = useState([]);

  const headers = [
    { label: "fullName", className: "px-6 py-3 " },
    { label: "email", className: "px-6 py-3 " },
    { label: "phone", className: "px-6 py-3 " },
    { label: "country", className: "px-6 py-3 " },
    { label: "comments", className: "px-6 py-3 " },
    { label: "isReserved", className: "px-6 py-3 " },

    { label: "Actions", className: "px-6 py-3 " },
  ];

  const fetchInquiries = async () => {
    try {
      const response = await fetch(
        "https://backend.bmglobalexports.com/api/all-inquiries",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch inquiries");
      }
      const data = await response.json();
      setInquiries(data);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const onFinish = async (formData: any) => {
    try {
      console.log(formData);
      const response = await fetch(
        `https://backend.bmglobalexports.com/api/update-inquiry/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: { ...formData },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch inquiries");
      }
      const data = await response.json();
      console.log(data);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <>
      <DefaultLayout>
        {!inquiries ? (
          <>No Inquiries Found</>
        ) : (
          <>
            <AddDataTable
              heading="Product List"
              headers={headers}
              products={inquiries}
              renderActions={(inquiry) => (
                <>
                  <Updateinquiriesmodal
                    onFinish={(data) => onFinish({ ...data, id: inquiry.id })}
                  />
                </>
              )}
            />
          </>
        )}
      </DefaultLayout>
    </>
  );
}
