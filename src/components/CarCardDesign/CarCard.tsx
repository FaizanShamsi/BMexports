import { CarCardProps } from "@/shared/interface";
import SpeedIcon from "@mui/icons-material/Speed";
import React from "react";
import { BsFuelPumpFill } from "react-icons/bs";
import carIcon from "../../../public/images/dashboardImages/Car (2).svg";
import Image from "next/image";

const CarCardCustom: React.FC<CarCardProps> = ({
  id,
  image,
  price,
  modal,
  mileage,
  year,
  name,
}) => {
  console.log(id, image, price, modal, mileage, year, name);
  return (
    <div className="h-80 w-full rounded-xl border border-[#D7D7D7] bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <img src={image} alt="car" className="h-45 w-full rounded-t-xl" />
      <div className="p-4 px-5">
        <div className="flex items-center justify-between border-b border-[#90A3BF] pb-5">
          <div>
            <h2 className="text-base font-medium text-[#1A202C]">{name}</h2>
            <h2 className="mt-1 text-sm font-normal text-[#90A3BF]">Sport</h2>
          </div>
          <h2 className="text-base font-medium text-[#1A202C]">${price}/</h2>
        </div>
        <div className="mt-4 flex items-center justify-between text-[#90A3BF]">
          <h1 className="flex items-center text-sm">
            <BsFuelPumpFill className="mr-1" />
            {modal}
          </h1>
          <h1 className="flex items-center text-sm">
            <Image src={carIcon} alt="Car Icon" className="mr-1 h-4 w-4" />
            {year}
          </h1>
          <h1 className="flex items-center text-sm">
            <SpeedIcon className="mr-1 h-4 w-4 text-sm" />
            {mileage}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CarCardCustom;
