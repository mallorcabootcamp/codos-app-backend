interface objectValues{

    date:string,
    eCo2:number

}

export function onGetDataFromDateToDate(dataFrom:objectValues, dataTo:objectValues, value:objectValues[]): Object[] {
    const values = value.filter((e:objectValues) => e.date >= dataFrom.date && e.date <= dataTo.date);
    console.log(values);
    return values;
}