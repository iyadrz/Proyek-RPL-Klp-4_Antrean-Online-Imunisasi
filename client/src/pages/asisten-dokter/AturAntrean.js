import React from "react";
import "./AturAntrean.scss";
import AntreanItem from "../../components/asisten-dokter/AntreanItem";
import LiveTime from "../../components/LiveTime";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AturAntrean() {
  const [jadwal, setJadwal] = useState("semua");
  const axiosPrivate = useAxiosPrivate();
  const baseURL = "/biodata/";

  const setGagal = () => {
    axiosPrivate.get(baseURL).then((response) => {
      let i = 0;
      response.data.forEach((element) => {
        i = element.urutan_selesai > i ? element.urutan_selesai : i;
      });
      let belum = response.data.filter(function (e) {
        return (
          tanggal(e.jadwal) === tanggal(new Date()) &&
          e.berhasil_dilayani === false &&
          e.sukses === true &&
          e.selesai === false
        );
      });

      belum.forEach((e) => {
        axiosPrivate
          .patch(baseURL + e.id, {
            selesai: true,
            berhasil_dilayani: false,
            urutan_pelayanan: 0,
            urutan_selesai: i + 1,
            dipanggil: false,
            estimasi: null,
          })
          .catch((error) => console.log(error));
        i = i + 1;
      });
    });
  };

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
      <div className="row mb-2 d-flex flex-column flex-md-row align-items-md-center gap-1 gap-md-0">
        <h4 className="fw-bold col-auto align-middle my-0 me-auto">
          <LiveTime />
        </h4>
        <button
          className="btn btn-danger ms-3 ms-md-0"
          data-bs-toggle="modal"
          data-bs-target={`#modalTutup`}
        >
          Tutup
        </button>
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
          <AntreanItem menu={"atur"} jadwal={jadwal} />
        </div>
      </div>
      <div
        className="modal fade"
        id={`modalTutup`}
        aria-hidden="true"
        aria-labelledby="modalTutupLabel"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title mx-auto fw-bold"
                id="exampleModaTutupLabel"
              >
                Tutup sesi imunisasi hari ini ?
              </h5>
            </div>
            <div className="modal-body text-center">
              Semua antrean yang masih ada di bagian atur antrean akan dianggap gagal dan dipindahkan ke anteran gagal
            </div>
            <div className="modal-footer d-flex flex-column align-items-center">
              <div className="button-konfirmasi">
                <button
                  className="btn btn-primary me-3"
                  data-bs-dismiss="modal"
                  onClick={setGagal}
                >
                  Ya
                </button>
                <button className="btn btn-danger" data-bs-dismiss="modal">
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AturAntrean;
