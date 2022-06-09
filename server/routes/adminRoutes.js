module.exports = (app) => {
  const { getAdmins, Register, Login, Logout } = require("../controllers/Admin.js");
  const { refreshToken } = require("../controllers/RefreshToken.js");
  const { verifyToken } = require("../middleware/VerifyToken.js");
  const router = require("express").Router();

  router.get('/admins', verifyToken, getAdmins);
  router.post('/register', Register);
  router.post('/login', Login);
  router.get('/token', refreshToken);
  router.delete('/logout', Logout);
  app.use("/api/auth", router);
};
