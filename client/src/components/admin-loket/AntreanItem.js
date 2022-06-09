import React from "react";
import { useState, useEffect } from "react";
import "./AntreanItem.scss";
import TesItem from "./TesItem";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AntrianItem(props) {
  const axiosPrivate = useAxiosPrivate();
  const [biodata, setBiodata] = useState([]);
  let counter = 0;
  const baseURL = "/biodata/";

  useEffect(() => {
    const interval = setInterval(() => {
      axiosPrivate.get(baseURL).then((response) => {
        setBiodata(response.data);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  let nextThursday;
  for (let i = 0; i < 7; i++) {
    if (new Date().getDay() + i === 4 || new Date().getDay() + i === 11) {
      nextThursday = new Date(new Date().setDate(new Date().getDate() + i));
    }
  }

  let thursday = [];
  for (let i = 0; i < 4; i++) {
    thursday.push(tanggal(new Date(new Date().setDate(nextThursday.getDate() + 7 * i))));
  }

  let last_number = [0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    biodata.forEach((element) => {
      last_number[i] =
        tanggal(element.jadwal) === thursday[i] &&
        element.nomor_antrean > last_number[i]
          ? element.nomor_antrean
          : last_number[i];
    });
  }

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

  let loket_terakhir = 0;
  biodata.forEach((element) => {
    loket_terakhir =
      element.urutan_loket > loket_terakhir
        ? element.urutan_loket
        : loket_terakhir;
  });

  let dilayani_terakhir = 0;
  biodata.forEach((element) => {
    dilayani_terakhir =
      element.urutan_pelayanan > dilayani_terakhir
        ? element.urutan_pelayanan
        : dilayani_terakhir;
  });

  biodata.sort((a, b) => {
    let da = a.urutan_loket,
      db = b.urutan_loket;
    return da - db;
  });

  return (
    <div className="antrian-item-container d-flex flex-column gap-3">
      {biodata.map((bio) => {
        if (!bio.terverifikasi && props.menu === "verifikasi") {
          if (tanggal(bio.jadwal) === tanggal(props.jadwal)) {
            counter++;
            return (
              <TesItem
                counter={counter}
                baseURL={baseURL}
                bio={bio}
                menu={props.menu}
                last_number={last_number[thursday.indexOf(tanggal(bio.jadwal))]}
                dilayani_terakhir={dilayani_terakhir}
                loket_terakhir={loket_terakhir}
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
                last_number={last_number[thursday.indexOf(tanggal(bio.jadwal))]}
                dilayani_terakhir={dilayani_terakhir}
                loket_terakhir={loket_terakhir}
              />
            );
          } else {
            return <></>;
          }
        } else if (bio.terverifikasi && bio.sukses && props.menu === "sukses") {
          if (tanggal(bio.jadwal) === tanggal(props.jadwal)) {
            counter++;
            return (
              <TesItem
                counter={counter}
                baseURL={baseURL}
                bio={bio}
                menu={props.menu}
                last_number={last_number[thursday.indexOf(tanggal(bio.jadwal))]}
                dilayani_terakhir={dilayani_terakhir}
                loket_terakhir={loket_terakhir}
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
                last_number={last_number[thursday.indexOf(tanggal(bio.jadwal))]}
                dilayani_terakhir={dilayani_terakhir}
                loket_terakhir={loket_terakhir}
              />
            );
          } else {
            return <></>;
          }
        } else if (bio.terverifikasi && !bio.sukses && props.menu === "gagal") {
          if (tanggal(bio.jadwal) === tanggal(props.jadwal)) {
            counter++;
            return (
              <TesItem
                counter={counter}
                baseURL={baseURL}
                bio={bio}
                menu={props.menu}
                last_number={last_number[thursday.indexOf(tanggal(bio.jadwal))]}
                dilayani_terakhir={dilayani_terakhir}
                loket_terakhir={loket_terakhir}
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
                last_number={last_number[thursday.indexOf(tanggal(bio.jadwal))]}
                dilayani_terakhir={dilayani_terakhir}
                loket_terakhir={loket_terakhir}
              />
            );
          } else {
            return <></>;
          }
        } else {
          if (props.tampilkanSemua) {
            if (bio.terverifikasi || bio.sukses) {
              counter++;
              return (
                <TesItem
                  counter={counter}
                  baseURL={baseURL}
                  bio={bio}
                  menu={props.menu}
                  last_number={last_number[thursday.indexOf(tanggal(bio.jadwal))]}
                  dilayani_terakhir={dilayani_terakhir}
                  loket_terakhir={loket_terakhir}
                />
              );
            } else {
              return <></>;
            }
          } else if (tanggal(bio.updatedAt) === tanggal(props.rekapDate)) {
            if (bio.terverifikasi || bio.sukses) {
              counter++;
              return (
                <TesItem
                  counter={counter}
                  baseURL={baseURL}
                  bio={bio}
                  menu={props.menu}
                  last_number={last_number[thursday.indexOf(tanggal(bio.jadwal))]}
                  dilayani_terakhir={dilayani_terakhir}
                  loket_terakhir={loket_terakhir}
                />
              );
            } else {
              return <></>;
            }
          } else {
            return <></>;
          }
        }
      })}
    </div>
  );
}

export default AntrianItem;
