
const DataSensor = require('../models/DataSensor.model')
const { client } = require('../config/mqttClient')
const { Op } = require('sequelize')

const getAllDataSensors = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    const data = await DataSensor.findAndCountAll({
      order: [[res.locals._sort.hasOwnProperty("column")?res.locals._sort.column:'id', res.locals._sort.type === 'asc' ? 'ASC' : 'DESC']],
      limit: limit,
      offset: offset,
    });
    // Định dạng lại thời gian
    const formattedData = data.rows.map(item => {
      const formattedTime = new Date(item.thoigian).toISOString().replace('T', ' ').slice(0, 19);
      return {
        ...item.toJSON(),  // Chuyển đổi instance của Sequelize thành object
        thoigian: formattedTime 
      };
    });

    const totalPages = Math.ceil(data.count / limit);

    res.json({
      data: formattedData,
      totalPages: totalPages,
      _sort: res.locals._sort,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Lỗi lấy dữ liệu" })
  }
}

const searchData = async (req, res) => {
  try {
    const { q, value} = req.query
    console.log(value);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    
    let dataSearch
    if (q === 'search_time') {
      if (value.length === 16) {
        const startTime = value + ':00'
        const endTime = value + ':59'
        dataSearch = await DataSensor.findAndCountAll({
          order: [[res.locals._sort.hasOwnProperty("column")?res.locals._sort.column:'id', res.locals._sort.type === 'asc' ? 'ASC' : 'DESC']],
          where: {
            thoigian: {
              [Op.between]: [startTime, endTime]
            }
          },
          limit: limit,
          offset: offset,
      })
      } else {
        dataSearch = await DataSensor.findAndCountAll({
          order: [[res.locals._sort.hasOwnProperty("column")?res.locals._sort.column:'id', res.locals._sort.type === 'asc' ? 'ASC' : 'DESC']],
          where: {
            thoigian: {
              [Op.eq]: value
            }
          },
          limit: limit,
          offset: offset,
        })
      }
    } else {
      const floatValue = parseFloat(value);
      dataSearch = await DataSensor.findAndCountAll({
        order: [[res.locals._sort.hasOwnProperty("column")?res.locals._sort.column:'id', res.locals._sort.type === 'asc' ? 'ASC' : 'DESC']],
        where: {
          [q]: {
            [Op.between]: [floatValue - 0.01, floatValue + 0.01]
          }
        },
        limit: limit,
        offset: offset,
      })
    }
    const formattedDataSearch = dataSearch.rows.map(item => {
      const formattedTime = new Date(item.thoigian).toISOString().replace('T', ' ').slice(0, 19);
      return {
        ...item.toJSON(),
        thoigian: formattedTime  
      };
    });
    const totalPages = Math.ceil(dataSearch.count / limit);
    res.json({
      data: formattedDataSearch,
      totalPages: totalPages,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Lỗi lấy dữ liệu" })
  }
}

const soLanCanhBao = async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const currentDate = `${year}-${month}-${day}`;

    const startDate = `${currentDate} 00:00:00`;
    const endDate = `${currentDate} 23:59:59`;

    const soLuong = await DataSensor.count(
      {
        where: {
          thoigian: {
            [Op.between]:[startDate, endDate],
          },
          windspeed: {
            [Op.gte]: 60,
          }
        }
      }
    );
    const newData = await DataSensor.findOne({
      order: [['id', 'DESC']],
      // where: {
      //   thoigian: {
      //     [Op.between]:[startDate, endDate],
      //   },
      // }
    })
    const data = newData.toJSON();
    const windSpeed = parseInt(data.windspeed);
    console.log(windSpeed);
    
    // if(windSpeed >= 60){
    //   client.publish('warning', 'canhbao', (err) => {
    //     if (err) {
    //         console.error('Gửi yêu cầu thất bại:', err);
    //         return res.status(500).json({ message: 'Gửi yêu cầu thất bại' });
    //     }
    //     return res.status(200).json({ 
    //       message: 'Gửi yêu cầu thành công', 
    //       windSpeed: windSpeed, 
    //       soLuong: soLuong });
    //   });
      res.json({
        windSpeed: windSpeed,
        soLuong: soLuong,
      });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Lỗi lấy dữ liệu" })
  }
}

module.exports = { getAllDataSensors, searchData, soLanCanhBao }
