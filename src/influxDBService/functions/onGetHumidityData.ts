interface arrayValues{
    
    date: string,
    humidity: number
    
}

export function onGetHumidityData(data: any):Object[] {
    const dateIndex = 0
    const humidityIndex = 7;
    const values = data.values.map((e: arrayValues[]) => { return { date: e[dateIndex], humidity: e[humidityIndex] } });
    console.log(values);
    return values;
}