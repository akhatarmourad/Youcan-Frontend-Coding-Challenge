<script lang="ts" setup>
import { ref } from 'vue';

const activeDegree = ref<string>('C');
const activeMeasurement = ref<string>('metric');

const setActiveDegree = (degree: string) => {
  activeDegree.value = degree;
}

const setActiveMeasurement = (measurement: string) => {
  activeMeasurement.value = measurement;
}
</script>

<template>
    <div class="settings">
        <div>
            <p class="title">Temperature</p>
            <div class="btns-box">
                <button 
                    :class="{'bg-white': activeDegree === 'C'}"
                    @click="setActiveDegree('C')"
                >
                    °C
                </button>

                <button
                    :class="{'bg-white': activeDegree === 'F'}"
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
                    :class="{'bg-white': activeMeasurement === 'metric'}"
                    @click="setActiveMeasurement('metric')"
                >
                    Metric
                </button>

                <button 
                    :class="{'bg-white': activeMeasurement === 'imperial'}"
                    @click="setActiveMeasurement('imperial')"
                >
                    Imperial
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
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

.title {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
}

.btns-box {
    background-color: #F5F7FA;
    padding: 4px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

button {
    border: none;
    outline: none;
    padding: 5px 10px;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 400;
    flex: 1;
}

.bg-white {
  background-color: white;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
}
</style>