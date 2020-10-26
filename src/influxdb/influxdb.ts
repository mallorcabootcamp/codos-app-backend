import axios from 'axios';

const url: any = process.env.INFLUX_URL;
const token: any = process.env.INFLUX_TOKEN;
const db:any = process.env.INFLUX_DB;

export const influxDbGet = () =>{ 
    axios({
    method: 'get',
    url: url,
    timeout: 1000,
    params: {
        q: 'SELECT * FROM "@erguro1973" LIMIT 100',
        db: db
      },
    headers: {'Authorization': token}
  })
  .then(function (response) {
    console.log('yooo' + response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  

}