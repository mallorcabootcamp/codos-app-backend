import axios from 'axios';
import { config } from 'dotenv';
config();

const url: any = process.env.INFLUX_URL;
const token: any = process.env.INFLUX_TOKEN;
const db: any = process.env.INFLUX_DB;

export async function influxDbOnGet() {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      timeout: 1000,
      params: {
        q: 'SELECT * FROM "@erguro1973" LIMIT 5',
        db: db
      },
      headers: { 'Authorization': token }
    })
    const values = JSON.parse(JSON.stringify(response.data.results[0].series[0]));
    console.log(values)

  } catch (error){
    console.log(error);
    
  }
}
