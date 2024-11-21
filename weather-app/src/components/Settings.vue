<script lang="ts" setup>
import { ref } from 'vue';

const activeDegree = ref<'C' | 'F'>('C');
const activeMeasurement = ref<'metric' | 'imperial'>('metric');

const setActiveDegree = (degree: 'C' | 'F') => {
  activeDegree.value = degree;
};

const setActiveMeasurement = (measurement: 'metric' | 'imperial') => {
  activeMeasurement.value = measurement;
};
</script>

<template>
    <div class="settings">
        <div>
            <p class="title">Temperature</p>
            <div class="btns-box">
                <button 
                    :class="['btn', { 'bg-white': activeDegree === 'C' }]"
                    :aria-pressed="activeDegree === 'C'"
                    @click="setActiveDegree('C')"
                >
                    °C
                </button>

                <button
                    :class="['btn', { 'bg-white': activeDegree === 'F' }]"
                    :aria-pressed="activeDegree === 'F'"
                    @click="setActiveDegree('F')"
                >
                    °F
                </button>
            </div>
        </div>
        
        <div>
            <p class="title">Measurements</p>
            <div class="btns-box">
                <button 
                    :class="['btn', { 'bg-white': activeMeasurement === 'metric' }]"
                    :aria-pressed="activeMeasurement === 'metric'"
                    @click="setActiveMeasurement('metric')"
                >
                    Metric
                </button>

                <button 
                    :class="['btn', { 'bg-white': activeMeasurement === 'imperial' }]"
                    :aria-pressed="activeMeasurement === 'imperial'"
                    @click="setActiveMeasurement('imperial')"
                >
                    Imperial
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "../assets//styles/global.css";

.settings {
  background-color: white;
  width: 235px;
  border: 1px solid #E1E4EA;
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
</style>