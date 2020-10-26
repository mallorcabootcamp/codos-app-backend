import mqtt from 'mqtt';

export const mqttOnRecive = ( client: mqtt.MqttClient) => {
    client.on('message', (topic, message) => {
      const msgRecived = message.toString();
      console.log(msgRecived)
    })
  }