
const DataSensor = require('../models/DataSensor.model')
const { Op } = require('sequelize')

const getAllDataSensors = async (req, res) => {
  try {
    const data = await DataSensor.findAll({
      order: [['id', 'DESC']],
    });
    // Định dạng lại thời gian
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

const searchData = async (req, res) => {
  try {
    const { q, value} = req.query
    console.log(value);
    
    let dataSearch
    if (q === 'search_time') {
      if (value.length === 16) {
        const startTime = value + ':00'
        const endTime = value + ':59'
        dataSearch = await DataSensor.findAll({
          order: [['id', 'DESC']],
          where: {
            thoigian: {
              [Op.between]: [startTime, endTime]
            }
        }
      })
      } else {
        dataSearch = await DataSensor.findAll({
          order: [['id', 'DESC']],
          where: {
            thoigian: {
              [Op.eq]: value
            }
          }
        })
      }
    } else {
      const floatValue = parseFloat(value);
      dataSearch = await DataSensor.findAll({
        order: [['id', 'DESC']],
        where: {
          [q]: {
            [Op.between]: [floatValue - 0.001, floatValue + 0.001]
          }
        }
      })
    }
    const formattedDataSearch = dataSearch.map(item => {
      const formattedTime = new Date(item.thoigian).toISOString().replace('T', ' ').slice(0, 19);
      return {
        ...item.toJSON(),
        thoigian: formattedTime  
      };
    });
    res.json(formattedDataSearch)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Lỗi lấy dữ liệu" })
  }
}

const getLimitDataSensor = async (req, res) => {
  try {
    const { limit, page } = req.query
    const dataLimit = await DataSensor.findAll({
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['id', 'DESC']],
    })
    const formattedDataLimit = dataLimit.map(item => {
      const formattedTime = new Date(item.thoigian).toISOString().replace('T', ' ').slice(0, 19);
      return {
        ...item.toJSON(),
        thoigian: formattedTime  
      };
    });
    res.json(formattedDataLimit)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Lỗi lấy dữ liệu" })
  }
}

module.exports = { getAllDataSensors, searchData, getLimitDataSensor }
