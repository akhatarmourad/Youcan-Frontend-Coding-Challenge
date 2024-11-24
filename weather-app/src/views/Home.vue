<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { CurrentWeather, ForecastWeather, MapboxResult } from '../types/types'
import { getWeatherData } from '../api/openWeatherApi'

import CityInfos from '../components/CityInfos.vue'
import Search from '../components/Search.vue'
import WeatherForecast from '../components/WeatherForecast.vue'
import WeatherMetrics from '../components/WeatherMetrics.vue'
import { defaultCity } from '../libs/constants'

const selectedCityInfo = ref<MapboxResult | null>(null)
const currentWeather = ref<CurrentWeather | null>(null)
const forecastWeather = ref<ForecastWeather | null>(null)
const errorMessage = ref<string | null>(null)
const coordinates = ref({ lat: 0, lon: 0 });

/* Fetch Weather Data */
const fetchWeatherData = async (
    latitude: number,
    longitude: number
): Promise<void> => {
    try {
        const response = await getWeatherData(latitude, longitude)

        /* Set Data Variables */
        const { current, hourly, daily } = response
        currentWeather.value = current
        forecastWeather.value = { hourly: hourly, daily: daily }

        errorMessage.value = null
    } catch (error: unknown) {
        if (error instanceof Error) {
            errorMessage.value = `Failed to fetch weather data: ${error.message}`
        } else {
            errorMessage.value = 'An unknown error occurred. Please try again.'
        }
    }
}

/* Handle Selected City */
const handleResultSelected = async (result: MapboxResult): Promise<void> => {
    selectedCityInfo.value = result
    const { latitude, longitude } = result.properties.coordinates
    coordinates.value = {lat: result.properties.coordinates.latitude, lon: result.properties.coordinates.longitude }
    await fetchWeatherData(latitude, longitude)
}

/* Set Default City on Load (Casa) */
onMounted(async () => {
    await handleResultSelected(defaultCity)
})
</script>

<template>
    <div>
        <!-- Search Input -->
        <Search @result-selected="handleResultSelected" />

        <!-- Weather Infos -->
        <div class="outer-container">
            <div class="inner-container">
                <CityInfos :cityInfo="selectedCityInfo" />
                <WeatherMetrics
                    :currentWeather="currentWeather"
                    :hourlyForecast="forecastWeather?.hourly ?? null"
                    :coordinates="coordinates"
                />
                <WeatherForecast :forecastWeather="forecastWeather" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.outer-container {
    background-color: #fff;
    width: 700px;
    min-height: 590px;
    border-radius: 24px;
    padding: 24px 32px;
}
</style>
