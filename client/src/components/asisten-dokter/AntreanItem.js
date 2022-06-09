import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import "./AntreanItem.scss";
import TesItem from "./TesItem";

function AntrianItem(props) {
  const axiosPrivate = useAxiosPrivate();
  const [biodata, setBiodata] = useState([]);
  let counter = 0;
  const baseURL = "/biodata/";

  let selesai_terakhir = 0;
  biodata.forEach((element) => {
    selesai_terakhir =
      element.urutan_selesai > selesai_terakhir
        ? element.urutan_selesai
        : selesai_terakhir;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      axiosPrivate.get(baseURL).then((response) => {
        setBiodata(response.data);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

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
      .split(" ");
    return `${temp[0]} ${temp[1]} ${temp[2]}`;
  }

  let nomor_terakhir = 0;
  biodata.forEach((element) => {
    nomor_terakhir =
      element.urutan_pelayanan > nomor_terakhir
        ? element.urutan_pelayanan
        : nomor_terakhir;
  });

  let id_setelah = [];
  biodata.forEach((element, index, array) => {
    if (array[index + 1])
      array[index + 1].terverifikasi
        ? id_setelah.push(array[index + 1].id)
        : id_setelah.push(null);
  });

  let ada_dipanggil = biodata.some((bio) => bio.dipanggil === true);

  let estSekarang = biodata.findIndex((est) => est.id === 11);

  let bioRekap = biodata.slice();
  bioRekap.sort((a, b) => {
    let da = a.urutan_selesai,
      db = b.urutan_selesai;
    return da - db;
  });

  return (
    <div className="antrian-item-container d-flex flex-column gap-3">
      {biodata.map((bio) => {
        if (bio.terverifikasi) {
          if (props.menu === "atur" && bio.sukses && !bio.selesai) {
            if (tanggal(bio.jadwal) === tanggal(props.jadwal)) {
              counter++;
              return (
                <TesItem
                  counter={counter}
                  baseURL={baseURL}
                  bio={bio}
                  menu={props.menu}
                  ada_dipanggil={ada_dipanggil}
                  nomor_terakhir={nomor_terakhir}
                  selesai_terakhir={selesai_terakhir}
                  id_setelah={id_setelah}
                  estSekarang={estSekarang}
                />
              );
            } else if (props.jadwal === "semua") {
              counter++;
              return (
                <TesItem
                  counter={counter}
                  baseURL={baseURL}
                  bio={bio}
                  menu={props.menu}
                  ada_dipanggil={ada_dipanggil}
                  nomor_terakhir={nomor_terakhir}
                  selesai_terakhir={selesai_terakhir}
                  id_setelah={id_setelah}
                  estSekarang={estSekarang}
                />
              );
            } else {
              return <></>;
            }
          } else {
            return <></>;
          }
        } else {
          return <></>;
        }
      })}
      {bioRekap.map((bio) => {
        if (bio.terverifikasi) {
          if (props.menu === "sukses" && bio.selesai && bio.berhasil_dilayani) {
            if (tanggal(bio.jadwal) === tanggal(props.jadwal)) {
              counter++;
              return (
                <TesItem
                  counter={counter}
                  baseURL={baseURL}
                  bio={bio}
                  menu={props.menu}
                  ada_dipanggil={ada_dipanggil}
                  nomor_terakhir={nomor_terakhir}
                  selesai_terakhir={selesai_terakhir}
                  id_setelah={id_setelah}
                  estSekarang={estSekarang}
                />
              );
            } else if (props.jadwal === "semua") {
              counter++;
              return (
                <TesItem
                  counter={counter}
                  baseURL={baseURL}
                  bio={bio}
                  menu={props.menu}
                  ada_dipanggil={ada_dipanggil}
                  nomor_terakhir={nomor_terakhir}
                  selesai_terakhir={selesai_terakhir}
                  id_setelah={id_setelah}
                  estSekarang={estSekarang}
                />
              );
            } else {
              return <></>;
            }
          } else if (
            props.menu === "gagal" &&
            bio.selesai &&
            !bio.berhasil_dilayani
          ) {
            if (tanggal(bio.jadwal) === tanggal(props.jadwal)) {
              counter++;
              return (
                <TesItem
                  counter={counter}
                  baseURL={baseURL}
                  bio={bio}
                  menu={props.menu}
                  ada_dipanggil={ada_dipanggil}
                  nomor_terakhir={nomor_terakhir}
                  selesai_terakhir={selesai_terakhir}
                  id_setelah={id_setelah}
                  estSekarang={estSekarang}
                />
              );
            } else if (props.jadwal === "semua") {
              counter++;
              return (
                <TesItem
                  counter={counter}
                  baseURL={baseURL}
                  bio={bio}
                  menu={props.menu}
                  ada_dipanggil={ada_dipanggil}
                  nomor_terakhir={nomor_terakhir}
                  selesai_terakhir={selesai_terakhir}
                  id_setelah={id_setelah}
                  estSekarang={estSekarang}
                />
              );
            } else {
              return <></>;
            }
          } else {
            if (props.tampilkanSemua && bio.selesai) {
              counter++;
              return (
                <TesItem
                  counter={counter}
                  baseURL={baseURL}
                  bio={bio}
                  menu={props.menu}
                  ada_dipanggil={ada_dipanggil}
                  nomor_terakhir={nomor_terakhir}
                  selesai_terakhir={selesai_terakhir}
                  id_setelah={id_setelah}
                  estSekarang={estSekarang}
                />
              );
            } else if (
              tanggal(bio.updatedAt) === tanggal(props.rekapDate) &&
              bio.selesai
            ) {
              counter++;
              return (
                <TesItem
                  counter={counter}
                  baseURL={baseURL}
                  bio={bio}
                  menu={props.menu}
                  ada_dipanggil={ada_dipanggil}
                  nomor_terakhir={nomor_terakhir}
                  selesai_terakhir={selesai_terakhir}
                  id_setelah={id_setelah}
                  estSekarang={estSekarang}
                />
              );
            } else {
              return <></>;
            }
          }
        } else {
          return <></>;
        }
      })}
    </div>
  );
}

export default AntrianItem;
