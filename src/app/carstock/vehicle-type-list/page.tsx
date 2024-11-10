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
  const imageUrl =
    "https://bmexports.jp/vehicletype/vehicletype-1673362187588.png";
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError]: any = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editId, setEditId]: any = useState();
  const [carType, setCarType] = useState();
  const [image, setImage] = useState<any>("");

  const fetchVehicleType = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-types",
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

  // const products = [
  //   { id: 1, 'type': "Automatic", 'image': imageUrl },
  //   { id: 2, 'type': "Manual", 'image': imageUrl },
  //   { id: 3, 'type': "Automatic", 'image': imageUrl },
  //   { id: 4, 'type': "Manual", 'image': imageUrl },
  // ];

  const headers = [
    { label: "ID", className: "px-6 py-3" },
    { label: "Vehicle_type", className: "px-6 py-6" },
    { label: "Vehicle_image", className: "px-6 py-6" },
    { label: "Actions", className: "px-6 py-3" },
  ];

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://bmexportsbackend.creatixtech.com/api/update-type/${editId}`,
        {
          method: "PUT",
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
        toast.success("car type has been edit");
        fetchVehicleType();
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
        `https://bmexportsbackend.creatixtech.com/api/delete-type/${id}`,
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
    fetchVehicleType();
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
                setCarType(product.vehicle_type);
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
          value={carType}
          inputHeading="Car Type"
          inputPlaceholder="Enter Car Type"
          onChangeInput={(e) => setCarType(e.target.value)}
          onChangeImage={(e) => imageToBase64(e.target.files[0])}
          onButtonClick={() => handleEdit()}
          imageHeading="Feature Image"
        />
      </CustomModal>
      <ToastContainer position="top-right" />
    </DefaultLayout>
  );
}
