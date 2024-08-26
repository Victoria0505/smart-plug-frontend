// src/mqttService.js
import mqtt from 'mqtt';

const connectUrl = 'broker.emqx.io'; // Replace with your broker URL
const topic = 'esp32/test'; // Replace with your topic

const client = mqtt.connect(connectUrl);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });
});

const subscribeToTemperature = (callback) => {
  client.on('message', (topic, message) => {
    callback(message.toString());
  });
};

export { subscribeToTemperature };
