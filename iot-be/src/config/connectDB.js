const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("iot2", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  timezone: '+07:00',
});
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection db has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connection, sequelize };
