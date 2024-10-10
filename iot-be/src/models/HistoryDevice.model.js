
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDB");

const HistoryDevice = sequelize.define("HistoryDevice", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  thietbi: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  trangthai: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  thoigian: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: "lichsu",
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

module.exports = HistoryDevice;
