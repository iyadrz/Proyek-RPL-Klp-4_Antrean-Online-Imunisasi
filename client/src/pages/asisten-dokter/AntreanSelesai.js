import React from "react";
import "./AntreanSelesai.scss";
import AntreanItem from "../../components/asisten-dokter/AntreanItem";
import LiveTime from "../../components/LiveTime";
import { useState } from "react";

function AntreanSelesai() {
  const [jadwal, setJadwal] = useState("semua");

  function tanggal(tggl) {
    let temp = new Date(tggl)
      .toLocaleString("id-ID", {
        timeZone: "Asia/Makassar",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .split(" ");
    return `${temp[0]} ${temp[1]} ${temp[2]}`;
  }

  let nextThursday;
  for (let i = 0; i < 7; i++) {
    if (new Date().getDay() + i === 4 || new Date().getDay() + i === 11) {
      nextThursday = new Date(new Date().setDate(new Date().getDate() + i));
    }
  }

  let thursday = [];
  for (let i = 0; i < 4; i++) {
    thursday.push(new Date(new Date().setDate(nextThursday.getDate() + 7 * i)));
  }
  return (
    <main className="col py-2 py-sm-3 px-3 d-flex flex-column">
      <div className="row mb-2 d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-1 gap-md-0">
        <h4 className="fw-bold col-auto align-middle my-0">
          <LiveTime />
        </h4>
        <div className="col-1 jadwal-parent">
          <select
            className="form-select"
            name="pilih-jadwal"
            id="pilih-jadwal"
            onChange={(e) => setJadwal(e.target.value)}
            required
          >
            <option value="semua">Semua</option>
            {thursday.map((e) => (
              <option value={e}>{tanggal(e)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex flex-column gap-3 overflow-auto antrian-container pb-3 flex-fill">
        <div className="antrian-item-container d-flex flex-column gap-3">
          <AntreanItem menu={"sukses"} jadwal={jadwal} />
        </div>
      </div>
    </main>
  );
}

export default AntreanSelesai;
