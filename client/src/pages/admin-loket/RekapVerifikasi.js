import React from "react";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./RekapVerifikasi.scss";
import AntreanItem from "../../components/admin-loket/AntreanItem";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";

function RekapVerifikasi() {
  // const axiosPrivate = useAxiosPrivate();
  // const baseURL = "/biodata/";
  const [date, setDate] = useState(new Date());
  const [tampilkanSemua, setChecked] = useState(false);
  
  // const deleteAll = () => {
  //   axiosPrivate.delete(baseURL).catch((error) => console.log(error));
  // };
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
    </main>
  );
}

export default RekapVerifikasi;
