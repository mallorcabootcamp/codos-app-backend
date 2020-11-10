import moment from 'moment';


export const CalculateTimeScaleValue = (fromDate:string , toDate:string) => {
    const timeRecivedDiference = parseInt(toDate) - parseInt(fromDate);
    const threeDaysDiference = moment().valueOf()/1000 - moment().subtract(3, 'days').valueOf()/1000;
    const timeScaleValue = timeRecivedDiference < threeDaysDiference ? "60m" : "1d";
    return timeScaleValue;
}