import React from "react";
import "./Login.scss";
import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logoPuskesmas from "../images/logo-puskesmas-full.png";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";
const LOGIN_URL = "/auth/login";

function Login() {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const refresh = useRefreshToken();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          username: username,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ username, password, accessToken });
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };
    verifyRefreshToken();
  }, []);

  return !auth?.accessToken ? (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid">
        <img className="img-fluid py-4 p-lg-4" src={logoPuskesmas} alt="" />
      </div>
      <div className="container-fluid d-flex flex-column align-items-lg-center align-items-center login-parent flex-fill">
        <div className="login-content d-flex flex-column justify-content-center align-items-center">
          <h1 className="offset-1 align-self-start">Login Admin</h1>
          <form className="col-10" onSubmit={Login}>
            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <a href="/">
              <button
                className="btn login-button btn-lg"
                type="submit"
                name="button"
              >
                Login
              </button>
            </a>
          </form>
          <div className="mt-4 fs-5 text-danger">{msg}</div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/admin/admin-loket/" state={{ from: location }} replace />
  );
}

export default Login;
