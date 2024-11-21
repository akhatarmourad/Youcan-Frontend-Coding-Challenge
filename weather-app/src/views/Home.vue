<script lang="ts" setup>
import CityInfos from '../components/CityInfos.vue';
import Search from '../components/Search.vue';
import WeatherForecast from '../components/WeatherForecast.vue';
import WeatherMetrics from '../components/WeatherMetrics.vue';
</script>

<template>
    <div>
        <!-- Search Input -->
         <Search />

        <!-- Weather Infos -->
        <div class="outer-container">
            <div class="inner-container">
                <CityInfos />
                <WeatherMetrics />
                <WeatherForecast />
            </div>
        </div>
    </div>
</template>

<style scoped>
.outer-container  {
    background-color: #fff;
    width: 700px;
    height: 500px;
    border-radius: 24px;
    padding: 24px 32px;
}
</style>