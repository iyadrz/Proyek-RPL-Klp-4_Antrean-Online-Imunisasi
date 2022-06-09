import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import "./TestItem.scss";

function TesItem(props) {
  const axiosPrivate = useAxiosPrivate();
  const [estimasiMenit, setEstimasiMenit] = useState("");
  const [estimasiDetik, setEstimasiDetik] = useState("");

  const setBerhasil = (id) => (event) => {
    axiosPrivate
      .patch(props.baseURL + id, {
        selesai: true,
        berhasil_dilayani: true,
        urutan_pelayanan: 0,
        urutan_selesai: props.selesai_terakhir + 1,
        dipanggil: false,
      })
      .catch((error) => console.log(error));
    props.counter--;
  };

  const add_minutes = (dt, minutes, seconds) => {
    return new Date(dt.getTime() + minutes * 60000 + (seconds + 2) * 1000);
  };

  function setEstimasi(id, menit, detik) {
    menit = menit ? menit : "00";
    detik = detik ? detik : "00";
    let est = add_minutes(new Date(), parseInt(menit), parseInt(detik));
    axiosPrivate
      .patch(props.baseURL + id, {
        dipanggil: true,
        estimasi: est,
      })
      .catch((error) => console.log(error));
  }

  const handleEstimasi = (id, menit, detik) => (event) => {
    setEstimasi(id, menit, detik);
  };

  const setTunda = (id, id_setelah, tunda) => (event) => {
    if (tunda === 1) {
      axiosPrivate
        .patch(props.baseURL + id, {
          dipanggil: false,
          estimasi: null,
          tunda: tunda,
          urutan_pelayanan:
            props.bio.urutan_pelayanan < props.nomor_terakhir
              ? props.bio.urutan_pelayanan + 1
              : props.bio.urutan_pelayanan,
        })
        .catch((error) => console.log(error));
      if (props.bio.urutan_pelayanan < props.nomor_terakhir) {
        axiosPrivate
          .patch(props.baseURL + id_setelah, {
            urutan_pelayanan: props.bio.urutan_pelayanan,
          })
          .catch((error) => console.log(error));
      }
    } else {
      axiosPrivate
        .patch(props.baseURL + id, {
          dipanggil: false,
          estimasi: null,
          tunda: tunda,
          urutan_pelayanan: 0,
          nonaktif: true,
        })
        .catch((error) => console.log(error));
    }
    setEstimasiDetik("00");
    setEstimasiMenit("00");
  };

  const setAktifkan = () => {
    axiosPrivate
      .patch(props.baseURL + props.bio.id, {
        nonaktif: false,
        urutan_pelayanan: props.nomor_terakhir + 1,
      })
      .catch((error) => console.log(error));
  };

  function tanggal(tggl, hideTime = false) {
    if (hideTime) {
      let temp = new Date(tggl)
        .toLocaleString("id-ID", {
          timeZone: "Asia/Makassar",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .split(" ");
      return `${temp[0]} ${temp[1]} ${temp[2]}`;
    } else {
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
        .replaceAll(".", ":")
        .split(" ");
      return `${temp[3]}, ${temp[0]} ${temp[1]} ${temp[2]}`;
    }
  }

  const est1 = Array.from({ length: 59 }, (_, index) => index + 1);
  const est = est1.map((value) => {
    if (value < 10) return "0" + value;
    else return value;
  });

  const id_setelah = props.id_setelah[props.counter - 1]
    ? props.id_setelah[props.counter - 1]
    : null;

  return (
    <div>
      <div
        className={
          props.bio.tunda === 1
            ? "p-3 antrian-item d-flex flex-column bg-kuning"
            : props.bio.tunda === 2
            ? "p-3 antrian-item d-flex flex-column bg-merah"
            : "p-3 antrian-item d-flex flex-column"
        }
      >
        <div
          className={
            props.bio.tunda === 1
              ? "d-flex gap-3 mb-0 antrian-item bg-kuning"
              : props.bio.tunda === 2
              ? "d-flex gap-3 mb-0 antrian-item bg-merah"
              : "d-flex gap-3 mb-0 antrian-item"
          }
        >
          <p>{props.counter}.</p>
          <div className="row flex-fill">
            <ul className="col-12 col-md list-unstyled mb-1">
              <li className="info-singkat">
                <p className="mb-2">
                  <span className="left">Nama Anak</span>:
                  <span className="right">{props.bio.nama_anak}</span>
                </p>
                <p className="mb-2">
                  <span className="left">Jenis Kartu</span>:
                  <span className="right">{props.bio.jenis_kartu}</span>
                </p>
                <p className="mb-2">
                  <span className="left">No. Kartu</span>:
                  <span className="right">{props.bio.nomor_kartu}</span>
                </p>
                <p className="mb-2">
                  <span className="left">Jenis Imunisasi</span>:
                  <span className="right">{props.bio.jenis_imunisasi}</span>
                </p>
                <p className="mb-2">
                  <span className="left">Jadwal</span>:
                  <span className="right">{`Kamis, ${tanggal(
                    props.bio.jadwal,
                    true
                  )}`}</span>
                </p>
                <p className="mb-0">
                  <span className="left">No. Antrean</span>:
                  <span className="right">{props.bio.nomor_antrean}</span>
                </p>
              </li>
            </ul>
            <div className="col-12 col-md-4 col-lg-5 col-xl-6 d-flex">
              <ul className="list-unstyled d-flex gap-2 flex-fill flex-wrap justify-content-md-end justify-content-start h-50">
                {props.menu === "atur" ? (
                  props.bio.dipanggil ? (
                    <>
                      <li>
                        <button
                          className="btn rounded-pill btn-success"
                          type="button"
                          name="button"
                          id="tombol-selesai"
                          data-bs-toggle="modal"
                          data-bs-target={`#modalSelesai${props.counter}`}
                        >
                          Selesai
                        </button>
                      </li>
                      <div
                        className="modal fade"
                        id={`modalSelesai${props.counter}`}
                        aria-hidden="true"
                        aria-labelledby="modalSelesaiLabel"
                        tabindex="-1"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title mx-auto fw-bold"
                                id="exampleModalToggleLabel"
                              >
                                Selesaikan antrean ini ?
                              </h5>
                            </div>
                            <div className="modal-footer d-flex flex-column align-items-center">
                              <div className="button-konfirmasi">
                                <button
                                  className="btn btn-primary me-3"
                                  data-bs-dismiss="modal"
                                  onClick={setBerhasil(props.bio.id)}
                                >
                                  Ya
                                </button>
                                <button
                                  className="btn btn-danger"
                                  data-bs-dismiss="modal"
                                >
                                  Tidak
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <li>
                        <button
                          className="btn rounded-pill btn-danger"
                          type="button"
                          name="button"
                          id="tombol-tunda2"
                          data-bs-toggle="modal"
                          data-bs-target={`#modalTunda2${props.counter}`}
                        >
                          Tunda 2x
                        </button>
                      </li>
                      <div
                        className="modal fade"
                        id={`modalTunda2${props.counter}`}
                        aria-hidden="true"
                        aria-labelledby="modalTunda2Label"
                        tabindex="-1"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title mx-auto fw-bold"
                                id="exampleModalToggleLabel"
                              >
                                Tunda 2x antrean ?
                              </h5>
                            </div>
                            <div className="modal-footer d-flex flex-column align-items-center">
                              <div className="button-konfirmasi">
                                <button
                                  className="btn btn-primary me-3"
                                  data-bs-dismiss="modal"
                                  onClick={setTunda(
                                    props.bio.id,
                                    id_setelah,
                                    2
                                  )}
                                >
                                  Ya
                                </button>
                                <button
                                  className="btn btn-danger"
                                  data-bs-dismiss="modal"
                                >
                                  Tidak
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <li>
                        <button
                          className="btn rounded-pill btn-warning"
                          type="button"
                          name="button"
                          id="tombol-tunda1"
                          data-bs-toggle="modal"
                          data-bs-target={`#modalTunda1${props.counter}`}
                          disabled={props.bio.tunda === 1 && "disabled"}
                        >
                          Tunda 1x
                        </button>
                      </li>
                      <div
                        className="modal fade"
                        id={`modalTunda1${props.counter}`}
                        aria-hidden="true"
                        aria-labelledby="modalTunda1Label"
                        tabindex="-1"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title mx-auto fw-bold"
                                id="exampleModalToggleLabel"
                              >
                                Tunda 1x antrean ?
                              </h5>
                            </div>
                            <div className="modal-footer d-flex flex-column align-items-center">
                              <div className="button-konfirmasi">
                                <button
                                  className="btn btn-primary me-3"
                                  data-bs-dismiss="modal"
                                  onClick={setTunda(
                                    props.bio.id,
                                    id_setelah,
                                    1
                                  )}
                                >
                                  Ya
                                </button>
                                <button
                                  className="btn btn-danger"
                                  data-bs-dismiss="modal"
                                >
                                  Tidak
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <li>
                        <button
                          className="btn rounded-pill btn-primary"
                          type="button"
                          name="button"
                          id="tombol-ubah"
                          data-bs-toggle="modal"
                          data-bs-target={`#modalUbah${props.counter}`}
                        >
                          Ubah
                        </button>
                      </li>
                      <div
                        className="modal fade"
                        id={`modalUbah${props.counter}`}
                        aria-hidden="true"
                        aria-labelledby="modalUbahLabel"
                        tabindex="-1"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            {
                              <div className="modal-header">
                                <h5
                                  className="modal-title mx-auto fw-bold"
                                  id="exampleModalToggleLabel"
                                >
                                  Ubah Estimasi Antrean
                                </h5>
                              </div>
                            }
                            <div className="modal-body">
                              <div className="data-pasien d-flex align-items-center justify-content-center gap-1">
                                <select
                                  className="estimasi"
                                  name="menit"
                                  id="menit"
                                  onChange={(e) =>
                                    setEstimasiMenit(e.target.value)
                                  }
                                  value={estimasiMenit}
                                >
                                  <option value="00" selected>
                                    00
                                  </option>
                                  {est.map((value) => {
                                    return (
                                      <option value={value}>{value}</option>
                                    );
                                  })}
                                </select>
                                <span className="fs-1 pb-1">:</span>
                                <select
                                  className="estimasi"
                                  name="detik"
                                  id="detik"
                                  onChange={(e) =>
                                    setEstimasiDetik(e.target.value)
                                  }
                                  value={estimasiDetik}
                                >
                                  <option value="00" selected>
                                    00
                                  </option>
                                  {est.map((value) => {
                                    return (
                                      <option value={value}>{value}</option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="mt-3">
                                <hr />
                                <div className="d-flex justify-content-center gap-4">
                                  <button
                                    className="btn btn-primary"
                                    data-bs-dismiss={
                                      (estimasiMenit || estimasiDetik) &&
                                      !(
                                        estimasiMenit === "00" &&
                                        estimasiDetik === "00"
                                      ) &&
                                      "modal"
                                    }
                                    onClick={
                                      (estimasiMenit || estimasiDetik) &&
                                      !(
                                        estimasiMenit === "00" &&
                                        estimasiDetik === "00"
                                      ) &&
                                      handleEstimasi(
                                        props.bio.id,
                                        estimasiMenit,
                                        estimasiDetik
                                      )
                                    }
                                  >
                                    OK
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                  >
                                    Batal
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : props.bio.tunda === 1 ? (
                    <>
                      <li>
                        <button
                          className="btn rounded-pill btn-success"
                          type="button"
                          name="button"
                          id="tombol-panggil"
                          data-bs-toggle="modal"
                          data-bs-target={`#modalPanggil${props.counter}`}
                          disabled={
                            (props.ada_dipanggil ||
                              new Date(props.bio.jadwal).setHours(
                                0,
                                0,
                                0,
                                0
                              ) !== new Date().setHours(0, 0, 0, 0)) &&
                            "disabled"
                          }
                        >
                          Panggil
                        </button>
                      </li>
                      <div
                        className="modal fade"
                        id={`modalPanggil${props.counter}`}
                        aria-hidden="true"
                        aria-labelledby="modalPanggilLabel"
                        tabindex="-1"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title mx-auto fw-bold"
                                id="exampleModalToggleLabel"
                              >
                                Tetapkan Estimasi Antrean
                              </h5>
                            </div>
                            <div className="modal-body">
                              <div className="data-pasien d-flex align-items-center justify-content-center gap-1">
                                <select
                                  className="estimasi"
                                  name="menit"
                                  id="menit"
                                  onChange={(e) =>
                                    setEstimasiMenit(e.target.value)
                                  }
                                  value={estimasiMenit}
                                >
                                  <option value="00" selected>
                                    00
                                  </option>
                                  {est.map((value) => {
                                    return (
                                      <option value={value}>{value}</option>
                                    );
                                  })}
                                </select>
                                <span className="fs-1 pb-1">:</span>
                                <select
                                  className="estimasi"
                                  name="detik"
                                  id="detik"
                                  onChange={(e) =>
                                    setEstimasiDetik(e.target.value)
                                  }
                                  value={estimasiDetik}
                                >
                                  <option value="00" selected>
                                    00
                                  </option>
                                  {est.map((value) => {
                                    return (
                                      <option value={value}>{value}</option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="mt-3">
                                <hr />
                                <div className="d-flex justify-content-center gap-4">
                                  <button
                                    className="btn btn-primary"
                                    data-bs-dismiss={
                                      (estimasiMenit || estimasiDetik) &&
                                      !(
                                        estimasiMenit === "00" &&
                                        estimasiDetik === "00"
                                      ) &&
                                      "modal"
                                    }
                                    onClick={
                                      (estimasiMenit || estimasiDetik) &&
                                      !(
                                        estimasiMenit === "00" &&
                                        estimasiDetik === "00"
                                      ) &&
                                      handleEstimasi(
                                        props.bio.id,
                                        estimasiMenit,
                                        estimasiDetik
                                      )
                                    }
                                  >
                                    OK
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                  >
                                    Batal
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : props.bio.tunda === 2 ? (
                    <>
                      <li>
                        <button
                          className="btn rounded-pill btn-success"
                          type="button"
                          name="button"
                          id="tombol-panggil"
                          data-bs-toggle="modal"
                          data-bs-target={`#modalPanggil${props.counter}`}
                          disabled={
                            (props.bio.nonaktif ||
                              props.ada_dipanggil ||
                              new Date(props.bio.jadwal).setHours(
                                0,
                                0,
                                0,
                                0
                              ) !== new Date().setHours(0, 0, 0, 0)) &&
                            "disabled"
                          }
                        >
                          Panggil
                        </button>
                      </li>
                      <div
                        className="modal fade"
                        id={`modalPanggil${props.counter}`}
                        aria-hidden="true"
                        aria-labelledby="modalPanggilLabel"
                        tabindex="-1"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            {
                              <div className="modal-header">
                                <h5
                                  className="modal-title mx-auto fw-bold"
                                  id="exampleModalToggleLabel"
                                >
                                  Tetapkan Estimasi Antrean
                                </h5>
                              </div>
                            }
                            <div className="modal-body">
                              <div className="data-pasien d-flex align-items-center justify-content-center gap-1">
                                <select
                                  className="estimasi"
                                  name="menit"
                                  id="menit"
                                  onChange={(e) =>
                                    setEstimasiMenit(e.target.value)
                                  }
                                  value={estimasiMenit}
                                >
                                  <option value="00" selected>
                                    00
                                  </option>
                                  {est.map((value) => {
                                    return (
                                      <option value={value}>{value}</option>
                                    );
                                  })}
                                </select>
                                <span className="fs-1 pb-1">:</span>
                                <select
                                  className="estimasi"
                                  name="detik"
                                  id="detik"
                                  onChange={(e) =>
                                    setEstimasiDetik(e.target.value)
                                  }
                                  value={estimasiDetik}
                                >
                                  <option value="00" selected>
                                    00
                                  </option>
                                  {est.map((value) => {
                                    return (
                                      <option value={value}>{value}</option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="mt-3">
                                <hr />
                                <div className="d-flex justify-content-center gap-4">
                                  <button
                                    className="btn btn-primary"
                                    data-bs-dismiss={
                                      (estimasiMenit || estimasiDetik) &&
                                      !(
                                        estimasiMenit === "00" &&
                                        estimasiDetik === "00"
                                      ) &&
                                      "modal"
                                    }
                                    onClick={
                                      (estimasiMenit || estimasiDetik) &&
                                      !(
                                        estimasiMenit === "00" &&
                                        estimasiDetik === "00"
                                      ) &&
                                      handleEstimasi(
                                        props.bio.id,
                                        estimasiMenit,
                                        estimasiDetik
                                      )
                                    }
                                  >
                                    OK
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                  >
                                    Batal
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <li>
                        <button
                          className="btn rounded-pill btn-primary"
                          type="button"
                          name="button"
                          id="tombol-aktifkan"
                          data-bs-toggle="modal"
                          data-bs-target={`#modalAktifkan${props.counter}`}
                          disabled={!props.bio.nonaktif && "disabled"}
                        >
                          Aktifkan
                        </button>
                      </li>
                      <div
                        className="modal fade"
                        id={`modalAktifkan${props.counter}`}
                        aria-hidden="true"
                        aria-labelledby="modalAktifkanLabel"
                        tabindex="-1"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title mx-auto fw-bold"
                                id="exampleModaAktifkanLabel"
                              >
                                Aktifkan kembali antrean ini ?
                              </h5>
                            </div>
                            <div className="modal-footer d-flex flex-column align-items-center">
                              <div className="button-konfirmasi">
                                <button
                                  className="btn btn-primary me-3"
                                  data-bs-dismiss="modal"
                                  onClick={setAktifkan}
                                >
                                  Ya
                                </button>
                                <button
                                  className="btn btn-danger"
                                  data-bs-dismiss="modal"
                                >
                                  Tidak
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <li>
                        <button
                          className="btn rounded-pill btn-success"
                          type="button"
                          name="button"
                          id="tombol-panggil"
                          data-bs-toggle="modal"
                          data-bs-target={`#modalPanggil${props.counter}`}
                          disabled={
                            (props.ada_dipanggil ||
                              new Date(props.bio.jadwal).setHours(
                                0,
                                0,
                                0,
                                0
                              ) !== new Date().setHours(0, 0, 0, 0)) &&
                            "disabled"
                          }
                        >
                          Panggil
                        </button>
                      </li>
                      <div
                        className="modal fade"
                        id={`modalPanggil${props.counter}`}
                        aria-hidden="true"
                        aria-labelledby="modalPanggilLabel"
                        tabindex="-1"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            {
                              <div className="modal-header">
                                <h5
                                  className="modal-title mx-auto fw-bold"
                                  id="exampleModalToggleLabel"
                                >
                                  Tetapkan Estimasi Antrean
                                </h5>
                              </div>
                            }
                            <div className="modal-body">
                              <div className="data-pasien d-flex align-items-center justify-content-center gap-1">
                                <select
                                  className="estimasi"
                                  name="menit"
                                  id="menit"
                                  onChange={(e) =>
                                    setEstimasiMenit(e.target.value)
                                  }
                                  value={estimasiMenit}
                                >
                                  <option value="00" selected>
                                    00
                                  </option>
                                  {est.map((value) => {
                                    return (
                                      <option value={value}>{value}</option>
                                    );
                                  })}
                                </select>
                                <span className="fs-1 pb-1">:</span>
                                <select
                                  className="estimasi"
                                  name="detik"
                                  id="detik"
                                  onChange={(e) =>
                                    setEstimasiDetik(e.target.value)
                                  }
                                  value={estimasiDetik}
                                >
                                  <option value="00" selected>
                                    00
                                  </option>
                                  {est.map((value) => {
                                    return (
                                      <option value={value}>{value}</option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="mt-3">
                                <hr />
                                <div className="d-flex justify-content-center gap-4">
                                  <button
                                    className="btn btn-primary"
                                    data-bs-dismiss={
                                      (estimasiMenit || estimasiDetik) &&
                                      !(
                                        estimasiMenit === "00" &&
                                        estimasiDetik === "00"
                                      ) &&
                                      "modal"
                                    }
                                    onClick={
                                      (estimasiMenit || estimasiDetik) &&
                                      !(
                                        estimasiMenit === "00" &&
                                        estimasiDetik === "00"
                                      ) &&
                                      handleEstimasi(
                                        props.bio.id,
                                        estimasiMenit,
                                        estimasiDetik
                                      )
                                    }
                                  >
                                    OK
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                  >
                                    Batal
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                ) : (
                  <></>
                )}
                {/* Tombol di sukses */}
                {props.menu === "sukses" || props.menu === "gagal" ? (
                  <>
                    <li>
                      <button
                        className="btn rounded-pill btn-success"
                        type="button"
                        name="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#modalDetail${props.counter}`}
                      >
                        Lihat Detail
                      </button>
                    </li>
                    <div
                      className="modal fade"
                      id={`modalDetail${props.counter}`}
                      aria-hidden="true"
                      aria-labelledby="modalDetailLabel"
                      tabindex="-1"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title mx-auto fw-bold"
                              id="exampleModalToggleLabel"
                            >
                              DATA PASIEN
                            </h5>
                          </div>
                          <div className="modal-body data-pasien">
                            <p>
                              <span className="left">Nama Anak</span>
                              :
                              <span className="right">
                                {props.bio.nama_anak}
                              </span>
                            </p>
                            <p>
                              <span className="left">Nama Ayah</span>:
                              <span className="right">
                                {props.bio.nama_ayah}
                              </span>
                            </p>
                            <p>
                              <span className="left">Nama Ibu</span>:
                              <span className="right">
                                {props.bio.nama_ibu}
                              </span>
                            </p>
                            <p>
                              <span className="left">Tanggal Lahir</span>:
                              <span className="right">
                                {tanggal(props.bio.tanggal_lahir).slice(10)}
                              </span>
                            </p>
                            <p>
                              <span className="left">NIK</span>:
                              <span className="right">{props.bio.nik}</span>
                            </p>
                            <p>
                              <span className="left">No. HP</span>:
                              <span className="right">
                                {props.bio.nomor_telepon}
                              </span>
                            </p>
                            <p>
                              <span className="left">Alamat Email</span>:
                              <span className="right">{props.bio.email}</span>
                            </p>
                            <p>
                              <span className="left">Alamat</span>:
                              <span className="right">{props.bio.alamat}</span>
                            </p>
                            <p>
                              <span className="left">Kecamatan</span>:
                              <span className="right">
                                {props.bio.kecamatan}
                              </span>
                            </p>
                            <p>
                              <span className="left">Kelurahan</span>:
                              <span className="right">
                                {props.bio.kelurahan}
                              </span>
                            </p>
                            <p>
                              <span className="left">Jenis Kartu</span>:
                              <span className="right">
                                {props.bio.jenis_kartu}
                              </span>
                            </p>
                            <p>
                              <span className="left">No. Kartu</span>:
                              <span className="right">
                                {props.bio.nomor_kartu}
                              </span>
                            </p>
                            <p>
                              <span className="left">No. Kartu Berobat</span>:
                              <span className="right">
                                {props.bio.nomor_kartu_berobat}
                              </span>
                            </p>
                            <p>
                              <span className="left">Jenis Imunisasi</span>:
                              <span className="right">
                                {props.bio.jenis_imunisasi}
                              </span>
                            </p>
                            <p>
                              <span className="left">Jadwal</span>:
                              <span className="right">
                                {`Kamis, ${tanggal(props.bio.jadwal).slice(
                                  10
                                )}`}
                              </span>
                            </p>
                            <p>
                              <span className="left">Waktu Verifikasi</span>:
                              <span className="right">
                                {tanggal(props.bio.createdAt)}
                              </span>
                            </p>
                            <div className="d-flex justify-content-center mt-4 py-2 shadow-tes gap-far">
                              <div className="d-flex flex-column align-items-center">
                                <span className="mb-1">Nomor Antrean</span>
                                <span className="fw-bold fs-5">
                                  {props.bio.nomor_antrean}
                                </span>
                              </div>
                              {props.menu === "sukses" ? (
                                <div className="d-flex flex-column align-items-center">
                                  <span className="mb-1 text-success">
                                    Selesai Dilayani
                                  </span>
                                  <span className="fw-bold fs-5">
                                    {`${tanggal(props.bio.estimasi).slice(
                                      0,
                                      8
                                    )}`}
                                  </span>
                                </div>
                              ) : (
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                  <span className="text-danger">
                                    Gagal Dilayani
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="modal-footer d-flex flex-column align-items-center">
                            <div className="button-konfirmasi">
                              <button
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                              >
                                OK
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {/* Rekap Belum Verif ulang*/}
                {props.menu === "rekap" ? (
                  <>
                    <li>
                      <button
                        className="btn rounded-pill btn-success"
                        type="button"
                        name="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#modalDetail${props.counter}`}
                      >
                        Lihat Detail
                      </button>
                    </li>
                    <div
                      className="modal fade"
                      id={`modalDetail${props.counter}`}
                      aria-hidden="true"
                      aria-labelledby="modalDetailLabel"
                      tabindex="-1"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title mx-auto fw-bold"
                              id="exampleModalToggleLabel"
                            >
                              DATA PASIEN
                            </h5>
                          </div>
                          <div className="modal-body data-pasien">
                            <p>
                              <span className="left">Nama Anak</span>
                              :
                              <span className="right">
                                {props.bio.nama_anak}
                              </span>
                            </p>
                            <p>
                              <span className="left">Nama Ayah</span>:
                              <span className="right">
                                {props.bio.nama_ayah}
                              </span>
                            </p>
                            <p>
                              <span className="left">Nama Ibu</span>:
                              <span className="right">
                                {props.bio.nama_ibu}
                              </span>
                            </p>
                            <p>
                              <span className="left">Tanggal Lahir</span>:
                              <span className="right">
                                {tanggal(props.bio.tanggal_lahir).slice(10)}
                              </span>
                            </p>
                            <p>
                              <span className="left">NIK</span>:
                              <span className="right">{props.bio.nik}</span>
                            </p>
                            <p>
                              <span className="left">No. HP</span>:
                              <span className="right">
                                {props.bio.nomor_telepon}
                              </span>
                            </p>
                            <p>
                              <span className="left">Alamat Email</span>:
                              <span className="right">{props.bio.email}</span>
                            </p>
                            <p>
                              <span className="left">Alamat</span>:
                              <span className="right">{props.bio.alamat}</span>
                            </p>
                            <p>
                              <span className="left">Kecamatan</span>:
                              <span className="right">
                                {props.bio.kecamatan}
                              </span>
                            </p>
                            <p>
                              <span className="left">Kelurahan</span>:
                              <span className="right">
                                {props.bio.kelurahan}
                              </span>
                            </p>
                            <p>
                              <span className="left">Jenis Kartu</span>:
                              <span className="right">
                                {props.bio.jenis_kartu}
                              </span>
                            </p>
                            <p>
                              <span className="left">No. Kartu</span>:
                              <span className="right">
                                {props.bio.nomor_kartu}
                              </span>
                            </p>
                            <p>
                              <span className="left">No. Kartu Berobat</span>:
                              <span className="right">
                                {props.bio.nomor_kartu_berobat}
                              </span>
                            </p>
                            <p>
                              <span className="left">Jenis Imunisasi</span>:
                              <span className="right">
                                {props.bio.jenis_imunisasi}
                              </span>
                            </p>
                            <p>
                              <span className="left">Jadwal</span>:
                              <span className="right">
                                {`Kamis, ${tanggal(props.bio.jadwal).slice(
                                  10
                                )}`}
                              </span>
                            </p>
                            <p>
                              <span className="left">Waktu Verifikasi</span>:
                              <span className="right">
                                {tanggal(props.bio.createdAt)}
                              </span>
                            </p>
                            <div className="d-flex justify-content-center mt-4 py-2 shadow-tes gap-far">
                              <div className="d-flex flex-column align-items-center">
                                <span className="mb-1">Nomor Antrean</span>
                                <span className="fw-bold fs-5">
                                  {props.bio.nomor_antrean}
                                </span>
                              </div>
                              {props.bio.berhasil_dilayani ? (
                                <div className="d-flex flex-column align-items-center">
                                  <span className="mb-1 text-success">
                                    Selesai Dilayani
                                  </span>
                                  <span className="fw-bold fs-5">
                                    {`${tanggal(props.bio.estimasi).slice(
                                      0,
                                      8
                                    )}`}
                                  </span>
                                </div>
                              ) : (
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                  <span className="text-danger">
                                    Gagal Dilayani
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="modal-footer d-flex flex-column align-items-center">
                            <div className="button-konfirmasi">
                              <button
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                              >
                                OK
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {/* Sudah verif ulang */}
                {props.bio.verif_ulang ? (
                  <>
                    <li>
                      <button
                        className="btn rounded-pill btn-danger disabled"
                        type="button"
                        name="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModalToggle${props.counter}`}
                      >
                        Verif Ulang
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn rounded-pill btn-success"
                        type="button"
                        name="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModalToggle${props.counter}`}
                      >
                        Lihat Detail
                      </button>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </div>
        <hr className="gradient" />
        <span className="text-md-end text-center ms-md-0">
          Waktu verifikasi : {tanggal(props.bio.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default TesItem;
