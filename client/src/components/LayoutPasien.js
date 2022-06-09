import Navbar from "./pasien/Navbar";
import { Outlet } from "react-router-dom";

const LayoutPasien = () => {
  return (
    <div className="d-flex flex-column h-100">
        <Navbar/>
        <Outlet />
      </div>
  );
};

export default LayoutPasien;
