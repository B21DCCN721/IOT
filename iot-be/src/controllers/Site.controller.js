
const DataSensor = require('../models/DataSensor.model')
const { client } = require('../config/mqttClient')

const getNewData = async (req, res) => {
    try {
        const data = await DataSensor.findOne({
            order: [['id', 'DESC']],
        })
        const formattedTime = new Date(data.thoigian).toISOString().replace('T', ' ').slice(0, 19);
        const formattedData = data.toJSON()
        formattedData.thoigian = formattedTime
        res.json(formattedData);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message : "Lỗi lấy dữ liệu" })
    }
}

const getDataChart = async (req, res) => {
    try {
        const dataChart = await DataSensor.findAll({
            limit : 10,
            order : [['id', 'DESC']],
        })
        const formattedDataChart = dataChart.map(item => {
            const formattedTime = new Date(item.thoigian).toISOString().replace('T', ' ').slice(0, 19);
            return {
              ...item.toJSON(),  // Chuyển đổi instance của Sequelize thành object
              thoigian: formattedTime  
            };
        });
        res.json(formattedDataChart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message : "Lỗi lấy dữ "})
    }
}
const controllDevice = async (req, res) => {
    try {
        const { deviceId, state } = req.body;
        const booleanState = (state === true || state === 'true');
        let message
        switch (deviceId) {
            case 'quat':
                message = booleanState ? 'LED1_ON' : 'LED1_OFF'; 
                break;
            case 'den':
                message = booleanState ? 'LED2_ON' : 'LED2_OFF'; 
                break;
            case 'dieuhoa':
                message = booleanState ? 'LED3_ON' : 'LED3_OFF'; 
                break;
            default:
                return res.status(400).json({ error: 'Invalid device ID' });
        }
        

        client.publish('led', message, (err) => {
            if (err) {
                console.error('Gửi yêu cầu thất bại:', err);
            }
            return res.status(200).json({ message: 'Gửi yêu cầu thành công' });
        });
    } catch (error) {
        return res.status(500).json({ error: 'Gửi yêu cầu thất bại' });
    }
}

module.exports = { getNewData, getDataChart, controllDevice }