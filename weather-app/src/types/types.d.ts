interface MapboxResult {
    id: string
    properties: {
        name: string
        place_formatted?: string
        coordinates: {
            longitude: number
            latitude: number
        }
    }
}

export interface CurrentWeather {
    dt: number
    temp: number
    feels_like: number
    humidity: number
    wind_speed: number
    weather: Array<{
        main: string
        description: string
        icon: string
    }>
}

export type HourlyWeather = CurrentWeather & {
    pop?: number
}

export interface DialyForecast {
    dt: number
    temp: {
        day: number
    }
    weather: Array<{
        main: string
        description: string
        icon: string
    }>
}

export interface ForecastWeather {
    hourly: HourlyWeather[] | null
    daily: DialyForecast[] | null
}

interface WeatherResponse {
    current: CurrentWeather
    hourly: HourlyWeather[]
    daily: DailyWeather[]
}

interface AQIResponse {
    list: Array<{
        main: {
            aqi: number
        }
        components: {
            co: number
            no: number
            no2: number
            o3: number
            so2: number
            pm2_5: number
            pm10: number
            nh3: number
        }
    }>
}

interface AQIData {
    category: string
    aqi: number
    index: number
    pollutant: string
}

interface Coordinates {
    lat: number
    lon: number
}

export {
    MapboxResult,
    CurrentWeather,
    ForecastWeather,
    WeatherResponse,
    AQIResponse,
    Coordinates,
    AQIData
}
