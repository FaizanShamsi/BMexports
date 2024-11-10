"use client";

import AddDataTable from "@/components/AddDataTable/AddDataTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "@/components/modal/modal";
import { useDisclosure } from "@nextui-org/react";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]: any = useState(null);
  const [make, setMake] = useState();
  const [image, setImage] = useState<any>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editId, setEditId]: any = useState();

  const fetchMakes = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-makes",
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

  const headers = [
    // { label: 'Index', className: 'px-6 py-3' },
    { label: "ID", className: "px-6 py-3" },
    { label: "make_slug", className: "px-6 py-6" },
    { label: "Actions", className: "px-6 py-3 " },
  ];

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://bmexportsbackend.creatixtech.com/api/update-make/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Make: make,
            featured_image: image,
          }),
        },
      );
      if (response.ok) {
        toast.success("make has been edit");
        fetchMakes();
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
        `https://bmexportsbackend.creatixtech.com/api/delete-make/${id}`,
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
    fetchMakes();
  }, []);

  if (loading) {
    return <DefaultLayout>Loading...</DefaultLayout>;
  }

  if (error) {
    return <DefaultLayout>Error: {error}</DefaultLayout>;
  }

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
                setMake(product.make_slug);
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
        //   heading="Product List"
        //   headers={headers}
        // products={products.map((product, index) => ({
        //   // index: index + 1,
        //   id: product.id,
        //   Make: product.Make,

        // }))

        //   }
        //   renderProduct={(product) => (
        //     <tr key={product.id}>
        //       <td className="px-6 py-3">{product.index}</td>
        //       <td className="px-6 py-3">{product.id}</td>
        //       <td className="px-6 py-3">{product.Make}</td>
        //       <td className="px-6 py-3">
        //         <button onClick={() => handleEdit(product.id)} className="font-bold rounded mr-2">
        //         <EditIcon />
        //         </button>
        //         <button onClick={() => handleDelete(product.id)} className="font-bold px-4 rounded">
        //         <DeleteIcon />
        //         </button>
        //       </td>
        //     </tr>
        // )}
      />
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <AddDataContent
          value={make}
          inputHeading="Car Make"
          inputPlaceholder="Enter Car Make"
          onChangeInput={(e) => setMake(e.target.value)}
          onChangeImage={(e) => imageToBase64(e.target.files[0])}
          onButtonClick={() => handleEdit()}
          imageHeading="Feature Image"
        />
      </CustomModal>
      <ToastContainer position="top-right" />
    </DefaultLayout>
  );
}
