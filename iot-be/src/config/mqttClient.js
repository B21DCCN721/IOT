
const mqtt = require('mqtt')
const  DataSensor  = require('../models/DataSensor.model')
const  HistoryDevice  = require('../models/HistoryDevice.model')

const client = mqtt.connect('mqtt://192.168.43.22:2003', {
    username: 'xuantri',   
    password: 'B21DCCN721'   
}); 

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('data');
    client.subscribe('led');
    client.subscribe('cnt');
});

function mqttClient() {
    client.on('message', async (topic, message) => {
        if (topic === 'data') {
            const dataString = message.toString();
            console.log('Received data:', dataString);
    
            // Dữ liệu được gửi theo định dạng: "Nhiet do: 25.60, Do am: 65.40, Anh sang: 500, LED1: ON, LED2: OFF, LED3: ON"
            const dataArray = dataString.split(',');
    
            const t = parseFloat(dataArray[0].split(':')[1].trim());
            const h = parseFloat(dataArray[1].split(':')[1].trim());
            const lightValue = parseInt(dataArray[2].split(':')[1].trim());
            const led1Status = dataArray[3].split(':')[1].trim();
            const led2Status = dataArray[4].split(':')[1].trim();
            const led3Status = dataArray[5].split(':')[1].trim();
    
            try {
                await DataSensor.create({
                    nhietdo: t,
                    doam: h,
                    anhsang: lightValue,
                });
    
                await HistoryDevice.create({
                    thietbi: 'Quạt',
                    trangthai: led1Status,
                });
    
                await HistoryDevice.create({
                    thietbi: 'Đèn',
                    trangthai: led2Status,
                });
    
                await HistoryDevice.create({
                    thietbi: 'Điều hòa',
                    trangthai: led3Status,
                });
    
                console.log('Data saved successfully to the database');
            } catch (error) {
                console.error('Error saving data to the database:', error);
            }
        }
    });
}

module.exports = { mqttClient, client }
