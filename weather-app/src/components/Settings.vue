<script lang="ts" setup>
import { useSettingsStore } from '../stores/settingsStore'
import { storeToRefs } from 'pinia'

const settingsStore = useSettingsStore()

const { degree, measurement } = storeToRefs(settingsStore)

function toggleDegree(degree: 'C' | 'F'): void {
    settingsStore.toggleDegree(degree)
}

function toggleMeasurement(measurement: 'metric' | 'imperial'): void {
    settingsStore.toggleMeasurement(measurement)
}
</script>

<template>
    <div class="settings">
        <div>
            <p class="title">Temperature</p>
            <div class="btns-box">
                <button
                    :class="['btn', { 'bg-white': degree === 'C' }]"
                    :aria-pressed="degree === 'C'"
                    @click="toggleDegree('C')"
                >
                    °C
                </button>

                <button
                    :class="['btn', { 'bg-white': degree === 'F' }]"
                    :aria-pressed="degree === 'F'"
                    @click="toggleDegree('F')"
                >
                    °F
                </button>
            </div>
        </div>

        <div>
            <p class="title">Measurements</p>
            <div class="btns-box">
                <button
                    :class="['btn', { 'bg-white': measurement === 'metric' }]"
                    :aria-pressed="measurement === 'metric'"
                    @click="toggleMeasurement('metric')"
                >
                    Metric
                </button>

                <button
                    :class="['btn', { 'bg-white': measurement === 'imperial' }]"
                    :aria-pressed="measurement === 'imperial'"
                    @click="toggleMeasurement('imperial')"
                >
                    Imperial
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '../assets//styles/global.css';

.settings {
    background-color: white;
    width: 235px;
    border: 1px solid #e1e4ea;
    border-radius: 8px;
    padding: 15px;
    position: absolute;
    top: 40px;
    right: 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 25px 0px;
}

/* Adjust Settings Drop Down for Medium Screens */
@media (max-width: 768px) {
    .settings {
        width: 200px;
    }
}

/* Media Queries for Small Screens */
@media (max-width: 480px) {
    .settings {
        width: 190px;
        font-size: 13px;
    }
}
</style>
