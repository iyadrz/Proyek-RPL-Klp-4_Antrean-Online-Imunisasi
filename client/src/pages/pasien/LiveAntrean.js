import React from "react";
import Axios from "axios";
import "./LiveAntrean.css";
import LiveTime from "../../components/LiveTime";
import { useState, useEffect } from "react";

function LiveAntrean() {
  const [estimasiLive, setEstimasiLive] = useState("00:00");
  const [liveSekarang, setSekarang] = useState({});
  const [liveBerikutnya, setBerikutnya] = useState({});
  const [liveSelesai, setSelesai] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      Axios.get("http://168.138.180.185:3000/api/biodata/live-antrean/").then(
      // Axios.get("http://localhost:8080/api/biodata/live-antrean/").then(
        (response) => {
          let skrg = response.data.filter(function (e) {
            return (
              e.urutan_pelayanan > 0 &&
              new Date(e.jadwal).setHours(0, 0, 0, 0) ===
                new Date().setHours(0, 0, 0, 0)
            );
          });
          skrg.sort((a, b) => {
            let da = a.urutan_pelayanan,
              db = b.urutan_pelayanan;
            return da - db;
          });
          setSekarang(skrg[0]);
          setBerikutnya(skrg[1]);
          let selesai = response.data.filter(function (e) {
            return (
              e.berhasil_dilayani === true &&
              new Date(e.estimasi).setHours(0, 0, 0, 0) ===
                new Date().setHours(0, 0, 0, 0)
            );
          });
          selesai.sort((a, b) => {
            let da = a.updatedAt,
              db = b.updatedAt;
            return new Date(db) - new Date(da);
          });
          setSelesai(selesai[0]);
        }
      );
    }, 950);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEstimasiLive(msToMinute(liveSekarang.estimasi));
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

  return (
    <main className="container-lg live-antrean--content text-center d-flex flex-column gap-3 align-items-center mt-5">
      <h1 className="fw-bold">Live Antrean</h1>
      <h5 className="">Kondisi terkini antrean imunisasi</h5>
      <h4 className="fw-bold">
        <LiveTime />
      </h4>
      <div className="col-12 col-xl-10 col-xxl-8 d-flex flex-column flex-md-row justify-content-center gap-3 gap-lg-5 d-flex align-items-center mb-4">
        <div className="col-7 col-sm-5 live-antrean--benefit-items text-center d-flex flex-column justify-content-center p-4 flex-fill h-100">
          <p className="fs-5 fw-bold">Sebelumnya</p>
          <p className="fs-2">
            {liveSelesai ? liveSelesai.nomor_antrean : "-"}
          </p>
        </div>
        <div className="col-7 col-sm-5 live-antrean--benefit-items text-center d-flex justify flex-column justify-content-center p-4 flex-fill h-100">
          <p className="fs-5 fw-bold">Sekarang</p>
          <p className="fs-1">
            {liveSekarang
              ? liveSekarang.dipanggil
                ? liveSekarang.nomor_antrean
                : "-"
              : "-"}
          </p>
          <p>Estimasi selesai dalam:</p>
          <p>
            {liveSekarang
              ? liveSekarang.dipanggil === true
                ? estimasiLive.includes("-")
                  ? "00:00"
                  : estimasiLive
                : "-"
              : "-"}
          </p>
        </div>
        <div className="col-7 col-sm-5 live-antrean--benefit-items text-center d-flex justify flex-column justify-content-center p-4 flex-fill h-100">
          <p className="fs-5 fw-bold">Berikutnya</p>
          <p className="fs-2">
            {liveSekarang
              ? liveSekarang.dipanggil
                ? liveBerikutnya
                  ? liveBerikutnya.nomor_antrean
                  : "-"
                : liveSekarang.nomor_antrean
              : "-"}
          </p>
        </div>
      </div>
    </main>
  );
}

export default LiveAntrean;
