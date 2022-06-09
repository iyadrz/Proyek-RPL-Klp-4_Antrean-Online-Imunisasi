import React from "react";
import "./TanyaJawab.css";

function TanyaJawab() {
  return (
    <main className="container-lg tanya-jawab--content d-flex flex-column align-items-center py-5">
      <div className="text-center">
        <h1 className="title fw-bold">Tanya Jawab</h1>
        <h5 className="my-4">
          Berikut beberapa pertanyaan yang sering diajukan terkait sistem
          pendaftaran online imunisasi di Puskesmas Pattingalloang.
        </h5>
      </div>

      <div className="accordion col-12 col-lg-11" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              Jam Operasional Antrean Kapan?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
          >
            <div className="accordion-body">
              Jam operasional antrean imunisasi dimulai setiap hari kamis pukul 08:00 - 11.00 WITA.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Apa Yang Dibawa Pada Saat Ingin Ke Puskesmas?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
          >
            <div className="accordion-body">
              Jika sudah melakukan pendaftaran online, pasien cukup membawa
              bukti Tangkapan Layar nomor antrean yang telah dikirimkan melalui
              Nomor WhatsApp yang didaftarkan serta membawa Fotokopi KIS/BPJS/KK
              jika pasien baru tercatat melakukan Pendaftaran di Puskesmas
              Pattingalloang.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Pada Saat Kapan Saya Ke Puskesmas?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
          >
            <div className="accordion-body">
              Ketika nomor antrean anda sudah dekat dengan nomor antrean pada antrean berikutnya. Anda bisa lihat antrean secara langsung melalui menu "Live Antrean".
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Bagaimana Saya Mendapatkan Nomor Antrean?
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
          >
            <div className="accordion-body">
              Lakukan pendaftaran online di website ini melalui menu “Daftar Antrean”. Pastikan mengisi data
              diri dengan benar.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Berkas Apa Saja Yang Harus Dipersiapkan Ketika Mendaftar Antrean?
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
          >
            <div className="accordion-body">
              Pasien menyiapkan data diri berupa : <br />Nama Lengkap Anak, <br />Nama Ayah
              dan Ibu, <br />Tempat Tanggal Lahir, <br />Nomor Induk Kependudukan (NIK) Anak (Opsional), <br />Alamat
              Email Aktif (Opsional), <br />No. WhatsApp Aktif, <br />Alamat Lengkap
              disertai dengan Kecamatan dan Kelurahan, <br />No. &amp; Jenis Kartu Anak
              (KIS/BPJS), dan <br />Kartu Berobat.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              Bagaimana Jika Saya Belum Mendapatkan Nomor Antrean?
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="headingSix"
          >
            <div className="accordion-body">
              Pastikan Anda telah benar memasukkan no. WhatsApp karena lewat nomor tersebut akan dikirimkan nomor antrean. Jika belum juga mendapatkan nomor antrean, silakan lakukan pendaftaran kembali.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSeven">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSeven"
              aria-expanded="false"
              aria-controls="collapseSeven"
            >
              Pada Usia Berapakah Anak Saya Sudah Boleh Diimunisasi?
            </button>
          </h2>
          <div
            id="collapseSeven"
            className="accordion-collapse collapse"
            aria-labelledby="headingSeven"
          >
            <div className="accordion-body">
              Anak sudah bisa diberikan imunisasi sejak umur &lt; 24 Jam.
            </div>
          </div>
        </div>
        <div className="accordion-item mb-5">
          <h2 className="accordion-header" id="headingEight">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEight"
              aria-expanded="false"
              aria-controls="collapseEight"
            >
              Apakah Anak Saya Masih Bisa Diimunisasi Jika Jadwal Imunisasi
              Tidak Tepat Pada Waktunya?
            </button>
          </h2>
          <div
            id="collapseEight"
            className="accordion-collapse collapse"
            aria-labelledby="headingEight"
          >
            <div className="accordion-body">
              Anak masih bisa diimunisasi sampai pada umur 3 tahun. Akan tetapi,
              pemberian imunisasi untuk jenis HB-0 dan BCG sudah tidak bisa
              diberikan lagi jika anak sudah berumur &lt; 12 Bulan.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TanyaJawab;
