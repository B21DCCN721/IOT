
const HistoryDevice = require('../models/HistoryDevice.model')
const { Op } = require('sequelize')

const getAllHistoryDevice = async (req, res) => {
    try {
        const data = await HistoryDevice.findAll({
            order: [['id', 'DESC']],
        })
        const formattedData = data.map(item => {
            const formattedTime = new Date(item.thoigian).toISOString().replace('T', ' ').slice(0, 19);
            return {
              ...item.toJSON(),  // Chuyển đổi instance của Sequelize thành object
              thoigian: formattedTime  
            };
        });
        res.json(formattedData)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Lỗi lấy dữ liệu" })
    }
}
const searchTime = async (req, res) => {
    try {
        const { search_time } = req.query
        const date = new Date(search_time)
        const dataSearch = await HistoryDevice.findAll({
            where: {
                thoigian: search_time
            }
        })
        const formattedDataSearch = dataSearch.map(item => {
            const formattedTime = new Date(item.thoigian).toISOString().replace('T', ' ').slice(0, 19);
            return {
              ...item.toJSON(),  // Chuyển đổi instance của Sequelize thành object
              thoigian: formattedTime  
            };
        });
        res.json(formattedDataSearch)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Lỗi lấy dữ liệu" })
    }
}
const getLimitHistory = async (req, res) => {
    try {
      const { limit } = req.query
      const dataLimit = await HistoryDevice.findAll({
        limit: parseInt(limit),
        order: [['id', 'DESC']],
      })
      const formattedDataLimit = dataLimit.map(item => {
        const formattedTime = new Date(item.thoigian).toISOString().replace('T', ' ').slice(0, 19);
        return {
          ...item.toJSON(),  // Chuyển đổi instance của Sequelize thành object
          thoigian: formattedTime  
        };
      });
      res.json(formattedDataLimit)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Lỗi lấy dữ liệu" })
    }
}

module.exports = { getAllHistoryDevice, searchTime, getLimitHistory }