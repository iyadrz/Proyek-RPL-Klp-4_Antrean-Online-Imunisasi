module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "CAPILA2000",
  DB: "rpl_puskesmas",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// module.exports = {
//   HOST: "sql6.freesqldatabase.com",
//   USER: "sql6497320",
//   PASSWORD: "CnBLYP5Nbt",
//   DB: "sql6497320",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };