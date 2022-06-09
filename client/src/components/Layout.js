import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Layout.scss";
import RequireAuth from "./RequireAuth";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="horizontal">
        <Sidebar />
        <RequireAuth />
      </div>
    </div>
  );
};

export default Layout;
