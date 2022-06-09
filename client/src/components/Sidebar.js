import React from "react";
import "./Sidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import LiveTime from "./LiveTime";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";

function Sidebar() {
  let navigate = useNavigate();
  let axiosPrivate = useAxiosPrivate();
  const [menu, setMenu] = useState("admin-loket");
  const [biodata, setBiodata] = useState([]);
  const [estimasiLive, setEstimasiLive] = useState("00:00");
  const [liveSekarang, setSekarang] = useState({});
  const [liveBerikutnya, setBerikutnya] = useState({});
  const [liveSelesai, setSelesai] = useState({});

  const handleMenu = (menu, route) => (event) => {
    setMenu(menu);
    navigate(route);
  };
  const baseURL = "/biodata/";

  useEffect(() => {
    const interval = setInterval(() => {
      axiosPrivate.get(baseURL).then((response) => {
        setBiodata(response.data);
        let skrg = response.data.filter(function (e) {
          return e.urutan_pelayanan > 0 && new Date(e.jadwal).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
        });
        setSekarang(skrg[0]);
        setBerikutnya(skrg[1]);
        let selesai = response.data.filter(function (e) {
          return e.berhasil_dilayani === true && new Date(e.estimasi).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
        });
        selesai.sort((a, b) => {
          let da = a.updatedAt,
            db = b.updatedAt;
          return new Date(db) - new Date(da);
        });
        setSelesai(selesai[0]);
      });
    }, 950);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEstimasiLive(msToMinute(liveSekarang ? liveSekarang.estimasi : "-"));
    }, 950);
    return () => clearInterval(interval);
  }, [liveSekarang && liveSekarang.estimasi]);

  const msToMinute = (ms) => {
    let menit = Math.floor(
      (new Date(ms).getTime() - new Date().getTime()) / (1000 * 60)
    );
    let detik = Math.floor(
      ((new Date(ms).getTime() - new Date().getTime()) / 1000) % 60
    );
    menit = menit < 10 ? `0${menit}` : `${menit}`;
    detik = detik < 10 ? `0${detik}` : `${detik}`;
    menit = !isNaN(menit) ? menit : "00";
    detik = !isNaN(detik) ? detik : "00";
    return `${menit}:${detik}`;
  };

  function tanggal(tggl) {
    let temp = new Date(tggl)
      .toLocaleString("id-ID", {
        timeZone: "Asia/Makassar",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .split(" ");
    return `${temp[0]} ${temp[1]} ${temp[2]}`;
  }

  let totalAntrean = biodata.filter(function (e) {
    return e.sukses === true && e.selesai === false && tanggal(e.jadwal) === tanggal(new Date());
  });

  return (
    <div className="col-1 col-sm-3 col-xl-2 px-sm-2 px-0 d-flex flex-column gap-3 pb-0 pb-sm-1 h-100 sidebar">
      <div className="d-flex flex-column align-items-center align-items-sm-start pt-sm-3 text-white">
        <div className="d-flex flex-column flex-sm-row mb-1 w-100">
          <button
            className={menu === "admin-loket" ? "button btn-shadow" : "button"}
            onClick={handleMenu("admin-loket", "/admin/admin-loket/")}
          >
            <span className={menu === "admin-loket" ? "fw-bold" : ""}>
              Loket
            </span>
          </button>
          {menu === "admin-loket" && (
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-1 align-items-center align-items-sm-start w-100 d-inline-block d-sm-none"
              id="menu"
            >
              <li className="w-100">
                <NavLink
                  to="./admin/admin-loket/"
                  className={({ isActive }) =>
                    (isActive ? "link-active" : "link") +
                    " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                  }
                >
                  <i className="fs-4 fa-solid fa-circle-question text-primary menu-logo"></i>
                  <span className="ms-2 d-none d-sm-inline">Verifikasi</span>
                </NavLink>
              </li>
              <li className="w-100">
                <NavLink
                  to="./admin/admin-loket/verifikasi-sukses"
                  className={({ isActive }) =>
                    (isActive ? "link-active " : "link") +
                    " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                  }
                >
                  <i className="fs-4 fa-solid fa-file-circle-check text-success menu-logo"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    <span className="d-none d-md-inline-block">Verifikasi</span>{" "}
                    Sukses
                  </span>
                </NavLink>
              </li>
              <li className="w-100">
                <NavLink
                  to="./admin/admin-loket/verifikasi-gagal"
                  className={({ isActive }) =>
                    (isActive ? "link-active " : "link") +
                    " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                  }
                >
                  <i className="fs-4 fa-solid fa-file-circle-xmark text-danger menu-logo"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    <span className="d-none d-md-inline-block">Verifikasi</span>{" "}
                    Gagal
                  </span>
                </NavLink>
              </li>
              <li className="w-100">
                <NavLink
                  to="./admin/admin-loket/rekap-verifikasi"
                  className={({ isActive }) =>
                    (isActive ? "link-active" : "link") +
                    " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                  }
                >
                  <i className="fs-4 fa-solid fa-clock-rotate-left text-secondary menu-logo"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Rekap{" "}
                    <snap className="d-none d-md-inline-block">Verifikasi</snap>
                  </span>
                </NavLink>
              </li>
            </ul>
          )}
          <button
            className={
              menu === "asisten-dokter" ? "button btn-shadow" : "button"
            }
            onClick={handleMenu("asisten-dokter", "/admin/asisten-dokter/")}
          >
            <span className={menu === "asisten-dokter" ? "fw-bold" : ""}>
              Asisten
            </span>
          </button>
          {menu === "asisten-dokter" && (
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100 d-inline-block d-sm-none"
              id="menu"
            >
              <li className="w-100">
                <NavLink
                  to="./admin/asisten-dokter/"
                  className={({ isActive }) =>
                    (isActive ? "link-active" : "link") +
                    " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                  }
                >
                  <i className="fs-4 fa-solid fa-arrow-down-1-9 text-primary menu-logo"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Atur{" "}
                    <snap className="d-none d-md-inline-block">Antrean</snap>
                  </span>
                </NavLink>
              </li>
              <li className="w-100">
                <NavLink
                  to="./admin/asisten-dokter/antrean-selesai"
                  className={({ isActive }) =>
                    (isActive ? "link-active " : "link") +
                    " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                  }
                >
                  <i className="fs-4 fa-solid fa-file-circle-check text-success menu-logo"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    <span className="d-none d-md-inline-block">Antrean</span>{" "}
                    Selesai
                  </span>
                </NavLink>
              </li>
              <li className="w-100">
                <NavLink
                  to="./admin/asisten-dokter/antrean-gagal"
                  className={({ isActive }) =>
                    (isActive ? "link-active " : "link") +
                    " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                  }
                >
                  <i className="fs-4 fa-solid fa-file-circle-xmark text-danger menu-logo"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    <span className="d-none d-md-inline-block">Antrean</span>{" "}
                    Gagal
                  </span>
                </NavLink>
              </li>
              <li className="w-100">
                <NavLink
                  to="./admin/asisten-dokter/rekap-antrean"
                  className={({ isActive }) =>
                    (isActive ? "link-active" : "link") +
                    " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                  }
                >
                  <i className="fs-4 fa-solid fa-clock-rotate-left text-secondary menu-logo"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Rekap{" "}
                    <snap className="d-none d-md-inline-block">Antrean</snap>
                  </span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        {menu === "admin-loket" && (
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100 d-none d-sm-inline-block"
            id="menu"
          >
            <li className="w-100">
              <NavLink
                to="./admin/admin-loket/"
                className={({ isActive }) =>
                  (isActive ? "link-active" : "link") +
                  " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                }
              >
                <i className="fs-4 fa-solid fa-circle-question text-primary"></i>
                <span className="ms-2 d-none d-sm-inline">Verifikasi</span>
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                to="./admin/admin-loket/verifikasi-sukses"
                className={({ isActive }) =>
                  (isActive ? "link-active " : "link") +
                  " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                }
              >
                <i className="fs-4 fa-solid fa-file-circle-check text-success"></i>
                <span className="ms-2 d-none d-sm-inline">
                  <span className="d-none d-md-inline-block">Verifikasi</span>{" "}
                  Sukses
                </span>
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                to="./admin/admin-loket/verifikasi-gagal"
                className={({ isActive }) =>
                  (isActive ? "link-active " : "link") +
                  " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                }
              >
                <i className="fs-4 fa-solid fa-file-circle-xmark text-danger"></i>
                <span className="ms-2 d-none d-sm-inline">
                  <span className="d-none d-md-inline-block">Verifikasi</span>{" "}
                  Gagal
                </span>
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                to="./admin/admin-loket/rekap-verifikasi"
                className={({ isActive }) =>
                  (isActive ? "link-active" : "link") +
                  " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                }
              >
                <i className="fs-4 fa-solid fa-clock-rotate-left text-secondary"></i>
                <span className="ms-2 d-none d-sm-inline">
                  Rekap{" "}
                  <snap className="d-none d-md-inline-block">Verifikasi</snap>
                </span>
              </NavLink>
            </li>
          </ul>
        )}
        {menu === "asisten-dokter" && (
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100 d-none d-sm-inline-block"
            id="menu"
          >
            <li className="w-100">
              <NavLink
                to="./admin/asisten-dokter/"
                className={({ isActive }) =>
                  (isActive ? "link-active" : "link") +
                  " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                }
              >
                <i className="fs-4 fa-solid fa-arrow-down-1-9 text-primary"></i>
                <span className="ms-2 d-none d-sm-inline">
                  Atur <snap className="d-none d-md-inline-block">Antrean</snap>
                </span>
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                to="./admin/asisten-dokter/antrean-selesai"
                className={({ isActive }) =>
                  (isActive ? "link-active " : "link") +
                  " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                }
              >
                <i className="fs-4 fa-solid fa-file-circle-check text-success"></i>
                <span className="ms-2 d-none d-sm-inline">
                  <span className="d-none d-md-inline-block">Antrean</span>{" "}
                  Selesai
                </span>
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                to="./admin/asisten-dokter/antrean-gagal"
                className={({ isActive }) =>
                  (isActive ? "link-active " : "link") +
                  " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                }
              >
                <i className="fs-4 fa-solid fa-file-circle-xmark text-danger"></i>
                <span className="ms-2 d-none d-sm-inline">
                  <span className="d-none d-md-inline-block">Antrean</span>{" "}
                  Gagal
                </span>
              </NavLink>
            </li>
            <li className="w-100">
              <NavLink
                to="./admin/asisten-dokter/rekap-antrean"
                className={({ isActive }) =>
                  (isActive ? "link-active" : "link") +
                  " nav-link align-middle px-0 ps-2 w-100 d-flex align-items-center"
                }
              >
                <i className="fs-4 fa-solid fa-clock-rotate-left text-secondary"></i>
                <span className="ms-2 d-none d-sm-inline">
                  Rekap{" "}
                  <snap className="d-none d-md-inline-block">Antrean</snap>
                </span>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="container live-antrian-container col-12 col-md-11 px-0 p-md-3 pt-3 pb-md-4 pb-4 text-center mt-auto d-none d-sm-inline-block">
        <h5>Live Antrian</h5>
        <p className="mb-1">
          <LiveTime hideTime={true} />
        </p>
        <div className="live-antrian overflow-auto mb-2">
          <div className="live-antrian-item p-3 mb-3">
            <p>Sekarang</p>
            <p className="fs-3">
              {liveSekarang
                ? liveSekarang.dipanggil
                  ? liveSekarang.nomor_antrean
                  : "-"
                : "-"}
            </p>
            <p className="small-font mb-1">Estimasi selesai dalam:</p>
            <span className="small-font">
              {liveSekarang
                ? liveSekarang.dipanggil === true
                  ? estimasiLive.includes("-")
                    ? "00:00"
                    : estimasiLive
                  : "-"
                : "-"}
            </span>
          </div>
          <div className="live-antrian-item p-3 mb-3">
            <p>Berikutnya</p>
            <p className="fs-3 mb-1">
              {liveSekarang
                ? liveSekarang.dipanggil
                  ? liveBerikutnya
                    ? liveBerikutnya.nomor_antrean
                    : "-"
                  : liveSekarang.nomor_antrean
                : "-"}
            </p>
          </div>
          <div className="live-antrian-item p-3">
            <p>Sebelumnya</p>
            <p className="fs-3 mb-1">
              {liveSelesai ? liveSelesai.nomor_antrean : "-"}
            </p>
          </div>
        </div>
        <h5 className="mb-0">Total Antrian</h5>
        <span className="fw-bold fs-3">{totalAntrean ? totalAntrean.length : 0}</span>
      </div>
      <div className="d-flex flex-column justify-content-end d-sm-none flex-fill mx-auto w-100 text-center">
        <div className="fw-bold fs-1 live-antrian-item d-flex flex-column justify-content-center align-items-center gap-3">
          <i className="fa-solid fa-gears"></i>
          <span>
            {liveSekarang
              ? liveSekarang.dipanggil
                ? liveSekarang.nomor_antrean
                : "-"
              : "-"}
          </span>
          <span className="fs-5">
            {liveSekarang
              ? liveSekarang.dipanggil === true
                ? estimasiLive.includes("-")
                  ? "00:00"
                  : estimasiLive
                : "-"
              : "-"}
          </span>
        </div>
        <div className="fs-1 live-antrian-item d-flex flex-column justify-content-center align-items-center gap-2">
          <i className="fa-solid fa-angles-right text-danger"></i>
          <span>
            {liveSekarang
              ? liveSekarang.dipanggil
                ? liveBerikutnya
                  ? liveBerikutnya.nomor_antrean
                  : "-"
                : liveSekarang.nomor_antrean
              : "-"}
          </span>
        </div>
        <div className="fs-1 live-antrian-item d-flex flex-column justify-content-center align-items-center gap-2">
          <i className="fa-solid fa-check text-success"></i>
          <span>{liveSelesai ? liveSelesai.nomor_antrean : "-"}</span>
        </div>
        <div className="fs-1 live-antrian-item d-flex flex-column justify-content-center align-items-center gap-2">
          <span className="small-font fw-bold">Total Antrean</span>
          <span>{totalAntrean ? totalAntrean.length : 0}</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
