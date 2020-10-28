import axios from 'axios';
import { config } from 'dotenv';
config();


export async function influxDbOnConnect(url:string, token:string, db:string, user:string) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      timeout: 1000,
      params: {
        q: `SELECT * FROM ${user} LIMIT 20`,
        db: db
      },
      headers: { 'Authorization': token }
    })
    const values = JSON.parse(JSON.stringify(response.data.results[0].series[0]));
    // console.log(values)
    return values;

  } catch (error){
    console.log(error);
    
  }
}
