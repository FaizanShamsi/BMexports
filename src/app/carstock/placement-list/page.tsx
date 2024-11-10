"use client";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddDataTable from "@/components/AddDataTable/AddDataTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomModal from "@/components/modal/modal";
import { useDisclosure } from "@nextui-org/react";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placement, setPlacement] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editId, setEditId]: any = useState();

  const fetchPlacements = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-placements",
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
    { label: "Placement", className: "px-6 py-6" },
    { label: "Actions", className: "px-6 py-3 " },
  ];

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://bmexportsbackend.creatixtech.com/api/update-placement/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            placement: placement,
          }),
        },
      );
      if (response.ok) {
        toast.success("placement has been edit");
        fetchPlacements();
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
        `https://bmexportsbackend.creatixtech.com/api/delete-placement/${id}`,
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
    fetchPlacements();
  }, []);

  if (loading) {
    return <DefaultLayout>Loading...</DefaultLayout>;
  }

  if (error) {
    return <DefaultLayout>Error: {error}</DefaultLayout>;
  }

  return (
    <DefaultLayout>
      <div>
        <AddDataTable
          heading="Product List"
          headers={headers}
          products={products}
          renderActions={(product) => (
            <>
              <button
                onClick={() => {
                  setPlacement(product.placement);
                  setEditId(product.id);
                  onOpen();
                }}
                className="mr-2 rounded font-bold"
              >
                <EditIcon />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="rounded px-4 font-bold"
              >
                <DeleteIcon />
              </button>
            </>
          )}
        />
        <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
          <AddDataContent
            value={placement}
            inputPlaceholder="Enter Placement"
            inputHeading="Placement"
            onChangeInput={(e) => setPlacement(e.target.value)}
            onButtonClick={() => handleEdit()}
          />
        </CustomModal>
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
}
