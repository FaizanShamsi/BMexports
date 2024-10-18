"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import carDataJson from "@/shared/carData/CarData.json";
import { CarCardProps } from "@/shared/interface";
import CarCardCustom from "../CarCardDesign/CarCard";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import CardDataStats from "../CardDataStats";
import { FaCar } from "react-icons/fa";
import { BsFuelPumpFill } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { TbMessageCircle } from "react-icons/tb";
import { GoCalendar } from "react-icons/go";

export default function AddNewStock() {
  const [carData, setCarData] = useState<CarCardProps[]>([]);

  useEffect(() => {
    setCarData(carDataJson);
  }, []);
  const cardData = [
    {
      title: "Total cars",
      total: "56",
      rate: "34",
      icon: <FaCar fontSize={30} className="font-bold text-red" />,
    },
    {
      title: "Total messages",
      total: "160",
      rate: "34",
      icon: <TbMessageCircle fontSize={30} className="font-bold text-red" />,
    },
    {
      title: "Total stock",
      total: "56",
      rate: "34",
      icon: <GoCalendar fontSize={30} className="font-bold text-red" />,
    },
    {
      title: "Total fuel",
      total: "56",
      rate: "34",
      icon: <BsFuelPumpFill fontSize={30} className="font-bold text-red" />,
    },
  ];
  return (
    <DefaultLayout>
      <div className="sm:p-2 md:p-1">
        <div className="hidden md:block">
          <DashboardHeader />
        </div>
        <div className="my-10 block justify-between gap-9 md:flex">
          {cardData.map((data, index) => (
            <CardDataStats
              key={index}
              title={data.title}
              total={data.total}
              rate={data.rate}
            >
              {data.icon}
            </CardDataStats>
          ))}
        </div>
        <div className="flex justify-between">
          <h2 className=" mb-4  text-3xl font-bold  text-black">
            Fresh Arrival
          </h2>
          <h2 className=" mb-4 cursor-pointer text-2xl font-bold  text-red">
            See All
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 xl:grid-cols-4 2xl:gap-9">
          {carData.map((car) => (
            <CarCardCustom
              key={car.id}
              id={car.id}
              image={car.image}
              price={car.price}
              modal={car.modal}
              mileage={car.mileage}
              year={car.year}
              name={car.name}
            />
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
