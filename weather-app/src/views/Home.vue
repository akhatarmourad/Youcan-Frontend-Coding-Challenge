<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { CurrentWeather, ForecastWeather, MapboxResult } from '../types/types'
import { getWeatherData } from '../api/openWeatherApi'
import { useSettingsStore } from '../stores/settingsStore'
import { defaultCity } from '../libs/constants'

import { CityInfos, Search, WeatherMetrics, WeatherForecast, Footer } from '../components'

const selectedCityInfo = ref<MapboxResult | null>(null)
const currentWeather = ref<CurrentWeather | null>(null)
const forecastWeather = ref<ForecastWeather | null>(null)
const errorMessage = ref<string | null>(null)
const coordinates = ref({ lat: 0, lon: 0 })

const { measurement } = storeToRefs(useSettingsStore())

/* Fetch Weather Data */
const fetchWeatherData = async (
    latitude: number,
    longitude: number,
    measurement: string
): Promise<void> => {
    try {
        const response = await getWeatherData(
            latitude,
            longitude,
            measurement as 'metric' | 'imperial'
        )

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
    coordinates.value = {
        lat: result.properties.coordinates.latitude,
        lon: result.properties.coordinates.longitude
    }
    await fetchWeatherData(latitude, longitude, measurement.value)
}

/* Set Default City on Load (Casa) */
onMounted(async () => {
    await handleResultSelected(defaultCity)
})

/* Watch for Changes in Measurement */
watch(measurement, async () => {
    console.log(measurement.value)
    console.log(coordinates.value.lat, coordinates.value.lon)
    
        const res = await fetchWeatherData(
            coordinates.value.lat,
            coordinates.value.lon,
            measurement.value
        )

        console.log(res);
})
</script>

<template>
    <div class="wrapper">
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

        <!-- Footer -->
        <Footer />
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 320px;
    min-height: 100vh;
}

.outer-container {
    background-color: #fff;
    width: 700px;
    min-height: 590px;
    border-radius: 24px;
    padding: 24px 32px;
}

/* Media Queries for Medium Screens */
@media (max-width: 768px) {
    .wrapper {
        padding: 30px 40px;
    }

    .outer-container {
        width: 100%;
    }
}

/* Media Queries for Small Screens */
@media (max-width: 480px) {
    .wrapper {
        padding: 5px;
    }
}
</style>
