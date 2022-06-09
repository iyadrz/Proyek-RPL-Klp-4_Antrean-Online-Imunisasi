import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./RekapAntrean.scss";
import AntreanItem from "../../components/asisten-dokter/AntreanItem";
import { useState, useEffect } from "react";
import fileDownload from "js-file-download";

function RekapVerifikasi() {
  const axiosPrivate = useAxiosPrivate();
  const [date, setDate] = useState(new Date());
  const baseURL = "/biodata/";
  const [tampilkanSemua, setChecked] = useState(false);
  const deleteAll = () => {
    axiosPrivate.delete(baseURL).catch((error) => console.log(error));
  };
  const downloadExcel = () => {
    axiosPrivate
      .get(baseURL + "download/", {responseType: "blob"})
      .then((response) => {
        fileDownload(response.data, 'Data_Antrean_Imunisasi.xlsx')
      });
  };
  function tanggal() {
    let temp = new Date()
      .toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/");
    return `${temp[2]}-${temp[1]}-${temp[0]}`;
  }

  const inputRef = React.useRef();
  useEffect(() => {
    inputRef.current.value = tanggal(date);
  }, [date]);

  const handleChange = () => {
    setChecked(!tampilkanSemua);
  };

  return (
    <main className="verifikasi col py-2 py-sm-3 px-3 d-flex flex-column">
      <div className="d-flex justify-content-between mb-2">
        <div className="row g-2 align-items-center">
          <div className="col-auto">
            <label htmlFor="datepicker" className="col-form-label">
              Pilih Tanggal :
            </label>
          </div>
          <div className="col-auto me-2">
            <input
              id="datepicker"
              ref={inputRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
              disabled={tampilkanSemua && "disabled"}
            />
          </div>
          <label className="col-auto">
            <input type="checkbox" className="me-1" onChange={handleChange} />{" "}
            Tampilkan Semua
          </label>
        </div>
        <ul className="list-unstyled d-flex gap-3 my-auto">
          <li>
            <a
              href="/"
              className="link-secondary"
              data-bs-toggle="modal"
              data-bs-target="#toggleDownload"
            >
              <i className="fa-solid fa-floppy-disk fs-4"></i>
            </a>
          </li>
          <li>
            <a
              href="/"
              className="link-secondary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalToggle"
            >
              <i className="fa-solid fa-trash fs-4"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="d-flex flex-column gap-3 overflow-auto antrian-container pb-3 flex-fill">
        <div className="antrian-item-container d-flex flex-column gap-3">
          <AntreanItem
            menu={"rekap"}
            rekapDate={date}
            tampilkanSemua={tampilkanSemua}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title mx-auto fw-bold"
                id="exampleModalToggleLabel"
              >
                PERHATIAN
              </h5>
            </div>
            <div className="modal-body text-center p-0 pt-3">
              <p>Apakah Anda yakin ingin menghapus ?</p>
            </div>
            <div className="modal-footer d-flex flex-column align-items-center">
              <div className="button-konfirmasi">
                <button
                  className="btn btn-primary me-3"
                  data-bs-toggle="modal"
                  onClick={deleteAll}
                >
                  YA
                </button>
                <button className="btn btn-danger" data-bs-dismiss="modal">
                  TIDAK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="toggleDownload"
        aria-hidden="true"
        aria-labelledby="toggleDownloadLabel"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mx-auto fw-bold" id="toggleDownloadLabel">
                PERHATIAN
              </h5>
            </div>
            <div className="modal-body text-center p-0 pt-3">
              <p>Lanjutkan download data antrean dalam bentuk excel ?</p>
            </div>
            <div className="modal-footer d-flex flex-column align-items-center">
              <div className="button-konfirmasi">
                <button
                  className="btn btn-primary me-3"
                  data-bs-toggle="modal"
                  onClick={downloadExcel}
                >
                  YA
                </button>
                <button className="btn btn-danger" data-bs-dismiss="modal">
                  TIDAK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RekapVerifikasi;
