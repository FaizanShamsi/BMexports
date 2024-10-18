"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { usePathname } from "next/navigation";
import { NextUIProvider } from "@nextui-org/system";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const lastSegment = segments[segments.length - 1];
  const capitalizedFirstWord =
    lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  const formattedLastSegment = capitalizedFirstWord.replace(/-/g, " ");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className=" bg-white	">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-white">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="w-full p-4 md:p-6 2xl:p-6 ">
              {pathname === "/invoice" ? (
                " "
              ) : (
                <div className="mx-4">
                  <Breadcrumb
                    pageName={formattedLastSegment}
                    pathname={lastSegment}
                  />
                </div>
              )}

              <NextUIProvider>{children}</NextUIProvider>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
