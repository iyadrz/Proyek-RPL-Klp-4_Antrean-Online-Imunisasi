const { admin, sequelize } = require("../models");
const db = require("../models");
const Admin = db.admin;
const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const admin = await Admin.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!admin[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const adminId = admin[0].id;
        const username = admin[0].username;
        const accessToken = jwt.sign(
          { adminId, username },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        res.json({ adminId, username, accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
