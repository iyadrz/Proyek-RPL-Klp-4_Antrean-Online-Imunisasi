import React from "react";
import Axios from "axios";
import "./Navbar.scss";
import useAuth from "../hooks/useAuth";
import logoAkun from "../images/woman.png";
import logoPuskesmas from "../images/image 3.png";

function Navbar() {
  const { setAuth } = useAuth();
  
  const Logout = async () => {
    try {
      await Axios.delete("http://168.138.180.185:3000/api/auth/logout", {
      // await Axios.delete("http://localhost:8080/api/auth/logout", {
        withCredentials: true,
      })
      .then(() => {
        setAuth({});
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-lg-auto ps-3">
            <img className="" src={logoPuskesmas} width="50" alt="" />
          </ul>
        </div>

        <span className="navbar-brand mx-lg-auto d-flex align-items-center gap-1">
          <img
            className="d-lg-none d-none d-sm-inline-block"
            src={logoPuskesmas}
            width="40"
            alt=""
          />
          <span className="title fw-bold">Puskesmas Pattingalloang</span>
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-lg-auto d-flex align-items-center pe-3">
            <div className="dropdown d-none d-lg-inline-block">
              <a
                href="/"
                className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img className="" src={logoAkun} width="50" alt="" />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-light text-small shadow text-center mt-lg-3 pb-0"
                aria-labelledby="dropdownUser1"
              >
                <div className="px-5 pt-3">
                  <li>
                    <img className="" src={logoAkun} width="60" alt="" />
                  </li>
                  <li className="mt-2 mb-1">
                    <span className="fw-bold d-block">Admin</span>
                  </li>
                </div>
                <li>
                  <button
                    onClick={Logout}
                    className="dropdown-item logout-large text-danger pb-2"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav d-inline-block d-lg-none">
              <li>
                <button onClick={Logout} className="logout-btn">
                  Log out
                </button>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
