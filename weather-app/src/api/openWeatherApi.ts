import axios from "axios";
import { WeatherResponse } from "../types/types";

const WEATHER_API_KEY: string = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherData = async (lat: number, lon: number, units: "metric" | "imperial" = "metric"): Promise<WeatherResponse> => {
    try {
      const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&lang=en&exclude=minutely,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
      const response = await axios.get<WeatherResponse>(URL);
      return response.data;
    } catch (err: unknown) {
      const defaultErrorMessage = "Unable to fetch weather data. Please try again later.";
  
      if (axios.isAxiosError(err)) {
        const statusCode = err.response?.status;
  
        if (statusCode === 401) {
          throw new Error("Invalid API key. Please check your configuration.");
        } else if (statusCode === 404) {
          throw new Error("Weather data for the specified location was not found.");
        } else if (statusCode === 429) {
          throw new Error("Too many requests. Please wait a while and try again.");
        }
      }
  
      console.error("Error fetching weather data:", err);
  
      throw new Error(defaultErrorMessage);
    }
  };