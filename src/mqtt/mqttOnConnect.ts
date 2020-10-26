import {connect} from 'mqtt';
import { mqttOnRecive } from './mqttOnRecive';

const client = connect('mqtt://broker.hivemq.com')
const topic = 'mallorcabootcampdemo'

export const mqttOnConnect = () => {
  client.on('connect', () => {
    client.subscribe(topic, (err) => !err && mqttOnRecive(client))
  })
}

