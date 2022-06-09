import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  return (
    <main className="container-lg col-lg-12 col-xl-9 col-xxl-7 home--content">
      <div className="home--banner text-center d-flex flex-column justify-content-lg-end align-items-center mt-3">
        <h1 className="home--banner-title mt-4">
          Selamat datang di website antrean online imunisasi
        </h1>
        <p className="home--banner-text col-10 mt-2">
          Website ini dibuat khusus untuk pendaftaran imunisasi secara online di Puskesmas Pattingalloang.
          Silakan mendaftar dengan mengklik tombol
          "Daftar Antrean" di bawah. Pemberian imunisasi dilaksanakan setiap <u>hari kamis</u> tiap pekannya.
        </p>
        <button
          className="btn button-pasien"
          type="button"
          name="button"
          onClick={() => {
            navigate("/daftar");
          }}
        >
          Daftar Antrean
        </button>
      </div>
      <div className="w-100 my-4 text-center">
        <h4 className="fw-bold mb-3">Jenis Imunisasi yang Tersedia :</h4>
        <table className="col-11 mx-auto">
          <thead>
            <tr>
              <th>Usia Bayi</th>
              <th>Jenis Imunisasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&lt; 24 Jam</td>
              <td>Hepatitis B</td>
            </tr>
            <tr>
              <td>1 - 2 Bulan</td>
              <td>BGC &amp; Oral Polio 1</td>
            </tr>
            <tr>
              <td>2 Bulan</td>
              <td>DPT-HiB-Hib 1 &amp; Oral Polio 2</td>
            </tr>
            <tr>
              <td>3 Bulan</td>
              <td>DPT-HiB-Hib 2 &amp; Oral Polio 3</td>
            </tr>
            <tr>
              <td rowSpan={2}>4 Bulan</td>
              <td>DPT-HiB-Hib 3 &amp; Oral Polio 4</td>
            </tr>
            <tr>
              <td>IPV</td>
            </tr>
            <tr>
              <td>9 Bulan</td>
              <td>MR</td>
            </tr>
            <tr>
              <td rowSpan={2}>18 Bulan</td>
              <td>MR Lanjutan</td>
            </tr>
            <tr>
              <td>DPT-HiB-Hib Lanjutan</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Home;
