import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import "./TestItem.scss";

function TesItem(props) {
  const axiosPrivate = useAxiosPrivate();
  const [alasanTemp, setAlasan] = useState("");
  const sukses = (id, nomor_antrean) => (event) => {
    window.open(
      `https://wa.me/62${props.bio.nomor_telepon.slice(
        1
      )}?text=Data%20Anda%20berhasil%20diverifikasi%2C%0Aberikut%20nomor%20antrean%20Anda%3A%20${
        props.last_number + 1
      }`,
      "_blank"
    );
    axiosPrivate
      .patch(props.baseURL + id, {
        terverifikasi: true,
        sukses: true,
        nomor_antrean: nomor_antrean,
        urutan_loket: props.loket_terakhir + 1,
        urutan_pelayanan: props.dilayani_terakhir + 1,
      })
      .catch((error) => console.log(error));
    props.counter--;
  };
  const gagal = (id) => (event) => {
    axiosPrivate
      .patch(props.baseURL + id, {
        terverifikasi: true,
        sukses: false,
        urutan_loket: props.loket_terakhir + 1,
      })
      .catch((error) => console.log(error));
    props.counter--;
  };
  const reVerify = (id, alasan) => (event) => {
    window.open(
      `https://wa.me/62${props.bio.nomor_telepon.slice(1)}?text=${alasan}`,
      "_blank"
    );
    axiosPrivate
      .patch(props.baseURL + id, {
        verif_ulang: true,
        alasan: alasan,
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function tanggal(tggl) {
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

  function tanggalJadwal(tggl) {
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

  // let index_kamis = props.thursday.indexOf(props.bio.jadwal);

  return (
    <div>
      <div className="p-3 antrian-item d-flex flex-column">
        <div className="d-flex gap-3 mb-0">
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
              </li>
            </ul>
            <div className="col-12 col-md-4 col-lg-5 col-xl-6 d-flex">
              <ul className="list-unstyled d-flex gap-2 flex-fill flex-wrap justify-content-md-end justify-content-start h-50">
                {props.menu === "verifikasi" ? (
                  <li>
                    <button
                      className="btn rounded-pill btn-primary"
                      type="button"
                      name="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#modalTerima${props.counter}`}
                    >
                      Terima
                    </button>
                  </li>
                ) : (
                  <></>
                )}
                {props.menu === "verifikasi" ? (
                  <li>
                    <button
                      className="btn rounded-pill btn-danger"
                      type="button"
                      name="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#modalTolak${props.counter}`}
                    >
                      Tolak
                    </button>
                  </li>
                ) : (
                  <></>
                )}
                {
                  <>
                    <div
                      className="modal fade"
                      id={`modalTerima${props.counter}`}
                      aria-hidden="true"
                      aria-labelledby="modalTerimaLabel"
                      tabindex="-1"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title mx-auto fw-bold"
                              id="modalTerimaToggleLabel"
                            >
                              Terima Antrean ?
                            </h5>
                          </div>
                          <div className="modal-footer d-flex flex-column align-items-center">
                            <div className="button-konfirmasi">
                              <button
                                className="btn btn-primary me-3"
                                data-bs-dismiss="modal"
                                onClick={sukses(
                                  props.bio.id,
                                  props.last_number + 1
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
                    <div
                      className="modal fade"
                      id={`modalTolak${props.counter}`}
                      aria-hidden="true"
                      aria-labelledby="modalTolakLabel"
                      tabindex="-1"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title mx-auto fw-bold"
                              id="modalTolakToggleLabel"
                            >
                              Tolak Antrean ?
                            </h5>
                          </div>
                          <div className="modal-footer d-flex flex-column align-items-center">
                            <div className="button-konfirmasi">
                              <button
                                className="btn btn-primary me-3"
                                data-bs-dismiss="modal"
                                onClick={gagal(props.bio.id)}
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
                }
                {props.menu === "verifikasi" ? (
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
                ) : (
                  <></>
                )}
                {props.menu === "sukses" ? (
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
                ) : (
                  <></>
                )}
                {props.menu === "rekap" && !props.bio.verif_ulang ? (
                  props.bio.sukses ? (
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
                  ) : (
                    <li>
                      <button
                        className="btn rounded-pill btn-danger"
                        type="button"
                        name="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModalToggle${props.counter}`}
                      >
                        Verif Ulang
                      </button>
                    </li>
                  )
                ) : (
                  <></>
                )}
                {props.menu === "gagal" && !props.bio.verif_ulang ? (
                  <li>
                    <button
                      className="btn rounded-pill btn-danger"
                      type="button"
                      name="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModalToggle${props.counter}`}
                    >
                      Verif Ulang
                    </button>
                  </li>
                ) : (
                  <></>
                )}
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
      <div
        className="modal fade"
        id={`exampleModalToggle${props.counter}`}
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
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body data-pasien">
              <p>
                <span className="left">Nama Anak</span>:
                <span className="right">{props.bio.nama_anak}</span>
              </p>
              <p>
                <span className="left">Nama Ayah</span>:
                <span className="right">{props.bio.nama_ayah}</span>
              </p>
              <p>
                <span className="left">Nama Ibu</span>:
                <span className="right">{props.bio.nama_ibu}</span>
              </p>
              <p>
                <span className="left">Tanggal Lahir</span>:
                <span className="right">{tanggal(props.bio.tanggal_lahir).slice(10)}</span>
              </p>
              <p>
                <span className="left">NIK</span>:
                <span className="right">{props.bio.nik}</span>
              </p>
              <p>
                <span className="left">No. HP</span>:
                <span className="right">{props.bio.nomor_telepon}</span>
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
                <span className="right">{props.bio.kecamatan}</span>
              </p>
              <p>
                <span className="left">Kelurahan</span>:
                <span className="right">{props.bio.kelurahan}</span>
              </p>
              <p>
                <span className="left">Jenis Kartu</span>:
                <span className="right">{props.bio.jenis_kartu}</span>
              </p>
              <p>
                <span className="left">No. Kartu</span>:
                <span className="right">{props.bio.nomor_kartu}</span>
              </p>
              <p>
                <span className="left">No. Kartu Berobat</span>:
                <span className="right">{props.bio.nomor_kartu_berobat}</span>
              </p>
              <p>
                <span className="left">Jenis Imunisasi</span>:
                <span className="right">{props.bio.jenis_imunisasi}</span>
              </p>
              <p>
                <span className="left">Jadwal</span>:
                <span className="right">{`Kamis, ${tanggalJadwal(
                  props.bio.jadwal
                )}`}</span>
              </p>
              <p>
                <span className="left">Waktu Verifikasi</span>:
                <span className="right">{tanggal(props.bio.createdAt)}</span>
              </p>
              {props.bio.terverifikasi && !props.bio.sukses ? (
                !props.bio.verif_ulang ? (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="alasan" className="form-label">
                      Alasan Ditolak
                    </label>
                    <textarea
                      className="form-control"
                      id="alasan"
                      rows="3"
                      onChange={(e) => setAlasan(e.target.value)}
                      required
                    ></textarea>
                    <div className="mt-4">
                      <hr />
                      <button
                        className="btn btn-danger d-block mx-auto"
                        data-bs-dismiss={props.bio.alasan && "modal"}
                        onClick={
                          alasanTemp && reVerify(props.bio.id, alasanTemp)
                        }
                      >
                        Verif Ulang
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <p>
                      <span className="left">Alasan Ditolak</span>:
                      <span className="right">{props.bio.alasan}</span>
                    </p>
                    <hr />
                    <button
                      className="btn btn-primary d-block mx-auto"
                      data-bs-dismiss="modal"
                    >
                      OK
                    </button>
                  </div>
                )
              ) : (
                <></>
              )}
            </div>
            {!(props.bio.terverifikasi && !props.bio.sukses) ? (
              <div className="modal-footer d-flex flex-column align-items-center">
                {props.menu === "verifikasi" ? (
                  <div className="button-konfirmasi">
                    <button
                      className="btn btn-primary me-4"
                      data-bs-toggle="modal"
                      onClick={sukses(props.bio.id, props.last_number + 1)}
                    >
                      Terima
                    </button>
                    <button
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={gagal(props.bio.id)}
                    >
                      Tolak
                    </button>
                  </div>
                ) : props.menu === "gagal" ? (
                  <></>
                ) : (
                  <div className="button-konfirmasi">
                    <button className="btn btn-primary" data-bs-dismiss="modal">
                      OK
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TesItem;
