<template>
  <div id="app-container">
    <Navigation/>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navigation from '@/components/NavigationBar/Navigation.vue'
</script>

<style scoped> 
#app-container {
  font-family: Arial, sans-serif;
  color: #000000;
}
</style>
