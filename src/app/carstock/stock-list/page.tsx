"use client";

import AddDataTable from "@/components/AddDataTable/AddDataTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useRef, useState } from "react";
import { Delete, Edit, ReceiptLong } from "@mui/icons-material";
import CustomModal from "@/components/modal/modal";
import { useDisclosure } from "@nextui-org/react";
import AddDataContent from "@/components/AddDataContent/AddDataContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
// import JoditEditor from "jodit-react";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import dynamic from "next/dynamic";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editId, setEditId]: any = useState();
  const [isChecked, setIsChecked] = useState(false);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<any>("");
  const [imagegallery, setImageGallery] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any>({});
  const [title, setTitle] = useState<any>("");
  const [price, setPrice] = useState<any>("");
  const [chassis, setChassis] = useState<any>("");
  const [engine, setEngine] = useState<any>("");
  const [mileage, setMileage] = useState<any>("");
  const [seating, setSeating] = useState<any>("");
  const [capacity, setCapacity] = useState<any>("");
  const [placements, setPlacement] = useState<any>([]);
  const [machineries, setMachinery] = useState<any>([]);
  const [priceRanges, setPriceRanges] = useState<any>([]);
  const [makes, setMakes] = useState<any>([]);
  const [models, setModels] = useState<any>([]);
  const [vehicleTypes, setVehicleTypes] = useState<any>([]);
  const [months, setMonths] = useState<any>([]);
  const [years, setYears] = useState<any>([]);
  const [driverTypes, setDriverTypes] = useState<any>([]);
  const [fuelType, setFuelTypes] = useState<any>([]);
  const [transmission, setTransmissions] = useState<any>([]);
  const [colors, setColors] = useState<any>([]);
  const [mileageRange, setMileageRange] = useState<any>([]);
  const [bodyTypes, setBodyType] = useState<any>([]);
  const [doors, setDoors] = useState<any>([]);
  const [steering, setSteering] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);

  const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

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

  const imageGalleryToBase64 = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImageGallery((prev: any) => [...prev, { src: reader.result }]);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-stock",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      console.log(data);
      setProducts(data.data); // Assuming the API returns an array of products
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const headers = [
    { label: "Ref", className: "px-6 py-3 " },
    { label: "Placement", className: "px-6 py-3 " },
    { label: "Car_title", className: "px-6 py-3 " },
    { label: "Car_price", className: "px-6 py-3 " },
    { label: "Year", className: "px-6 py-3 " },
    { label: "Make", className: "px-6 py-3 " },
    { label: "car_model", className: "px-6 py-3 " },
    { label: "Actions", className: "px-6 py-3 " },
  ];

  const handleEdit = async () => {
    const checked_options = options.filter((x: any) => x.checked);
    const stockData = {
      ...selectedOption,
      featured_image: image,
      image_gallery: imagegallery,
      ref_no: "",
      grade: "",
      condition: "",
      options: checked_options.map((x: any) => x.value),
      stock_description: content,
    };

    console.log(stockData);

    try {
      const response = await fetch(
        `https://bmexportsbackend.creatixtech.com/api/update-stock/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(stockData),
        },
      );
      if (response.ok) {
        toast.success("new stock been added");
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
        `https://bmexportsbackend.creatixtech.com/api/delete-stock/${id}`,
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.placement, value: item.id });
      });
      setPlacement(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.machinery_type, value: item.id });
      });
      setMachinery(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchPriceRagnges = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-prs",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.price_range, value: item.id });
      });
      setPriceRanges(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.Make, value: item.id });
      });
      setMakes(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchModels = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-models",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.car_model, value: item.id });
      });
      setModels(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchVehicleTypes = async () => {
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.vehicle_type, value: item.id });
      });
      setVehicleTypes(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchMonths = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-months",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.Month, value: item.id });
      });
      setMonths(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchYears = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-years",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.Year, value: item.id });
      });
      setYears(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchDriverTypes = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-dts",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.drive_type, value: item.id });
      });
      setDriverTypes(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchFuelTypes = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-fts",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.fuel_type, value: item.id });
      });
      setFuelTypes(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchTrasmissions = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-transmissions",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.transmission, value: item.id });
      });
      setTransmissions(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchColors = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-colors",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.color, value: item.id });
      });
      setColors(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchMileage = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-mrs",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.mileage_range, value: item.id });
      });
      setMileageRange(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchBodyType = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-bts",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.body_type, value: item.id });
      });
      setBodyType(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchDoors = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-doors",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.door, value: item.id });
      });
      setDoors(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchSteering = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-steerings",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({ label: item.steering, value: item.id });
      });
      setSteering(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/all-options",
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
      const processedData: any = [];
      data.map((item: any) => {
        processedData.push({
          name: item.option,
          label: item.option,
          value: item.id,
          checked: isChecked,
        });
      });
      setOptions(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const checkOption = (id: any) => {
    var duplicate_options = [...options];
    duplicate_options.find((x) => x.value === id).checked =
      !duplicate_options.find((x) => x.value === id).checked;
    setOptions(duplicate_options);
  };

  useEffect(() => {
    fetchPlacements();
    fetchMachinery();
    fetchPriceRagnges();
    fetchMakes();
    fetchModels();
    fetchVehicleTypes();
    fetchMonths();
    fetchYears();
    fetchDriverTypes();
    fetchFuelTypes();
    fetchTrasmissions();
    fetchColors();
    fetchMileage();
    fetchBodyType();
    fetchDoors();
    fetchSteering();
    fetchOptions();
    fetchProducts();
  }, []);

  if (loading) {
    return <DefaultLayout>Loading...</DefaultLayout>;
  }

  if (error) {
    return <DefaultLayout>Error: {error}</DefaultLayout>;
  }

  const checkboxes = [
    {
      name: "Sun Roof",
      label: "Sun Roof",
      checked: isChecked,
      onChange: (checked: boolean | ((prevState: boolean) => boolean)) =>
        setIsChecked(checked),
    },
    {
      name: "Weather Seat",
      label: "Weather Seat",
      checked: isChecked,
      onChange: (checked: boolean | ((prevState: boolean) => boolean)) =>
        setIsChecked(checked),
    },
  ];

  return (
    <DefaultLayout>
      <AddDataTable
        heading="Product List"
        headers={headers}
        products={products}
        renderActions={(product) => (
          <>
            <button className="rounded p-1 font-bold">
              <ReceiptLong />
            </button>
            <button
              onClick={() => {
                setTitle(product.car_title);
                setPrice(product.car_price);
                setChassis(product.chassis_no);
                setEngine(product.engine);
                setEditId(product.id);
                console.log(product, "hoooooooooooooooo");
                setMileage(product.mileage);
                setSeating(product.seating);
                setCapacity(product.loading_capacity);
                setSelectedOption({
                  car_title: product.car_title,
                  machinery_type: machineries.find(
                    (x: any) => x.label == product.machinery_type,
                  )?.value,
                  price_range: priceRanges.find(
                    (x: any) => x.label == product.price_range,
                  )?.value,
                  car_price: product.car_price,
                  ref_no: product.ref_no,
                  make: makes.find((x: any) => x.label == product.make)?.value,
                  car_model: models.find(
                    (x: any) => x.label == product.car_model,
                  )?.value,
                  vehicle_type: vehicleTypes.find(
                    (x: any) => x.label == product.vehicle_type,
                  )?.value,
                  month: months.find((x: any) => x.label == product.month)
                    ?.value,
                  year: years.find((x: any) => x.label == product.year)?.value,
                  chassis_no: product.chassis_no,
                  drive_type: driverTypes.find(
                    (x: any) => x.label == product.drive_type,
                  )?.value,
                  fuel_type: fuelType.find(
                    (x: any) => x.label == product.fuel_type,
                  )?.value,
                  transmission: transmission.find(
                    (x: any) => x.label == product.transmission,
                  )?.value,
                  color: colors.find((x: any) => x.label == product.color)
                    ?.value,
                  engine: product.engine,
                  mileage_range: mileageRange.find(
                    (x: any) => x.label == product.mileage_range,
                  )?.value,
                  mileage: product.mileage,
                  body_type: bodyTypes.find(
                    (x: any) => x.label == product.body_type,
                  )?.value,
                  door: doors.find((x: any) => x.label == product.door)?.value,
                  steering: steering.find(
                    (x: any) => x.label == product.steering,
                  )?.value,
                  seating: product.seating,
                  grade: "",
                  condition: "",
                  placement: placements.find(
                    (x: any) => x.label == product.placement,
                  )?.value,
                  loading_capacity: product.loading_capacity,
                  sold: Number(product.sold),
                  reserved: Number(product.reserved),
                });
                const product_images = product.image_gallery
                  ?.split(",")
                  .map((x: any) => ({ src: x }));
                setImageGallery(() => [...product_images]);
                console.log(product_images, "product_images");
                console.log(imagegallery, "imagegallery");
                setImage(product.featured_image);
                setContent(product.content);
                const duplicate_options = [...options];
                duplicate_options.forEach((option) => {
                  const exists = product.options.find(
                    (x: any) => x === option.name,
                  );
                  if (exists) {
                    option.checked = true;
                  }
                });
                setOptions(duplicate_options);
                console.log(duplicate_options, "duplicate_options");
                onOpen();
              }}
              className="rounded p-1 font-bold"
            >
              <Edit />
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="rounded p-1 font-bold"
            >
              <Delete />
            </button>
          </>
        )}
      />
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        style={{ height: "100%", overflow: "auto" }}
      >
        <div className="sm:p-2 md:p-4">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:w-full md:w-203">
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectGroupTwo
                selectedOption={selectedOption.placement}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, placement: Number(e) })
                }
                heading="Car Placement"
                options={placements}
              />
              {/* <SelectGroupTwo
              selectedOption={selectedOption.car}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, car: Number(e) })
              }
              heading="Select a Car"
              options={[
                { value: "tesla", label: "Tesla" },
                { value: "mazda", label: "Mazda" },
                { value: "honda", label: "Honda" },
              ]}
            /> */}
              <SelectGroupTwo
                selectedOption={selectedOption.sold}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, sold: Number(e) })
                }
                heading="Sold"
                options={[
                  { value: "1", label: "Yes" },
                  { value: "0", label: "No" },
                ]}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.reserved}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, reserved: Number(e) })
                }
                heading="Reserved"
                options={[
                  { value: "1", label: "Yes" },
                  { value: "0", label: "No" },
                ]}
              />
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Car Title
                </label>
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setSelectedOption({
                      ...selectedOption,
                      car_title: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter the car title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={selectedOption.car_title}
                />
              </div>
              <SelectGroupTwo
                selectedOption={selectedOption.machinery_type}
                setSelectedOption={(e) =>
                  setSelectedOption({
                    ...selectedOption,
                    machinery_type: Number(e),
                  })
                }
                heading="Machinery Type "
                spanText="Add Machinery Type"
                options={machineries}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.price_range}
                setSelectedOption={(e) =>
                  setSelectedOption({
                    ...selectedOption,
                    price_range: Number(e),
                  })
                }
                heading="Car Price Range "
                spanText="Add Car Price Range"
                options={priceRanges}
              />
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Car Price
                </label>
                <input
                  onChange={(e) => {
                    setPrice(Number(e.target.value));
                    setSelectedOption({
                      ...selectedOption,
                      car_price: Number(e.target.value),
                    });
                  }}
                  type="number"
                  placeholder="Enter Car Price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={selectedOption.car_price}
                />
              </div>
              <SelectGroupTwo
                selectedOption={selectedOption.make}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, make: Number(e) })
                }
                heading="Car Make "
                spanText="Add Car Make"
                options={makes}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.car_model}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, car_model: Number(e) })
                }
                heading="Car Model "
                spanText="Add Car Model"
                options={models}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.vehicle_type}
                setSelectedOption={(e) =>
                  setSelectedOption({
                    ...selectedOption,
                    vehicle_type: Number(e),
                  })
                }
                heading="Vehicle Type "
                spanText="Add Vehicle Type"
                options={vehicleTypes}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.month}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, month: Number(e) })
                }
                heading="Month "
                spanText="Add Month"
                options={months}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.year}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, year: Number(e) })
                }
                heading="Year "
                spanText="Add Year"
                options={years}
              />
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Chassis No
                </label>
                <input
                  onChange={(e) => {
                    setChassis(e.target.value);
                    setSelectedOption({
                      ...selectedOption,
                      chassis_no: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter the chassis number #"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={selectedOption.chassis_no}
                />
              </div>
              <SelectGroupTwo
                selectedOption={selectedOption.drive_type}
                setSelectedOption={(e) =>
                  setSelectedOption({
                    ...selectedOption,
                    drive_type: Number(e),
                  })
                }
                heading="Drive Type "
                spanText="Add Drive Type"
                options={driverTypes}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.fuel_type}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, fuel_type: Number(e) })
                }
                heading="Fuel Type "
                spanText="Add Fuel Type"
                options={fuelType}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.transmission}
                setSelectedOption={(e) =>
                  setSelectedOption({
                    ...selectedOption,
                    transmission: Number(e),
                  })
                }
                heading="Transmission "
                spanText="Add Transmission"
                options={transmission}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.color}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, color: Number(e) })
                }
                heading="Color "
                spanText="Add Color"
                options={colors}
              />
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Engine CC
                </label>
                <input
                  onChange={(e) => {
                    setEngine(e.target.value);
                    setSelectedOption({
                      ...selectedOption,
                      engine: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter Engine #"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={selectedOption.engine}
                />
              </div>
              <SelectGroupTwo
                selectedOption={selectedOption.mileage_range}
                setSelectedOption={(e) =>
                  setSelectedOption({
                    ...selectedOption,
                    mileage_range: Number(e),
                  })
                }
                heading="Mileage Range "
                spanText="Add Mileage Range"
                options={mileageRange}
              />
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mileage
                </label>
                <input
                  onChange={(e) => {
                    setMileage(Number(e.target.value));
                    setSelectedOption({
                      ...selectedOption,
                      mileage: Number(e.target.value),
                    });
                  }}
                  type="number"
                  placeholder="Enter Mileage "
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={selectedOption.mileage}
                />
              </div>
              <SelectGroupTwo
                selectedOption={selectedOption.body_type}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, body_type: Number(e) })
                }
                heading="Body Type "
                spanText="Add Body Type"
                options={bodyTypes}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.door}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, door: Number(e) })
                }
                heading="Doors "
                spanText="Add Doors"
                options={doors}
              />
              <SelectGroupTwo
                selectedOption={selectedOption.steering}
                setSelectedOption={(e) =>
                  setSelectedOption({ ...selectedOption, steering: Number(e) })
                }
                heading="Steering"
                spanText="Add Steering"
                options={steering}
              />
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Seating
                </label>
                <input
                  onChange={(e) => {
                    setSeating(e.target.value);
                    setSelectedOption({
                      ...selectedOption,
                      seating: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter Seating "
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={selectedOption.seating}
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Loading Capacity
                </label>
                <input
                  onChange={(e) => {
                    setCapacity(e.target.value);
                    setSelectedOption({
                      ...selectedOption,
                      loading_capacity: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Enter Loading Capacity "
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={selectedOption.loading_capacity}
                />
              </div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Option <span className="text-[#008cff]">Add Option</span>
              </label>
              {options.map((checkbox: any, index: any) => (
                <CheckboxTwo
                  key={index}
                  name={checkbox.name}
                  label={checkbox.label}
                  checked={checkbox.checked}
                  onChange={() => checkOption(checkbox.value)}
                />
              ))}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Stock Description
                </label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Feature Image
                </label>
                <input
                  onChange={(e: any) => imageToBase64(e.target.files[0])}
                  id="dropzone-file"
                  type="file"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Image Gallery
                </label>
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-multiple-file"
                    className="border-gray-300 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 flex h-50 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed"
                  >
                    {imagegallery.length > 0 ? (
                      <div className="flex flex-wrap items-center justify-center">
                        {imagegallery.map((image: any, index: any) => (
                          <img
                            src={image?.src}
                            key={index}
                            width="100px"
                            height="100px"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          className="text-gray-500 dark:text-gray-400 mb-4 h-8 w-8"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                    <input
                      onChange={(e: any) =>
                        Array.from(e.target.files).forEach((f: any) => {
                          imageGalleryToBase64(f);
                        })
                      }
                      id="dropzone-multiple-file"
                      type="file"
                      multiple
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <button
                className="flex w-full justify-center rounded bg-[#f90606] p-3 font-medium text-gray hover:bg-opacity-90"
                onClick={() => handleEdit()}
              >
                Update
              </button>
            </div>
          </div>
          <ToastContainer position="top-right" />
        </div>
      </CustomModal>
      <ToastContainer position="top-right" />
    </DefaultLayout>
  );
}
