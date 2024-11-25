<script lang="ts" setup></script>

<template>
    <div class="container">
        <img src="/youcan.png" alt="YouCan" class="logo" />
        <h1>Error 404...Oups !</h1>
        <p>Page not Found, Please Go Back to Home !</p>

        <router-link to="/" class="link">Go Home</router-link>
    </div>
</template>


<style scoped>
.container {
    width: 100%;
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    color: white;
}

.logo {
    width: 200px;
    height: 200px;
}

.link {
    background-color: #b8266e;
    text-decoration: none;
    padding: 10px 30px;
    border-radius: 10px;
    color: white;
    margin-top: 20px;
}
</style>