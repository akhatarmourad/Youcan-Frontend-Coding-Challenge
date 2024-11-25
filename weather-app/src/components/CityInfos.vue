<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Settings from './Settings.vue'
import { getFormattedDate, getCurrentTime } from '../libs/utils'
import { MapboxResult } from '../types/types'
import { defaultCity } from '../libs/constants'

const showSettings = ref<boolean>(false)
const currentTime = ref<string>(getCurrentTime())
const currentDate = ref<string>(getFormattedDate())
let timeInterval: ReturnType<typeof setInterval>


/* Define Props Type */
defineProps<{ cityInfo: MapboxResult | null }>()

/* Toggle Settings Component */
const toggleSettings = (): void => {
    showSettings.value = !showSettings.value
}

onMounted(() => {
    timeInterval = setInterval(() => {
        currentTime.value = getCurrentTime()
    }, 60000)
})

onUnmounted(() => {
    clearInterval(timeInterval)
})
</script>

<template>
    <div class="container">
        <!-- Start City Name + Date + Time -->
        <div class="infos-box">
            <h1>
                {{ cityInfo?.properties.name || defaultCity.properties.name }}
            </h1>
            <p>{{ currentDate }}</p>
            <p>{{ currentTime }}</p>
        </div>
        <!-- Ent City Name + Date + Time -->

        <!-- Settings Icon-->
        <div class="gear-box">
            <i class="fa-solid fa-gear gear" @click="toggleSettings"></i>

            <!-- Settings Drop Down Menu -->
            <Settings v-if="showSettings" />
        </div>
    </div>
</template>

<style scoped>
@import '../assets/styles/global.css';

.container {
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 32px;
}

.infos-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

h1 {
    color: var(--primary-color);
    font-weight: 700;
    font-size: 40px;
}

p {
    color: var(--secondary-color);
    font-size: 16px;
    font-weight: 400;
}
.gear-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e1e4ea;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    margin-top: 6px;
}

.gear {
    color: var(--secondary-color);
    padding: 8px;
}

/* Media Queries for Small Screens */
@media (max-width: 480px) {
    h1 {
        font-size: 30px;
    }

    p {
        font-size: 14px;
    }

    .gear {
        padding: 6px;
    }
}
</style>
