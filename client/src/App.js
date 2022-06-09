import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Verifikasi from "./pages/admin-loket/Verifikasi";
import VerifikasiSukses from "./pages/admin-loket/VerifikasiSukses";
import VerifikasiGagal from "./pages/admin-loket/VerifikasiGagal";
import RekapVerifikasi from "./pages/admin-loket/RekapVerifikasi";
import AturAntrean from "./pages/asisten-dokter/AturAntrean";
import AntreanSelesai from "./pages/asisten-dokter/AntreanSelesai";
import AntreanGagal from "./pages/asisten-dokter/AntreanGagal";
import RekapAntrean from "./pages/asisten-dokter/RekapAntrean";
import Login from "./pages/Login";
import PersistLogin from "./components/PersistLogin";
import Home from "./pages/pasien/Home";
import Daftar from "./pages/pasien/Daftar";
import CaraMendaftar from "./pages/pasien/CaraMendaftar";
import LiveAntrean from "./pages/pasien/LiveAntrean";
import TanyaJawab from "./pages/pasien/TanyaJawab";
import Kontak from "./pages/pasien/Kontak";
import LayoutPasien from "./components/LayoutPasien";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutPasien />}>
          <Route index element={<Home />} />
          <Route path="/daftar" element={<Daftar />}/>
          <Route path="/cara-mendaftar" element={<CaraMendaftar />}/>
          <Route path="/live-antrean" element={<LiveAntrean />}/>
          <Route path="/tanya-jawab" element={<TanyaJawab />}/>
          <Route path="/kontak" element={<Kontak />}/>
        </Route>
        <Route path="login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route path="admin" element={<Navigate to="admin-loket"/>}/>
          <Route path="admin/admin-loket">
            <Route index element={<Verifikasi />} />
            <Route path="verifikasi-sukses" element={<VerifikasiSukses />} />
            <Route path="verifikasi-gagal" element={<VerifikasiGagal />} />
            <Route path="rekap-verifikasi" element={<RekapVerifikasi />} />
          </Route>
          <Route path="admin/asisten-dokter">
            <Route index element={<AturAntrean />} />
            <Route path="antrean-selesai" element={<AntreanSelesai />} />
            <Route path="antrean-gagal" element={<AntreanGagal />} />
            <Route path="rekap-antrean" element={<RekapAntrean />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
