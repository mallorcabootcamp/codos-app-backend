interface arrayValues{
    
    date: string,
    temperature: number
    
}

export function onGetTemperatureData(data: any):object[] {
    const dateIndex = 0
    const temperatureIndex = 3;
    const values: object[] = data.values.map((e:arrayValues[]) => { return {date: e[dateIndex],temperature: e[temperatureIndex]}});
    console.log(values);
    return values;
}