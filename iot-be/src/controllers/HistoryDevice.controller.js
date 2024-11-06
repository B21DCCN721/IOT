
const HistoryDevice = require('../models/HistoryDevice.model')
const { Op } = require('sequelize')

const getAllHistoryDevice = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit
        const data = await HistoryDevice.findAndCountAll({
            order: [[res.locals._sort.hasOwnProperty("column")?res.locals._sort.column:'id', res.locals._sort.type === 'asc' ? 'ASC' : 'DESC']],
            limit: limit,
            offset: offset,
        })
        const formattedData = data.rows.map(item => {
            const formattedTime = new Date(item.thoigian).toISOString().replace('T', ' ').slice(0, 19);
            return {
              ...item.toJSON(),
              thoigian: formattedTime  
            };
        });
        const totalPages = Math.ceil(data.count / limit);
        res.json({
          data: formattedData,
          totalPages: totalPages,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Lỗi lấy dữ liệu" })
    }
}
const searchTime = async (req, res) => {
    try {
        const { search_time } = req.query
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        // const date = new Date(search_time)
        let dataSearch
        if (search_time.length === 16) {
          const startTime = search_time + ':00'
          const endTime = search_time + ':59'
          dataSearch = await HistoryDevice.findAndCountAll({
            order: [[res.locals._sort.hasOwnProperty("column")?res.locals._sort.column:'id', res.locals._sort.type === 'asc' ? 'ASC' : 'DESC']],
            limit: limit,
            offset: offset,
            where: {
              thoigian: {
                [Op.between]: [startTime, endTime]
              }
          }
        })
        } else {
          dataSearch = await HistoryDevice.findAndCountAll({
            order: [[res.locals._sort.hasOwnProperty("column")?res.locals._sort.column:'id', res.locals._sort.type === 'asc' ? 'ASC' : 'DESC']],
            limit: limit,
            offset: offset,
            where: {
              thoigian: {
                [Op.eq]: search_time
              }
            }
          })
        }
        const totalPages = Math.ceil(dataSearch.count / limit);
        const formattedDataSearch = dataSearch.rows.map(item => {
            const formattedTime = new Date(item.thoigian).toISOString().replace('T', ' ').slice(0, 19);
            return {
              ...item.toJSON(),  
              thoigian: formattedTime  
            };
        });
        res.json({
          data: formattedDataSearch,
          totalPages: totalPages,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Lỗi lấy dữ liệu" })
    }
}

module.exports = { getAllHistoryDevice, searchTime }