interface arrayValues{
    
    date: string,
    eCo2: number
    
} 

interface objectValues{

    date:string,
    eCo2:number

}

export function onGetCo2Data(data:any):objectValues[] {
    const dateIndex = 0
    const eCoIndex = 5;
    const values = data.values.map((e:arrayValues[]) => { return {date: e[dateIndex],eCo2: e[eCoIndex]}});
    console.log(values)
    return values;
}