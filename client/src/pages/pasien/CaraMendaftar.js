import React from "react";
import "./CaraMendaftar.css";
import { useNavigate } from "react-router-dom";

function CaraMendaftar() {
  let navigate = useNavigate();
  return (
    <main className="container-lg align-items-center flex-fill">
      <div className="row cara-mendaftar--content flex align-items-center justify-content-center">
        <div className="col-11 col-lg-6 py-4 p-lg-0 mb-lg-5">
          <h1 className="offset-lg-1 cara-mendaftar--title">Cara Mendaftar</h1>
          <h4 className="offset-lg-1 col-10 mt-4">3 Langkah untuk mendaftar</h4>
          <p className="offset-lg-1 col-10 mb-4">
            Dengan adanya antrean online ini diharapkan pasien bisa mendapatkan
            antrean dimana saja dan kapan saja secara online.
          </p>
          <button
            className="btn button-pasien offset-lg-1 col-10"
            type="button"
            name="button"
            onClick={() => {
              navigate("/daftar");
            }}
          >
            Daftar Antrean
          </button>
        </div>

        <div className="col-11 col-lg-6 p-4 p-lg-0">
          <div className="row gap-2">
            <div className="col-lg-2 col-1 d-flex flex-column align-items-center">
              <p className="fs-2 text-center cara-mendaftar--circle-border m-0">
                1
              </p>
              <div className="cara-mendaftar--vertical-line flex-fill"></div>
            </div>
            <div className="col-lg-8 col-10">
              <div>
                <h3 className="fw-bold">Isi data diri</h3>
                <p>
                  Pasien terlebih dahulu melakukan pendaftaran online melalui
                  tombol "Daftar Antrean" dan mengisi data diri yang lengkap dan
                  valid.
                </p>
              </div>
            </div>
          </div>
          <div className="row gap-2">
            <div className="col-lg-2 col-1 d-flex flex-column align-items-center">
              <p className="fs-2 text-center cara-mendaftar--circle-border m-0">
                2
              </p>
              <div className="cara-mendaftar--vertical-line flex-fill"></div>
            </div>
            <div className="col-lg-8 col-10">
              <div>
                <h3 className="fw-bold">Verifikasi</h3>
                <p>
                  Setelah selesai mendaftar, akan dilakukan verifikasi data diri
                  pasien. Apabila telah berhasil diverifikasi, pasien akan
                  dikirimkan nomor antrean melalui Nomor WhatsApp Aktif yang
                  pasien daftarkan.
                </p>
              </div>
            </div>
          </div>
          <div className="row gap-2">
            <div className="col-lg-2 col-1 d-flex flex-column align-items-center">
              <p className="fs-2 text-center cara-mendaftar--circle-border">
                3
              </p>
            </div>
            <div className="col-lg-8 col-10">
              <div>
                <h3 className="fw-bold">Bawa No. Antrean</h3>
                <p>
                  Pasien harus membawa bukti nomor antrean serta Foto Kopi
                  KK//KIS/BPJS pasien ke puskesmas untuk dilakukan verifikasi
                  ulang bagi pasien yang baru pertama kali mendaftar. Bagi yang
                  sudah mendaftar sebelumnya, cukup membawa nomor antrean saja.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CaraMendaftar;
