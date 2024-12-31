"use client";

import AddDataTable from "@/components/AddDataTable/AddDataTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
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
    { label: "totalPrice", className: "px-6 py-3 " },
    { label: "invoiceNo", className: "px-6 py-3 " },
    { label: "paymentStatus", className: "px-6 py-3 " },
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
      console.log(data);
      setInquiries(data.data);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <DefaultLayout>
      <AddDataTable
        heading="Product List"
        headers={headers}
        products={inquiries}
      />
    </DefaultLayout>
  );
}
