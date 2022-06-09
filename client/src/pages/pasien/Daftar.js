import { useState } from "react";
import "./Daftar.css";
import Axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function Daftar() {
  const [kecamatanLainnya, setKecamatanLainnya] = useState(false);

  const validationSchema = Yup.object().shape({
    namaAnak: Yup.string().required("Harus diisi"),
    namaAyah: Yup.string().required("Harus diisi"),
    namaIbu: Yup.string().required("Harus diisi"),
    tanggalLahir: Yup.date().required("Harus memilih"),
    nik: Yup.number()
      .positive("NIK tidak valid")
      .integer()
      .typeError("NIK tidak valid"),
    nomorTelepon: Yup.number()
      .required("Harus diisi")
      .positive("Nomor tidak valid")
      .integer()
      .typeError("Nomor tidak valid"),
    email: Yup.string().email("Format email tidak valid"),
    alamat: Yup.string().required("Harus diisi"),
    kecamatan: Yup.string().required("Harus memilih"),
    kelurahan: Yup.string().when("kecamatan", {
      is: (kecamatan) => kecamatan === "LAINNYA",
      then: Yup.string(),
      otherwise: Yup.string().required("Harus memilih"),
    }),
    kecamatanIsiSendiri: Yup.string().required("Harus diisi"),
    kelurahanIsiSendiri: Yup.string().required("Harus diisi"),
    jenisKartu: Yup.string().required("Harus memilih"),
    nomorKartu: Yup.number().when("jenisKartu", {
      is: (jenisKartu) => jenisKartu === "KIS / BPJS",
      then: Yup.number()
        .required("Harus diisi")
        .positive("Nomor tidak valid")
        .integer()
        .typeError("Nomor tidak valid"),
      otherwise: Yup.number()
        .positive("Nomor tidak valid")
        .integer()
        .typeError("Nomor tidak valid"),
    }),
    nomorKartuBerobat: Yup.number()
      .positive("Nomor tidak valid")
      .integer()
      .typeError("Nomor tidak valid"),
    jenisImunisasi: Yup.string().required("Harus memilih"),
    jadwal: Yup.string().required("Harus memilih"),
  });

  const formik = useFormik({
    initialValues: {
      tanggalLahir: "",
      namaAyah: "",
      namaIbu: "",
      namaAnak: "",
      nik: "",
      nomorTelepon: "",
      email: "",
      alamat: "",
      kecamatan: "",
      kelurahan: "",
      kecamatanIsiSendiri: "",
      kelurahanIsiSendiri: "",
      jenisKartu: "",
      nomorKartu: "",
      nomorKartuBerobat: "",
      jenisImunisasi: "",
      jadwal: "",
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    // onSubmit: (data) => {
    //   console.log(JSON.stringify(data, null, 2));
    // },
  });

  const submitBiodata = () => {
    Axios.post("http://168.138.180.185:3000/api/biodata/", {
    // Axios.post("http://localhost:8080/api/biodata/", {
      tanggal_lahir: formik.values.tanggalLahir,
      nama_ayah: formik.values.namaAyah,
      nama_ibu: formik.values.namaIbu,
      nama_anak: formik.values.namaAnak,
      nik: formik.values.nik,
      nomor_telepon: formik.values.nomorTelepon,
      email: formik.values.email,
      alamat: formik.values.alamat,
      kecamatan: kecamatanLainnya
        ? formik.values.kecamatanIsiSendiri
        : formik.values.kecamatan,
      kelurahan: kecamatanLainnya
        ? formik.values.kelurahanIsiSendiri
        : formik.values.kelurahan,
      jenis_kartu: formik.values.jenisKartu,
      nomor_kartu: formik.values.nomorKartu,
      nomor_kartu_berobat: formik.values.nomorKartuBerobat,
      jenis_imunisasi: formik.values.jenisImunisasi,
      jadwal: formik.values.jadwal,
    });
    // .then((response) => {
    //   console.log(response);
    // });
  };

  const pilihKecamatan = (event) => {
    event.preventDefault();
    formik.setFieldValue("kecamatan", event.target.value);
    event.target.value === "LAINNYA"
      ? setKecamatanLainnya(true)
      : setKecamatanLainnya(false);
  };

  const pilihKelurahan = (event) => {
    event.preventDefault();
    formik.setFieldValue("kelurahan", event.target.value);
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
    <main className="container-lg col-md-7 col-lg-4 col-xl-4 col-xxl-3 py-5">
      <h1 className="text-center fw-bold">Daftar Antrian</h1>
      <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <div className="my-3">
            <label htmlFor="namaAnak" className="form-label">
              Nama Anak
            </label>
            <input
              name="namaAnak"
              type="text"
              id="nama-anak"
              className={
                !formik.errors.namaAnak
                  ? "form-control form-pasien"
                  : "form-control form-pasien border-danger"
              }
              autocomplete="off"
              placeholder="Nama Anak"
              onChange={formik.handleChange}
              value={formik.values.namaAnak}
            />
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.namaAnak ? formik.errors.namaAnak : null}
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-6">
              <label htmlFor="namaAyah" className="form-label">
                Nama Ayah
              </label>
              <input
                name="namaAyah"
                type="text"
                id="nama-ayah"
                className={
                  !formik.errors.namaAyah
                    ? "form-control form-pasien"
                    : "form-control form-pasien border-danger"
                }
                autocomplete="off"
                placeholder="Nama Ayah"
                onChange={formik.handleChange}
                value={formik.values.namaAyah}
              />
              <div className="text-danger mt-1 ms-1 small-font">
                {formik.errors.namaAyah ? formik.errors.namaAyah : null}
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="namaIbu" className="form-label">
                Nama Ibu
              </label>
              <input
                name="namaIbu"
                type="text"
                id="nama-ibu"
                className={
                  !formik.errors.namaIbu
                    ? "form-control form-pasien"
                    : "form-control form-pasien border-danger"
                }
                autocomplete="off"
                placeholder="Nama Ibu"
                onChange={formik.handleChange}
                value={formik.values.namaIbu}
              />
              <div className="text-danger mt-1 ms-1 small-font">
                {formik.errors.namaIbu ? formik.errors.namaIbu : null}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="tanggalLahir" className="form-label">
              Tanggal Lahir
            </label>
            <input
              name="tanggalLahir"
              type="date"
              id="tanggal-lahir"
              className={
                !formik.errors.tanggalLahir
                  ? "form-control form-pasien"
                  : "form-control form-pasien border-danger"
              }
              onChange={formik.handleChange}
              value={formik.values.tanggalLahir}
            />
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.tanggalLahir ? formik.errors.tanggalLahir : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="nik" className="form-label">
              Nomor Induk Kependudukan Anak (Opsional)
            </label>
            <input
              name="nik"
              type="text"
              id="nik"
              className="form-control form-pasien"
              autocomplete="off"
              placeholder="NIK"
              onChange={formik.handleChange}
              value={formik.values.nik}
            />
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.nik ? formik.errors.nik : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="nomorTelepon" className="form-label">
              Nomor WhatsApp (Contoh: 081234567890)
            </label>
            <input
              name="nomorTelepon"
              type="text"
              id="nomor-telepon"
              className={
                !formik.errors.nomorTelepon
                  ? "form-control form-pasien"
                  : "form-control form-pasien border-danger"
              }
              autocomplete="off"
              placeholder="No. HP"
              onChange={formik.handleChange}
              value={formik.values.nomorTelepon}
            />
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.nomorTelepon ? formik.errors.nomorTelepon : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Alamat Email (Opsional)
            </label>
            <input
              name="email"
              type="text"
              id="email"
              className="form-control form-pasien"
              autocomplete="off"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.email ? formik.errors.email : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">
              Alamat Lengkap
            </label>
            <input
              name="alamat"
              type="text"
              id="alamat"
              className={
                !formik.errors.alamat
                  ? "form-control form-pasien"
                  : "form-control form-pasien border-danger"
              }
              autocomplete="off"
              placeholder="Alamat"
              onChange={formik.handleChange}
              value={formik.values.alamat}
            />
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.alamat ? formik.errors.alamat : null}
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-6">
              <select
                className={
                  !formik.errors.kecamatan
                    ? "form-select form-pasien"
                    : "form-select form-pasien border-danger"
                }
                name="kecamatan"
                id="kecamatan"
                onChange={pilihKecamatan}
                value={formik.values.kecamatan}
              >
                <option value="" disabled selected hidden>
                  Kecamatan
                </option>
                <option value="UJUNG TANAH">UJUNG TANAH</option>
                <option value="LAINNYA">LAINNYA</option>
              </select>
              <div className="text-danger mt-1 ms-1 small-font">
                {formik.errors.kecamatan ? formik.errors.kecamatan : null}
              </div>
            </div>
            <div className="col-6">
              <select
                className={
                  !formik.errors.kelurahan
                    ? "form-select form-pasien"
                    : "form-select form-pasien border-danger"
                }
                name="kelurahan"
                id="kelurahan"
                onChange={pilihKelurahan}
                value={formik.values.kelurahan}
                disabled={kecamatanLainnya && "disabled"}
              >
                <option value="" disabled selected hidden>
                  Kelurahan
                </option>
                <option value="CAMBA BERUA">CAMBA BERUA</option>
                <option value="CAMBAYYA">CAMBAYYA</option>
                <option value="GUSUNG">GUSUNG</option>
                <option value="PATTINGALLOANG">PATTINGALLOANG</option>
                <option value="PATTINGALLOANG BARU">PATTINGALLOANG BARU</option>
                <option value="TABARINGAN">TABARINGAN</option>
                <option value="TAMALABBA">TAMALABBA</option>
                <option value="TOTAKA">TOTAKA</option>
                <option value="UJUNG TANAH">UJUNG TANAH</option>
              </select>
              <div className="text-danger mt-1 ms-1 small-font">
                {formik.errors.kelurahan ? formik.errors.kelurahan : null}
              </div>
            </div>
          </div>
          {kecamatanLainnya && (
            <div className="mb-3 row">
              <div className="col-6">
                <input
                  name="kecamatanIsiSendiri"
                  type="text"
                  id="kecamatan-isi-sendiri"
                  className={
                    !formik.errors.kecamatanIsiSendiri
                      ? "form-control form-pasien"
                      : "form-control form-pasien border-danger"
                  }
                  autocomplete="off"
                  placeholder="Isi Kecamatan"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "kecamatanIsiSendiri",
                      e.target.value.toUpperCase()
                    )
                  }
                  value={formik.values.kecamatanIsiSendiri}
                />
                <div className="text-danger mt-1 ms-1 small-font">
                  {formik.errors.kecamatanIsiSendiri
                    ? formik.errors.kecamatanIsiSendiri
                    : null}
                </div>
              </div>
              <div className="col-6">
                <input
                  name="kelurahanIsiSendiri"
                  type="text"
                  id="kelurahan-isi-sendiri"
                  className={
                    !formik.errors.kelurahanIsiSendiri
                      ? "form-control form-pasien"
                      : "form-control form-pasien border-danger"
                  }
                  autocomplete="off"
                  placeholder="Isi Kelurahan"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "kelurahanIsiSendiri",
                      e.target.value.toUpperCase()
                    )
                  }
                  value={formik.values.kelurahanIsiSendiri}
                />
                <div className="text-danger mt-1 ms-1 small-font">
                  {formik.errors.kelurahanIsiSendiri
                    ? formik.errors.kelurahanIsiSendiri
                    : null}
                </div>
              </div>
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="jenisKartu" className="form-label">
              Pilih Jenis Kartu
            </label>
            <select
              className={
                !formik.errors.jenisKartu
                  ? "form-select form-pasien"
                  : "form-select form-pasien border-danger"
              }
              name="jenisKartu"
              id="jenis-kartu"
              onChange={(e) =>
                formik.setFieldValue("jenisKartu", e.target.value)
              }
              value={formik.values.jenisKartu}
            >
              <option value="" disabled selected hidden>
                Pilih Kartu
              </option>
              <option value="KIS / BPJS">KIS / BPJS</option>
              <option value="Tidak Ada">Tidak Ada</option>
            </select>
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.jenisKartu ? formik.errors.jenisKartu : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="nomorKartu" className="form-label">
              Nomor Kartu
            </label>
            <input
              name="nomorKartu"
              type="text"
              id="nomor-kartu"
              className={
                !formik.errors.nomorKartu
                  ? "form-control form-pasien"
                  : "form-control form-pasien border-danger"
              }
              autocomplete="off"
              placeholder="Nomor Kartu"
              onChange={formik.handleChange}
              value={formik.values.nomorKartu}
              disabled={formik.values.jenisKartu === "Tidak Ada" && "disabled"}
            />
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.nomorKartu ? formik.errors.nomorKartu : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="nomorKartuBerobat" className="form-label">
              Nomor Kartu Berobat (Kalau Ada)
            </label>
            <input
              name="nomorKartuBerobat"
              type="text"
              id="nomor-kartu-berobat"
              className="form-control form-pasien"
              autocomplete="off"
              placeholder="Nomor Kartu Berobat"
              onChange={formik.handleChange}
              value={formik.values.nomorKartuBerobat}
            />
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.nomorKartuBerobat
                ? formik.errors.nomorKartuBerobat
                : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="jenisImunisasi" className="form-label">
              Jenis Imunisasi
            </label>
            <select
              className={
                !formik.errors.jenisImunisasi
                  ? "form-select form-pasien"
                  : "form-select form-pasien border-danger"
              }
              name="jenisImunisasi"
              id="jenis-imunisasi"
              onChange={(e) =>
                formik.setFieldValue("jenisImunisasi", e.target.value)
              }
              value={formik.values.jenisImunisasi}
            >
              <option value="" disabled selected hidden>
                Pilih Imunisasi
              </option>
              <option value="Hepatitis B (Usia < 24 Jam)">
                Hepatitis B (Usia &lt; 24 Jam)
              </option>
              <option value="BCG &amp; Oral Polio 1 (Usia 1-2 Bulan)">
                BCG &amp; Oral Polio 1 (Usia 1-2 Bulan)
              </option>
              <option value="DPT-HiB-Hib 1 &amp; Oral Polio 2 (Usia 2 Bulan)">
                DPT-HiB-Hib 1 &amp; Oral Polio 2 (Usia 2 Bulan)
              </option>
              <option value="DPT-HiB-Hib 2 &amp; Oral Polio 3 (Usia 3 Bulan)">
                DPT-HiB-Hib 2 &amp; Oral Polio 3 (Usia 3 Bulan)
              </option>
              <option value="DPT-HiB-Hib 3 &amp; Oral Polio 4 (Usia 4 Bulan)">
                DPT-HiB-Hib 3 &amp; Oral Polio 4 (Usia 4 Bulan)
              </option>
              <option value="IPV (Usia 4 Bulan)">IPV (Usia 4 Bulan)</option>
              <option value="MR (Usia 9 Bulan)">MR (Usia 9 Bulan)</option>
              <option value="MR Lanjutan (Usia 18 Bulan)">
                MR Lanjutan (Usia 18 Bulan)
              </option>
              <option value="DPT-HiB-Hib Lanjutan (Usia 18 Bulan)">
                DPT-HiB-Hib Lanjutan (Usia 18 Bulan)
              </option>
            </select>
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.jenisImunisasi
                ? formik.errors.jenisImunisasi
                : null}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="jadwal" className="form-label">
              Pilih Jadwal
            </label>
            <select
              className={
                !formik.errors.jadwal
                  ? "form-select form-pasien"
                  : "form-select form-pasien border-danger"
              }
              name="jadwal"
              id="pilih-jadwal"
              onChange={(e) => formik.setFieldValue("jadwal", e.target.value)}
            >
              <option value="" disabled selected hidden>
                Pilih Jadwal
              </option>
              {thursday.map((e) => (
                <option value={e}>{tanggal(e)}</option>
              ))}
            </select>
            <div className="text-danger mt-1 ms-1 small-font">
              {formik.errors.jadwal ? formik.errors.jadwal : null}
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              className="btn btn-lg button-pasien w-100"
              data-bs-toggle={
                formik.values.kecamatan === "UJUNG TANAH"
                  ? formik.values.jenisKartu === "KIS / BPJS"
                    ? formik.values.tanggalLahir &&
                      formik.values.namaAyah &&
                      formik.values.namaIbu &&
                      formik.values.namaAnak &&
                      formik.values.nomorTelepon &&
                      formik.values.alamat &&
                      formik.values.kecamatan &&
                      formik.values.kelurahan &&
                      formik.values.jenisKartu &&
                      formik.values.nomorKartu &&
                      formik.values.jenisImunisasi &&
                      formik.values.jadwal &&
                      "modal"
                    : formik.values.tanggalLahir &&
                      formik.values.namaAyah &&
                      formik.values.namaIbu &&
                      formik.values.namaAnak &&
                      formik.values.nomorTelepon &&
                      formik.values.alamat &&
                      formik.values.kecamatan &&
                      formik.values.kelurahan &&
                      formik.values.jenisKartu &&
                      formik.values.jenisImunisasi &&
                      formik.values.jadwal &&
                      "modal"
                  : formik.values.jenisKartu === "KIS / BPJS"
                  ? formik.values.tanggalLahir &&
                    formik.values.namaAyah &&
                    formik.values.namaIbu &&
                    formik.values.namaAnak &&
                    formik.values.nomorTelepon &&
                    formik.values.alamat &&
                    formik.values.kecamatan &&
                    formik.values.kecamatanIsiSendiri &&
                    formik.values.kelurahanIsiSendiri &&
                    formik.values.jenisKartu &&
                    formik.values.nomorKartu &&
                    formik.values.jenisImunisasi &&
                    formik.values.jadwal &&
                    "modal"
                  : formik.values.tanggalLahir &&
                    formik.values.namaAyah &&
                    formik.values.namaIbu &&
                    formik.values.namaAnak &&
                    formik.values.nomorTelepon &&
                    formik.values.alamat &&
                    formik.values.kecamatan &&
                    formik.values.kecamatanIsiSendiri &&
                    formik.values.kelurahanIsiSendiri &&
                    formik.values.jenisKartu &&
                    formik.values.jenisImunisasi &&
                    formik.values.jadwal &&
                    "modal"
              }
              data-bs-target="#exampleModalToggle"
            >
              Daftar
            </button>
          </div>
        </fieldset>
      </form>

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
                className="modal-title fw-bold"
                id="exampleModalToggleLabel"
              >
                DATA PASIEN
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body data-pasien">
              <p>
                <span className="left">Nama Anak</span>:
                <span className="right">
                  {formik.values.namaAnak}
                </span>
              </p>
              <p>
                <span className="left">Nama Ayah</span>:
                <span className="right">{formik.values.namaAyah}</span>
              </p>
              <p>
                <span className="left">Nama Ibu</span>:
                <span className="right">{formik.values.namaIbu}</span>
              </p>
              <p>
                <span className="left">Tanggal Lahir</span>:
                <span className="right">{tanggal(formik.values.tanggalLahir)}</span>
              </p>
              <p>
                <span className="left">NIK</span>:
                <span className="right">
                  {formik.values.nik ? formik.values.nik : "-"}
                </span>
              </p>
              <p>
                <span className="left">No. HP</span>:
                <span className="right">{formik.values.nomorTelepon}</span>
              </p>
              <p>
                <span className="left">Alamat Email</span>:
                <span className="right">
                  {formik.values.email ? formik.values.email : "-"}
                </span>
              </p>
              <p>
                <span className="left">Alamat</span>:
                <span className="right">{formik.values.alamat}</span>
              </p>
              <p>
                <span className="left">Kecamatan</span>:
                <span className="right">
                  {kecamatanLainnya
                    ? formik.values.kecamatanIsiSendiri
                    : formik.values.kecamatan}
                </span>
              </p>
              <p>
                <span className="left">Kelurahan</span>:
                <span className="right">
                  {kecamatanLainnya
                    ? formik.values.kelurahanIsiSendiri
                    : formik.values.kelurahan}
                </span>
              </p>
              <p>
                <span className="left">Jenis Kartu</span>:
                <span className="right">{formik.values.jenisKartu}</span>
              </p>
              <p>
                <span className="left">No. Kartu</span>:
                <span className="right">
                  {formik.values.nomorKartu ? formik.values.nomorKartu : "-"}
                </span>
              </p>
              <p>
                <span className="left">No. Kartu Berobat</span>:
                <span className="right">
                  {formik.values.nomorKartuBerobat
                    ? formik.values.nomorKartuBerobat
                    : "-"}
                </span>
              </p>
              <p>
                <span className="left">Jenis Imunisasi</span>:
                <span className="right">{formik.values.jenisImunisasi}</span>
              </p>
              <p>
                <span className="left">Jadwal</span>:
                <span className="right">{`Kamis, ${tanggal(
                  formik.values.jadwal
                )}`}</span>
              </p>
            </div>
            <div className="modal-footer d-flex flex-column align-items-center">
              <p>Apakah data di atas sudah lengkap dan valid?</p>
              <div className="button-konfirmasi">
                <button
                  className="btn btn-primary me-4"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  onClick={submitBiodata}
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
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                Info
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Data Anda siap diverifikasi! Informasi selanjutnya akan diinfokan
              ke nomor WhatsApp atau email Anda.
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-bs-dismiss="modal">
                OK!
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Daftar;
