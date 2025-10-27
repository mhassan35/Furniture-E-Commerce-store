<template>
  <div id="app-container">
    <Navigation/>
    <main>
      <router-view />
    </main>
    <Footer/>
  </div>
</template>

<script setup>
import Navigation from '@/components/NavigationBar/Navigation.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped> 
#app-container {
  font-family: Arial, sans-serif;
  color: #000000;
}
</style>
