"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";

export default function Page() {
  return (
    <DefaultLayout>
      <div className="sm:p-2 md:p-4">
        <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <h1 className="text-lg font-semibold text-black-2">
              Issue Invoice & Reserve
            </h1>
            <div className="justify-between md:flex">
              <h3>It contains all the quotations you have requested.</h3>
              <h3>
                You can currently reserve{" "}
                <span className="text-pink-400">1 vehicle</span> using Buy Now
              </h3>
            </div>
            <hr className="text-red" />
            <div className="flex h-90 flex-col items-center justify-center gap-5 border text-center">
              <h1 className="text-xl font-semibold ">No Items Found</h1>
              <h2>
                Browse the stock and enquire/get a quote for the item you like
              </h2>
              <KeyboardArrowDownIcon />
              <button
                className="flex w-55 justify-center rounded bg-[#f90606] p-3 font-medium text-gray hover:bg-opacity-90"
                onClick={() => console.log(" button clicked")}
              >
                Browse Our Stock
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
