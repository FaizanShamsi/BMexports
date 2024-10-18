"use client";

import AddDataTable from "@/components/AddDataTable/AddDataTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import CustomModal from "@/components/modal/modal";
import { useDisclosure } from "@nextui-org/react";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError]: any = useState(null);
  const [month, setMonth] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editId, setEditId]: any = useState();
  // const products = [
  //   { id: 1, month: "january" },
  //   { id: 2, month: "june" },
  //   { id: 3, month: "march" },
  //   { id: 4, month: "july" },
  // ];

  const fetchMonths = async () => {
    try {
      const response = await fetch(
        "https://bmexports.elitecoderstestlink.com/api/all-months",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err: any) {
      console.log(err, "err");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const headers = [
    { label: "ID", className: "px-6 py-3" },
    { label: "month_slug", className: "px-6 py-6" },
    { label: "Actions", className: "px-6 py-3 " },
  ];

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://bmexports.elitecoderstestlink.com/api/update-month/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Month: month,
          }),
        },
      );
      if (response.ok) {
        toast.success("month has been edit");
        fetchMonths();
        onOpenChange();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleDelete = async (id: any) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `https://bmexports.elitecoderstestlink.com/api/delete-month/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Optimistically remove the product from the UI
      setProducts((prevProducts: any) =>
        prevProducts.filter((product: any) => product.id !== id),
      );

      console.log("Deleted product with ID:", id);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete the product. Please try again.");
    }
  };

  useEffect(() => {
    fetchMonths();
  }, []);

  return (
    <DefaultLayout>
      <AddDataTable
        heading="Product List"
        headers={headers}
        products={products}
        renderActions={(product) => (
          <>
            <button
              onClick={() => {
                setMonth(product.month_slug);
                setEditId(product.id);
                onOpen();
              }}
              className="mr-2 rounded font-bold"
            >
              <Edit />
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="rounded px-4 font-bold"
            >
              <Delete />
            </button>
          </>
        )}
      />
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <AddDataContent
          value={month}
          inputPlaceholder="Enter Car month"
          inputHeading="Car Month"
          onChangeInput={(e) => setMonth(e.target.value)}
          onButtonClick={() => handleEdit()}
        />
      </CustomModal>
      <ToastContainer position="top-right" />
    </DefaultLayout>
  );
}
