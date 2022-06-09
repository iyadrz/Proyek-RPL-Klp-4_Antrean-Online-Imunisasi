import React from "react";
import "./Kontak.css"

function Kontak() {
  const openLink = (link) => (event) => {
    window.open(link, "_blank");
  }

  return (
    <main className="container-lg kontak--content text-center d-flex flex-column justify-content-sm-center gap-5 mt-5 mt-sm-0">
      <h1 className="kontak--title fw-bold">Kontak</h1>
      <h4 className="">Hubungi Kami di Bawah ini</h4>
      <div className="row">
        <div className="col-sm-4 d-flex flex-column align-items-center">
          <button className="kontak--contact-item d-flex align-items-center justify-content-center">
            <i className="fa fa-envelope kontak--contact-icon"></i>
          </button>
          <p className="my-2 fs-5">Email</p>
          <p className="kontak--contact-info">infoadmin@puskesmas.com</p>
        </div>
        <div className="col-sm-4 d-flex flex-column align-items-center">
          <button className="kontak--contact-item d-flex align-items-center justify-content-center" onClick={openLink("https://wa.me/6281347579372")}>
            <i className="fas fa-phone kontak--contact-icon"></i>
          </button>
          <p className="my-2 fs-5">WhatsApp</p>
          <p className="kontak--contact-info">0813-4757-9372</p>
        </div>
        <div className="col-sm-4 d-flex flex-column align-items-center mb-5 mb-sm-0">
          <button className="kontak--contact-item d-flex align-items-center justify-content-center" onClick={openLink("https://goo.gl/maps/JRjHwgh3m5rCV8Ea7")}>
            <i className=" fas fa-map-marker-alt kontak--contact-icon"></i>
          </button>
          <p className="my-2 fs-5">Alamat</p>
          <p className="kontak--contact-info">Jl. Barukang VI No. 15</p>
        </div>
      </div>
    </main>
  );
}

export default Kontak;
