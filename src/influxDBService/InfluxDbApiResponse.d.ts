export interface InfluxDbApiResponse {
    results: InfluxDbApiResponseResults[];
}

interface InfluxDbApiResponseResults {
    series: InfluxDbApiResponseSeries[]
}

interface InfluxDbApiResponseSeries {
    values: number
}