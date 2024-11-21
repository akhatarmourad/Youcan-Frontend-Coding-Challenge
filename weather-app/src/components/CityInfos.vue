<script lang="ts" setup></script>

<template>
    <div class="container">
        <!-- Start City Name + Date + Time -->
        <div class="infos-box">
            <h1>Casablanca</h1>
            <p>Friday, November 8, 2024</p>
            <p>09:34 AM</p>
        </div>
        <!-- Ent City Name + Date + Time -->

        <!-- Settings Icon-->
        <div class="gear-box">
            <i class="fa-solid fa-gear gear"></i>
        </div>
    </div>
</template>

<style scoped>
@import "../assets/styles/global.css";

.container {
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: space-between;
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
    color: var(--secondary-color)
}
.gear-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #E1E4EA;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
}

.gear {
    color: var(--secondary-color);
}
</style>
