import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import logoMakassar from "../../images/image 1.png";
import logoDinkes from "../../images/image 2.png";
import logoPuskesmas from "../../images/image 3.png";

function Navbar() {
  return (
    <nav className="navbar navbar-pasien navbar-expand-lg navbar-light py-3">
      <div className="container-fluid">
        <span className="navbar-brand d-flex gap-3 gap-lg-4 col-lg-1 ms-lg-3">
          <img className="logo" src={logoMakassar} alt="Logo Kota Makassar" />
          <img className="logo" src={logoDinkes} alt="Logo Dinas Kesehatan" />
          <img
            className="logo d-lg-none"
            src={logoPuskesmas}
            alt="Logo Puskesmas"
          />
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

        <div
          className="collapse navbar-collapse col-lg-9"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mx-auto mx-lg-0 ms-2 ms-lg-auto w-100 mb-2 mb-lg-0 d-flex justify-content-lg-center gap-1 gap-lg-3 gap-xl-5">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                BERANDA
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="./daftar">
                DAFTAR ANTREAN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="./cara-mendaftar">
                CARA MENDAFTAR
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="./live-antrean">
                LIVE ANTREAN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="./tanya-jawab">
                TANYA JAWAB
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="./kontak">
                KONTAK
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="col-lg-1 d-none d-lg-flex justify-content-end me-3">
          <img
            className="logo"
            src={logoPuskesmas}
            alt="Logo Puskesmas"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
