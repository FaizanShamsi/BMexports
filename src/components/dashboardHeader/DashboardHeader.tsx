import React from "react";
import Image from "next/image";
import headerbg from "@/../public/images/dashboardImages/dashboardheaderBg.png";
import AddIcon from "@mui/icons-material/Add";
import carBackground from "@/../public/images/dashboardImages/carbackground.svg";
const textContainerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "#fff",
};

// const buttonStyle = {
//   marginTop: '20px',
//   padding: '10px 20px',
//   background: '#007bff',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
// };

export default function DashboardHeader() {
  const textContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: "30%",
    left: "3%",
    // transform: "translate(-50%, -50%)",
    textAlign: "start",
    color: "#ccc",
  };

  return (
    <div className="relative w-full rounded-lg bg-[#FFF3F4]">
      <Image src={carBackground} alt="headerbg" className="m-1 w-full" />
      <div style={textContainerStyle}>
        <h1 className="text-[55px] font-bold text-black">
          Welcome back, Jasmeen
        </h1>
        <h4 className="mx-2 mt-5 text-xl font-medium text-[#626262]">
          Track, manage and forecast your customers and orders.
        </h4>
        <button className="mx-2 mt-3 flex items-center gap-2 rounded-md bg-[#F90606] px-6 py-2 text-lg font-medium  text-white">
          <AddIcon style={{ fontSize: "20px" }} /> Add car
        </button>
      </div>
    </div>
  );
}
