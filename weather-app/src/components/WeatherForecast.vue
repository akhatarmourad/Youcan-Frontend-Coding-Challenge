<script lang="ts" setup>
import { ref } from 'vue';

const activeTab = ref<'daily' | 'forecast'>('daily');

const setActiveTab = (type: 'daily' | 'forecast') => {
  activeTab.value = type;
};
</script>

<template>
    <div>
        <!-- Start Tabs Bar -->
        <div class="btns-box">
           <button
                :class="['btn', { 'bg-white': activeTab === 'daily' }]"
                :aria-pressed="activeTab === 'daily'"
                @click="setActiveTab('daily')"
           >
                Hourly Forecast
           </button>

           <button
                :class="['btn', { 'bg-white': activeTab === 'forecast' }]"
                :aria-pressed="activeTab === 'forecast'"
                @click="setActiveTab('forecast')"
           >
                7-Day Forecast
           </button>
        </div>
        <!-- End Tabs Bar -->

        <div class="weather-data">
            <!-- Start Hourly Forecast -->
            <div v-if="activeTab === 'daily'">
                Hourly Forecast
            </div>
            <!-- End Hourly Forecast -->

            <!-- Start 7-Day Forecast -->
            <div v-if="activeTab === 'forecast'">
                7-Day Forecast
            </div>
            <!-- End 7-Da Forecast -->

            <!-- Overlays -->
            <div class="overlay" />
            <div class="overlay" />
        </div>
    </div>
</template>


<style scoped>
@import "../assets//styles/global.css";

.weather-data {
    position: relative;
    margin-top: 15px;
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