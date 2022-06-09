module.exports = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Admin = sequelize.define("admins", {
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  });
  return Admin;
};
