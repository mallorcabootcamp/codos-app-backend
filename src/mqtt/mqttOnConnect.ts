import mqtt from 'mqtt';
import { onRecive } from './mqttOnRecive';

const client = mqtt.connect('mqtt://broker.hivemq.com')
const topic = 'mallorcabootcampdemo'

export const onConnect = () => {
  client.on('connect', () => {
    client.subscribe(topic, function (err) {
      if (!err) {
        onRecive(client);
      }
    })
  })
}

