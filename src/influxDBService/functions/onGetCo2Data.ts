 
export function onGetCo2Data(data:any) {
    const dateIndex = 0
    const eCoIndex = 5;
    const values = data.values.map((e:any) => { return {date: e[dateIndex],eCo2: e[eCoIndex]}});
    console.log(values)
    return values;
}