<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import { ForecastWeather } from '../types/types'
import {
    formatTime,
    getInverseTemp,
    getShortDayName,
    getTemp
} from '../libs/utils'
import { SvgIcons } from '../assets/icons'
import { useSettingsStore } from '../stores/settingsStore'

defineProps<{ forecastWeather: ForecastWeather | null }>()

const activeTab = ref<'hourly' | 'daily'>('hourly')

const setActiveTab = (type: 'hourly' | 'daily') => {
    activeTab.value = type
}

const { degree } = storeToRefs(useSettingsStore())

const getIconComponent = (iconKey: string) => SvgIcons[iconKey] || null

const getDefaultWeatherIcon = (mainText: string, dt: number) => {
    const lowerMainText = mainText.toLowerCase()
    const hour = new Date(dt * 1000).getHours()
    const isDaytime = hour >= 6 && hour < 18

    if (lowerMainText.includes('clouds')) {
        return SvgIcons['03d']
    } else if (lowerMainText.includes('rain')) {
        return SvgIcons['10d']
    } else if (lowerMainText.includes('clear')) {
        return isDaytime ? SvgIcons['01d'] : SvgIcons['01n']
    }
}
</script>

<template>
    <div>
        <!-- Start Tabs Bar -->
        <div class="btns-box">
            <button
                :class="['btn', { 'bg-white': activeTab === 'hourly' }]"
                :aria-pressed="activeTab === 'hourly'"
                @click="setActiveTab('hourly')"
            >
                Hourly Forecast
            </button>

            <button
                :class="['btn', { 'bg-white': activeTab === 'daily' }]"
                :aria-pressed="activeTab === 'daily'"
                @click="setActiveTab('daily')"
            >
                7-Day Forecast
            </button>
        </div>
        <!-- End Tabs Bar -->

        <div class="weather-data">
            <div class="scroll-container">
                <!-- Start Hourly -->
                <div v-if="activeTab === 'hourly'" class="forecast-container">
                    <div
                        v-for="hourWeather in forecastWeather?.hourly"
                        :key="hourWeather.dt"
                        class="single-forecast"
                    >
                        <p>{{ formatTime(hourWeather.dt) }}</p>
                        <component
                            v-if="getIconComponent(hourWeather.weather[0].icon)"
                            :is="getIconComponent(hourWeather.weather[0].icon)"
                            class="weather-icon forecast-icon"
                        />
                        <component
                            v-else="
                                getDefaultWeatherIcon(
                                    hourWeather.weather[0].main,
                                    hourWeather.weather[0].icon
                                )
                            "
                            :is="
                                getDefaultWeatherIcon(
                                    hourWeather.weather[0].main,
                                    hourWeather.dt
                                )
                            "
                            class="weather-icon forecast-icon"
                        />
                        <p class="font-semibold">
                            {{ getTemp(hourWeather.temp, degree) }}°
                        </p>
                    </div>
                </div>
                <!-- End Hourly -->

                <!-- Overlay -->
                <div class="overlay" />
            </div>

            <!-- Start 7-Day Forecast -->
            <div
                v-if="activeTab === 'daily'"
                class="forecast-container daily-forecast"
            >
                <div
                    v-for="dayWeather in forecastWeather?.daily"
                    :key="dayWeather.dt"
                    class="single-forecast"
                >
                    <p>{{ getShortDayName(dayWeather.dt) }}</p>
                    <component
                        v-if="getIconComponent(dayWeather.weather[0].icon)"
                        :is="getIconComponent(dayWeather.weather[0].icon)"
                        class="weather-icon forecast-icon"
                    />
                    <p class="font-semibold">
                        {{ getTemp(dayWeather.temp.day, degree) }}°
                    </p>
                    <p class="font-semibold dark-gray">
                        {{ getInverseTemp(dayWeather.temp.day, degree) }}°
                    </p>
                </div>
            </div>
            <!-- End 7-Day Forcast -->
        </div>
    </div>
</template>

<style scoped>
@import '../assets//styles/global.css';

.weather-data {
    margin-top: 15px;
    font-size: 14px;
}

.scroll-container {
    position: relative;
    white-space: nowrap;
    max-width: 100%;
}

.forecast-container {
    display: flex;
    align-items: center;
    gap: 8px;
    overflow-x: auto;
}

.single-forecast {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 10px;
    transition: all 0.25s;
}

.single-forecast:hover {
    background-color: #f5f7fa;
}

.forecast-icon {
    width: 25px;
    height: 25px;
}

.daily-forecast {
    width: 100%;
    justify-content: space-between;
}

.overlay {
    position: absolute;
    width: 20%;
    height: 100%;
    bottom: 0;
    right: 0;
    background: linear-gradient(90deg, transparent, #fff);
    pointer-events: none;
}
</style>
