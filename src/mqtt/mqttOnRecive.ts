import mqtt from 'mqtt';

export const onRecive = ( client: mqtt.MqttClient) => {
    client.on('message', (topic, message) => {
      const msgRecived = message.toString();
      console.log(msgRecived)
    })
  }