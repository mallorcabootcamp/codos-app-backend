import { MqttClient } from 'mqtt';

export const mqttOnRecive = ( client: MqttClient) => {
    client.on('message', (topic, message) => {
      const msgRecived = message.toString();
      console.log(msgRecived)
    })
  }