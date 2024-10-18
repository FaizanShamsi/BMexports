import { Metadata } from "next";
import DashboardContent from "@/components/DashboardContent/DashboardContent";

export const metadata: Metadata = {
  title: "BM Exports-Admin Dashboard",
};

export default function Home() {
  return (
    <>
      <DashboardContent />
    </>
  );
}
