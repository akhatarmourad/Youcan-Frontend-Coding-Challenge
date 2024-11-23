<script lang="ts" setup>
import { ref } from 'vue'
import { fetchMapboxResults } from '../api/mapboxApi'
import type { MapboxResult } from '../types/types'

const searchQuery = ref<string>('')
const mapboxSearchResults = ref<MapboxResult[] | null>(null)
const showList = ref<boolean>(false)
const errorMessage = ref<string>('')
const timeout = ref(0)

/* Fetch results from MapBox using Search Query */
const handleInput = () => {
    if (timeout.value) clearTimeout(timeout.value)

    timeout.value = setTimeout(async () => {
        if (searchQuery.value.trim() !== '') {
            try {
                mapboxSearchResults.value = await fetchMapboxResults(
                    searchQuery.value
                )
                showList.value = true
                errorMessage.value = ''
            } catch (error) {
                errorMessage.value =
                    'Failed to fetch results, please try again!'
                mapboxSearchResults.value = null
                showList.value = false
            }
        } else {
            mapboxSearchResults.value = null
            showList.value = false
        }
    }, 1000)
}

/* Emit Function */
const emit =
    defineEmits<(event: 'result-selected', result: MapboxResult) => void>()

/* Handle Result Selection */
const selectResult = (result: MapboxResult) => {
    emit('result-selected', result)
    searchQuery.value = result.properties.name
    showList.value = false
}
</script>

<template>
    <div class="container">
        <!-- Search Input -->
        <input
            type="text"
            class="input"
            placeholder="Search for a Moroccan City..."
            v-model="searchQuery"
            @input="handleInput"
        />

        <!-- Suggestions List -->
        <ul class="list" v-if="mapboxSearchResults && showList">
            <p v-if="errorMessage">{{ errorMessage }}</p>

            <template v-else>
                <li
                    v-for="result in mapboxSearchResults"
                    :key="result.id"
                    @click="selectResult(result)"
                >
                    <p>{{ result.properties.name }}</p>
                    <p>{{ result.properties.place_formatted }}</p>
                </li>
            </template>
        </ul>
    </div>
</template>

<style scoped>
@import '../assets/styles/global.css';

.container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
}

.input {
    outline: none;
    border-radius: 10px;
    padding: 15px;
    width: 100%;
    border: none;
    background-color: #525050;
    color: #afafaf;
    box-sizing: border-box;
}

::placeholder {
    color: #afafaf;
}

::-ms-input-placeholder {
    color: #afafaf;
}

input:focus::placeholder {
    color: #afafaf;
}

.list {
    list-style-type: none;
    border-radius: 10px;
    background-color: white;
    position: absolute;
    top: 55px;
    padding: 0;
    width: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
}

.list li {
    cursor: pointer;
    padding: 5px 15px;
    border-radius: 10px;
    transition: all 0.35s;
}

.list li:hover {
    background-color: #e9e9e9;
    color: black;
}

.list li p {
    margin: 5px 0px;
}

.list li p:first-child {
    font-weight: bold;
    color: #222;
}

.list li p:nth-child(2) {
    font-weight: normal;
    color: #555;
}
</style>
