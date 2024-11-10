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
  const [machinery, setMachinery] = useState();
  const [image, setImage] = useState<any>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editId, setEditId]: any = useState();

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
        "https://bmexportsbackend.creatixtech.com/api/all-machinery-types",
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

  const imageUrl =
    "https://www.liebherr.com/shared/media/mobile-and-crawler-cranes/images/mobile-cranes/ltf-truck-mounted-telescopic-crane/liebherr-ltf1045-4-1-man-960x650.jpg";

  // const products = [
  //   { id: 1, 'machinery-type': "Gasoline/Petrol", 'machinery-icon': imageUrl },
  //   { id: 2, 'machinery-type': "Diesel", 'machinery-icon': imageUrl },
  //   { id: 3, 'machinery-type': "Hybrid", 'machinery-icon': imageUrl },
  //   { id: 4, 'machinery-type': "Electric", 'machinery-icon': imageUrl },
  // ];

  const headers = [
    { label: "ID", className: "px-6 py-3" },
    { label: "Machinery_type", className: "px-6 py-6" },
    { label: "Featured_image", className: "px-6 py-3" },
    { label: "Actions", className: "px-6 py-3 " },
  ];

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://bmexportsbackend.creatixtech.com/api/update-machinery-type/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            machinery_type: machinery,
            featured_image: image,
          }),
        },
      );
      if (response.ok) {
        toast.success("machinery has been edit");
        fetchMachinery();
        // onOpenChange();
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
        `https://bmexportsbackend.creatixtech.com/api/delete-machinery-type/${id}`,
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
    fetchMachinery();
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
                setMachinery(product.machinery_type);
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
          value={machinery}
          inputHeading="Car Machinery"
          inputPlaceholder="Enter machinery name"
          onChangeInput={(e) => setMachinery(e.target.value)}
          onChangeImage={(e) => imageToBase64(e.target.files[0])}
          onButtonClick={() => handleEdit()}
          imageHeading="Feature Image"
        />
      </CustomModal>
      <ToastContainer position="top-right" />
    </DefaultLayout>
  );
}
