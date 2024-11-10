"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dynamically import JoditEditor with ssr: false
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Page = () => {
  const [isChecked, setIsChecked] = useState(false);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<any>("");
  const [imagegallery, setImageGallery] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any>({});
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [chassis, setChassis] = useState("");
  const [engine, setEngine] = useState("");
  const [mileage, setMileage] = useState("");
  const [seating, setSeating] = useState("");
  const [capacity, setCapacity] = useState("");
  const [placements, setPlacement] = useState([]);
  const [machineries, setMachinery] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [driverTypes, setDriverTypes] = useState([]);
  const [fuelType, setFuelTypes] = useState([]);
  const [transmission, setTransmissions] = useState([]);
  const [colors, setColors] = useState([]);
  const [mileageRange, setMileageRange] = useState([]);
  const [bodyTypes, setBodyType] = useState([]);
  const [doors, setDoors] = useState([]);
  const [steering, setSteering] = useState([]);
  const [options, setOptions] = useState([]);

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

  const fetchStock = async () => {
    console.log(selectedOption, "selectedOption");
    const stockData = {
      ...selectedOption,
      featured_image: image,
      image_gallery: imagegallery,
      ref_no: "",
      grade: "",
      condition: "",
      options: options,
      stock_description: content,
    };

    console.log(options, "options");

    console.log(stockData);

    try {
      const response = await fetch(
        "https://bmexportsbackend.creatixtech.com/api/add-new-stock",
        {
          method: "POST",
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
          checked: isChecked,
          onChange: (checked: boolean | ((prevState: boolean) => boolean)) =>
            setIsChecked(checked),
        });
      });
      setOptions(processedData);
    } catch (err: any) {
      console.log(err, "err");
    }
  };

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
  }, []);

  return (
    <DefaultLayout>
      <div className="sm:p-2 md:p-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:w-full md:w-203">
          <div className="flex flex-col gap-5.5 p-6.5">
            <SelectGroupTwo
              selectedOption={selectedOption.placement}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, placement: e })
              }
              heading="Car Placement"
              options={placements}
            />
            {/* <SelectGroupTwo
              selectedOption={selectedOption.car}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, car: e })
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
                setSelectedOption({ ...selectedOption, sold: e })
              }
              heading="Sold"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.reserved}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, reserved: e })
              }
              heading="Reserved"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
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
                setSelectedOption({ ...selectedOption, machinery_type: e })
              }
              heading="Machinery Type "
              spanText="Add Machinery Type"
              options={machineries}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.price_range}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, price_range: e })
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
                  setPrice(e.target.value);
                  setSelectedOption({
                    ...selectedOption,
                    car_price: e.target.value,
                  });
                }}
                type="text"
                placeholder="Enter Car Price"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={selectedOption.car_price}
              />
            </div>
            <SelectGroupTwo
              selectedOption={selectedOption.make}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, make: e })
              }
              heading="Car Make "
              spanText="Add Car Make"
              options={makes}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.car_model}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, car_model: e })
              }
              heading="Car Model "
              spanText="Add Car Model"
              options={models}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.vehicle_type}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, vehicle_type: e })
              }
              heading="Vehicle Type "
              spanText="Add Vehicle Type"
              options={vehicleTypes}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.month}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, month: e })
              }
              heading="Month "
              spanText="Add Month"
              options={months}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.year}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, year: e })
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
                setSelectedOption({ ...selectedOption, drive_type: e })
              }
              heading="Drive Type "
              spanText="Add Drive Type"
              options={driverTypes}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.fuel_type}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, fuel_type: e })
              }
              heading="Fuel Type "
              spanText="Add Fuel Type"
              options={fuelType}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.transmission}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, transmission: e })
              }
              heading="Transmission "
              spanText="Add Transmission"
              options={transmission}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.color}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, color: e })
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
                setSelectedOption({ ...selectedOption, mileage_range: e })
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
                  setMileage(e.target.value);
                  setSelectedOption({
                    ...selectedOption,
                    mileage: e.target.value,
                  });
                }}
                type="text"
                placeholder="Enter Mileage "
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={selectedOption.mileage}
              />
            </div>
            <SelectGroupTwo
              selectedOption={selectedOption.body_type}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, body_type: e })
              }
              heading="Body Type "
              spanText="Add Body Type"
              options={bodyTypes}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.door}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, door: e })
              }
              heading="Doors "
              spanText="Add Doors"
              options={doors}
            />
            <SelectGroupTwo
              selectedOption={selectedOption.steering}
              setSelectedOption={(e) =>
                setSelectedOption({ ...selectedOption, steering: e })
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
                onChange={checkbox.onChange}
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
              onClick={() => fetchStock()}
            >
              Add
            </button>
          </div>
        </div>
        <ToastContainer position="top-right" />
      </div>
    </DefaultLayout>
  );
};
export default Page;
