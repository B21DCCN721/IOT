
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDB");

const DataSensor = sequelize.define("DataSensor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nhietdo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  doam: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  anhsang: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  thoigian: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: "datasensor",
  timestamps: false, // Nếu bảng không có các trường createdAt và updatedAt
  hooks: {
    afterFind: (result) => {
      if (result) {
        if (Array.isArray(result)) {
          result.forEach(row => {
            row.thoigian = new Date(row.thoigian.getTime() + (7 * 60 * 60 * 1000));  // Chuyển sang múi giờ GMT+7
          });
        } else {
          result.thoigian = new Date(result.thoigian.getTime() + (7 * 60 * 60 * 1000));  // Chuyển sang múi giờ GMT+7
        }
      }
      return result;
    }
  }
});

module.exports = DataSensor;
