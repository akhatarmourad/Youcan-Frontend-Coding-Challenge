<script lang="ts" setup>
import { ref, defineProps, watch, onMounted } from 'vue'
import type {
    AQIData,
    Coordinates,
    CurrentWeather,
    HourlyWeather
} from '../types/types'
import { getAirQualityData } from '../api/openWeatherApi'
import { defaultCity } from '../libs/constants'
import { calculateMaxPollutantAQI, getTemp, getWindSpeedUnit } from '../libs/utils'
import { useSettingsStore } from '../stores/settingsStore'
import { storeToRefs } from 'pinia'

import {
    DropLine,
    SlowDownLine,
    ShowersLine,
    WindyLine,
    SvgIcons
} from '../assets/icons'

const AQIInfos = ref<AQIData | null>(null)
const error = ref<string | null>(null)

const { degree, measurement } = storeToRefs(useSettingsStore())

const props = defineProps<{
    currentWeather: CurrentWeather | null
    hourlyForecast: HourlyWeather[] | null
    coordinates: Coordinates
}>()

const getIconComponent = (iconKey: string) => {
    if (SvgIcons[iconKey]) {
        return SvgIcons[iconKey]
    }

    const currentHour = new Date().getHours()
    const isDayTime = currentHour >= 6 && currentHour < 18
    return isDayTime ? SvgIcons['01d'] : SvgIcons['01n']
}

const getAQI = async (latitude: number, longitude: number): Promise<void> => {
    try {
        const response = await getAirQualityData(latitude, longitude)
        /* Set Data Variables */

        /* Calculate Air Quality Index */
        AQIInfos.value = calculateMaxPollutantAQI(response.list[0]?.components)

        error.value = null
    } catch (err: unknown) {
        if (err instanceof Error) {
            error.value = `Failed to fetch weather AQI: ${err.message}`
        } else {
            error.value = 'An unknown error occurred. Please try again.'
        }
    }
}

// Call `getAQI` on component mount with initial coordinates
onMounted(() => {
    if (props.coordinates) {
        getAQI(props.coordinates.lat, props.coordinates.lon)
    } else {
        getAQI(
            defaultCity.properties.coordinates.latitude,
            defaultCity.properties.coordinates.longitude
        )
    }
})

watch(
    () => props.coordinates,
    (newCoordinates) => {
        if (newCoordinates) {
            getAQI(newCoordinates.lat, newCoordinates.lon)
        }
    },
    { deep: true }
)

/* Function to calculate the with of the Progress Bar */
function calculateWidthPercentage(aqi: number, maxAQI: number = 300) {
    if (aqi <= 0) return 0
    if (aqi >= maxAQI) return 100

    return Math.round((aqi / maxAQI) * 100)
}
</script>

<template>
    <div class="container">
        <!-- Start Current Temp. & Atmosphere -->
        <div class="flex">
            <div class="temp">
                <component
                    v-if="
                        getIconComponent(currentWeather?.weather[0].icon || '')
                    "
                    :is="
                        getIconComponent(currentWeather?.weather[0].icon || '')
                    "
                    class="weather-icon temp-icon"
                />
                <span class="temp-value"
                    >{{ getTemp(currentWeather?.temp ?? 0, degree, measurement) }}°</span
                >
            </div>

            <div class="atmosphere">
                <p class="description">
                    {{ currentWeather?.weather[0].description }}
                </p>
                <p class="trend">
                    Feels like
                    {{ getTemp(currentWeather?.feels_like ?? 0, degree, measurement) }}°
                </p>
            </div>
        </div>
        <!-- End Current Temp. & Atmosphere -->

        <!-- Start Current Weather Metrics -->
        <div class="metrics-wrapper">
            <div class="metrics-container">
                <div class="flex metric">
                    <div class="icon-name-box">
                        <DropLine class="metric-icon" />
                        <span class="metric-name">Humidity</span>
                    </div>
                    <span class="metric-value"
                        >{{ Math.round(currentWeather?.humidity ?? 0) }}%</span
                    >
                </div>

                <div class="flex metric">
                    <div class="icon-name-box">
                        <WindyLine class="metric-icon" />
                        <span class="metric-name">Wind</span>
                    </div>
                    <span class="metric-value"
                        >{{
                            Math.round(currentWeather?.wind_speed ?? 0)
                        }}

                        {{ getWindSpeedUnit(measurement) }}
                        </span
                    >
                </div>
            </div>

            <div class="metrics-container">
                <div class="flex metric">
                    <div class="icon-name-box">
                        <ShowersLine class="metric-icon" />
                        <span class="metric-name">Precipitation</span>
                    </div>
                    <span class="metric-value"
                        >{{ hourlyForecast?.[0]?.pop ?? 0 }}%</span
                    >
                </div>

                <div class="flex metric">
                    <div class="icon-name-box">
                        <SlowDownLine class="metric-icon" />
                        <span class="metric-name">AQI</span>
                    </div>
                    <span class="metric-value">{{
                        Math.round(AQIInfos?.aqi ?? 0)
                    }}</span>
                </div>
            </div>
        </div>
        <!-- End Current Weather Metrics -->

        <!-- Air Quality Index -->
        <div class="aqi">
            <div class="flex">
                <span>AQI</span>
                <div>
                    <span>300</span>
                    <i class="fa-solid fa-circle-info info-icon"></i>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="bar-box">
                <span class="bar" />
                <span
                    class="progress-bar"
                    :style="{
                        width:
                            calculateWidthPercentage(AQIInfos?.aqi ?? 0) + '%'
                    }"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '../assets/styles/global.css';

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px 0px;
    margin-bottom: 40px;
}

.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
}

.metrics-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    gap: 60px;
}

/* Style Current temperature */
.temp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.temp-icon {
    width: 58px;
    height: 58px;
}

.temp-value {
    font-size: 56px;
    font-weight: 700;
}

/* Style current atmosphere */
.atmosphere {
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: end;
}

.description {
    font-size: 20px;
    font-weight: 600;
    text-transform: capitalize;
    text-align: right;
}

.trend {
    color: var(--secondary-color);
    font-size: 16px;
}

/* Metrics Styling */
.metrics-container {
    flex: 1;
}

.metric {
    flex: 1;
    margin-bottom: 10px;
}

.icon-name-box {
    display: flex;
    align-items: center;
}

.metric-value {
    font-weight: 600;
    font-size: 14px;
}

.metric-name {
    font-size: 14px;
}

.metric-icon {
    margin-right: 7px;
}

/* Air Quality Index */
.aqi {
    font-size: 14px;
}

.info-icon {
    margin-left: 8px;
    color: #e1e4ea;
}

.bar-box {
    position: relative;
    margin-top: 6px;
}

.bar {
    display: block;
    width: 100%;
    height: 6px;
    border-radius: 10px;
    background-color: #e1e4ea;
}

.progress-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    height: 6px;
    border-radius: 10px;
    width: 20%;
    background-color: #f74f4f;
}

/* Media Queries for Medium Screens */
@media (max-width: 768px) {
    .metrics-wrapper {
        flex-direction: column;
        align-items: start;
        gap: 0px;
    }

    .metrics-container {
        width: 100%;
    }
}

/* Media Queries for Small Screens */
@media (max-width: 480px) {
    .temp-value {
        font-size: 40px;
    }

    .temp-icon {
        width: 41px;
        height: 41px;
    }

    .description {
        font-size: 18px;
    }

    .trend {
        font-size: 14px;
    }
}
</style>
