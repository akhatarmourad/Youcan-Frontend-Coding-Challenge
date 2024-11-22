interface MapboxResult {
    id: string;
    properties: {
      name: string;
      place_formatted?: string; 
      coordinates: {
        longitude: number;
        latitude: number;
      };
    };
  }

  export interface CurrentWeather {
    dt: number;
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }
  
  export type HourlyWeather = CurrentWeather & {
    pop?: number;
  };
  
  export interface DialyForecast {
      dt: number;
      temp: {
        day: number;
      }
      weather: Array<{
        description: string;
        icon: string;
      }>;
  }

export interface ForecastWeather {
  hourly: HourlyWeather[] | null;
  daily: DialyForecast[] | null;
}

interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}


export { MapboxResult, CurrentWeather, ForecastWeather, WeatherResponse }
