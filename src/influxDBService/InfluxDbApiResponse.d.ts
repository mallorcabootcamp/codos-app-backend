export interface InfluxDbApiResponse {
    results: InfluxDbApiResponseResults[];
}

interface InfluxDbApiResponseResults {
    series: InfluxDbApiResponseSeries[]
}

interface InfluxDbApiResponseSeries {
    name: string;
    columns: string[]
    values: any[][]
}