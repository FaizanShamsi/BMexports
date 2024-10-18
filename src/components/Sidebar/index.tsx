"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import logo from "../../../public/images/white-and-red-logo-png.png";
import { RiHomeLine } from "react-icons/ri";
import { FaCar } from "react-icons/fa";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    }
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0  z-9999 m-2	 flex h-screen w-72.5 flex-col overflow-y-hidden rounded-3xl bg-[#000] dark:bg-boxdark lg:static lg:translate-x-0 ${
        // className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-5 py-5.5 lg:py-6.5">
        {/* add any image or brand name */}
        <div className=" flex w-full items-center justify-center p-3">
          <Image src={logo} alt="logo" width={140} height={120} />
        </div>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-3 lg:mt-3 ">
          <div>
            <ul className=" flex flex-col gap-2">
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex h-12 items-center gap-2.5 rounded-sm  px-8 py-2 text-lg font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/" ||
                            pathname.includes("dashboard")) &&
                          "bg-[#600103] dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <RiHomeLine fontSize={27} />
                        Dashboard
                        <svg
                          className={`absolute right-6 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate mx-2 transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              Cards
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/carstock" || pathname.includes("carstock")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex h-12 items-center gap-2.5 rounded-sm px-8 py-2 text-lg font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/carstock" ||
                            pathname.includes("carstock")) &&
                          "bg-[#600103] dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaCar />
                        Car stock
                        <svg
                          className={`absolute right-6 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate mx-2 transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6 ">
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-stock"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md text-lg font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Stock
                            </Link>
                          </li>

                          <li className="my-1">
                            <Link
                              href="/carstock/stock-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md text-lg font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Stock list
                            </Link>
                          </li>

                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-placement"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Placement
                            </Link>
                          </li>

                          <li className="my-1">
                            <Link
                              href="/carstock/placement-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Placement list
                            </Link>
                          </li>

                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-machinery"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Aded New Machinery
                            </Link>
                          </li>

                          <li className="my-1">
                            <Link
                              href="/carstock/machinery-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Machinery list
                            </Link>
                          </li>

                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-make"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              Add New Make
                            </Link>
                          </li>

                          <li className="my-1">
                            <Link
                              href="/carstock/make-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Make List
                            </Link>
                          </li>

                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-modal"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Model
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/modal-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Model List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-year"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Year
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/year-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Year List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-month"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Month
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/month-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Month list
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-drive-type"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Drive Type
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/drive-type-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Drive Type List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-fuel-type"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Fuel Type
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/fuel-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Fuel List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-transmission"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Transmission
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/transmission-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Transmission List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-color"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Color
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/color-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Color List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-door"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Door
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/door-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Door List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-streering"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Steering
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/steering-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Steering List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-option"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Option
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/option-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Option List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-vechicle-type"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Vehicle Type
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/vehicle-type-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Vehicle Type List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-body-type"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              Add New Body Type
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/body-types-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Body type List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-price-range"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Price Range
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/price-range-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Price Range List
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/add-new-mileage-range"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Add New Mileage Range
                            </Link>
                          </li>
                          <li className="my-1">
                            <Link
                              href="/carstock/mileage-range-list"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Mileage Range List
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === "/upload-file" ||
                  pathname.includes("upload-file")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex h-12 items-center gap-2.5 rounded-sm px-8 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/upload-file" ||
                            pathname.includes("upload-file")) &&
                          "bg-[#600103] dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();

                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <CloudDownloadIcon />
                        Upload A File
                        <svg
                          className={`absolute right-6 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate mx-2 transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6 ">
                          <li className="my-1">
                            <Link
                              href="/upload-file/uploadfile"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              Upload a new file
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/lead" || pathname.includes("lead")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex h-12 items-center gap-2.5 rounded-sm px-8 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/lead" || pathname.includes("lead")) &&
                          "bg-[#600103] dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <LeaderboardIcon />
                        Leads
                        <svg
                          className={`absolute right-6 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <div
                        className={`translate mx-2 transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6 ">
                          <li className="my-1">
                            <Link
                              href="/lead/view-lead"
                              className={`group  relative  flex h-8 items-center gap-2.5 rounded-md font-medium  text-white duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "text-white"
                              }`}
                            >
                              {" "}
                              View Lead
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          <div></div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
