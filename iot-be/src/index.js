const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const { connection, sequelize } = require('./config/connectDB')
const { mqttClient } = require("./config/mqttClient")

//config req body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//cors
app.use(cors());


// ket noi db
connection()

// const mqttClient = connectMQTT()

// sequelize.sync().then(() => {
//   console.log('Database synchronized');
// }).catch((error) => {
//   console.error('Error synchronizing database:', error);
// });

const route = require('./routes/index')

route(app)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

sequelize.sync()
  .then(() => {
      console.log('Database synced');
      
      // Khởi động MQTT client
      mqttClient();

      app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
      });
  })
  .catch(err => console.error('Error syncing database:', err));