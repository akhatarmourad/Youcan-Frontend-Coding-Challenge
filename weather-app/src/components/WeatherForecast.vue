<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { ForecastWeather } from '../types/types'
import { formatTime, getShortDayName } from '../libs/utils'
import { SvgIcons } from '../assets/icons';

defineProps<{ forecastWeather: ForecastWeather | null }>()

const activeTab = ref<'hourly' | 'daily'>('hourly')

const setActiveTab = (type: 'hourly' | 'daily') => {
    activeTab.value = type
}

const getIconComponent = (iconKey: string) => SvgIcons[iconKey] || null;
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
                Hourly Forcast
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
                            class="weather-icon"
                        />
                        <p>{{ console.log(`Icon : ${hourWeather.weather[0].icon}`) }}</p>
                        <p class="font-semibold">{{ Math.round(hourWeather.temp) }}°</p>
                    </div>
                </div>
                <!-- End Hourly -->

                <!-- Start 7-Day Forecast -->
                <div v-if="activeTab === 'daily'" class="forecast-container">
                    <div
                        v-for="dayWeather in forecastWeather?.daily"
                        :key="dayWeather.dt"
                        class="single-forecast"
                    >
                        <p>{{ getShortDayName(dayWeather.dt) }}</p>
                        <p>{{ Math.round(dayWeather.temp.day) }}°</p>
                    </div>
                </div>
                <!-- End 7-Day Forcast -->
            </div>

            <!-- Overlay -->
            <div class="overlay" />
        </div>
    </div>
</template>

<style scoped>
@import '../assets//styles/global.css';

.weather-data {
    position: relative;
    margin-top: 15px;
    font-size: 14px;
    overflow-x: hidden;
}

.scroll-container {
    overflow-x: auto; 
}

.forecast-container {
    display: flex;
    align-items: center;
    gap: 8px;
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
    transition: all .25s;
}

.single-forecast:hover {
    background-color: #f5f7fa;
}

.weather-icon {
    object-fit: contain;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlay {
    background: linear-gradient(90deg, transparent, white);
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 20%; 
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
