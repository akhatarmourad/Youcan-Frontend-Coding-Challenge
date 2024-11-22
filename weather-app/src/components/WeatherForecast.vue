<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { ForecastWeather } from '../types/types';
import { formatTime, getWeatherIcon } from '../libs/utils';

defineProps<{ forecastWeather: ForecastWeather | null }>();

const activeTab = ref<'hourly' | 'daily'>('hourly');

const setActiveTab = (type: 'hourly' | 'daily') => {
    activeTab.value = type
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
                Hourly daily
            </button>

            <button
                :class="['btn', { 'bg-white': activeTab === 'daily' }]"
                :aria-pressed="activeTab === 'daily'"
                @click="setActiveTab('daily')"
            >
                7-Day daily
            </button>
        </div>
        <!-- End Tabs Bar -->

        <div class="weather-data">
            <!-- Start Hourly -->
            <div v-if="activeTab === 'hourly'" class="forecast-container">
                <div v-for="hourWeather in forecastWeather?.hourly" :key="hourWeather.dt" class="single-forecast">
                </div>
            </div>
            <!-- End Hourly -->

            <!-- Start 7-Day Forecast -->
            <div v-if="activeTab === 'daily'" class="forecast-container">
                <div v-for="dayWeather in forecastWeather?.daily" :key="dayWeather.dt">
                </div>
            </div>
            <!-- End 7-Day Forcast -->

            <!-- Overlays -->
            <div class="overlay" />
            <div class="overlay" />
        </div>
    </div>
</template>

<style scoped>
@import '../assets//styles/global.css';

.weather-data {
    position: relative;
    margin-top: 15px;
    overflow: scroll;
}

.forecast-container {
    display: flex;
    align-items: center;
    gap: 30px;
}

.single-forecast {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.overlay {
    width: 20%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
}

.right {
    right: 0;
    background: linear-gradient(0deg, transparent, #fff);
}

.left {
    left: 0;
    background: linear-gradient(0deg, #fff, transparent);
}
</style>
