<script lang="ts" setup>
import {
    DropLine,
    SlowDownLine,
    ShowersLine,
    WindyLine,
    Cloud
} from '../assets/icons'
</script>

<template>
    <div class="container">
        <!-- Start Current Temp. & Atmosphere -->
        <div class="flex">
            <div class="temp">
                <Cloud class="cloud-icon" />
                <span class="temp-value">19°</span>
            </div>

            <div class="atmosphere">
                <p class="status">Partially Cloudy</p>
                <p class="trend">Feels like 21°</p>
            </div>
        </div>
        <!-- End Current Temp. & Atmosphere -->

        <!-- Start Current Weather Metrics -->
        <div class="flex">
            <div class="metrics-container">
                <div class="flex metric">
                    <div class="icon-name-box">
                        <DropLine class="metric-icon" />
                        <span class="metric-name">Humidity</span>
                    </div>
                    <span class="metric-value">40%</span>
                </div>

                <div class="flex metric">
                    <div class="icon-name-box">
                        <WindyLine class="metric-icon" />
                        <span class="metric-name">Wind</span>
                    </div>
                    <span class="metric-value">1 km/h</span>
                </div>
            </div>

            <div class="metrics-container">
                <div class="flex metric">
                    <div class="icon-name-box">
                        <ShowersLine class="metric-icon" />
                        <span class="metric-name">Precipitation</span>
                    </div>
                    <span class="metric-value">15%</span>
                </div>

                <div class="flex metric">
                    <div class="icon-name-box">
                        <SlowDownLine class="metric-icon" />
                        <span class="metric-name">AQI</span>
                    </div>
                    <span class="metric-value">141</span>
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
                <span class="progress-bar" />
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
    gap: 60px;
}

/* Style Current temperature */
.temp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
}

.cloud-icon {
    color: #99a0ae;
    font-size: 56px;
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

.status {
    font-size: 20px;
    font-weight: 600;
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
</style>
