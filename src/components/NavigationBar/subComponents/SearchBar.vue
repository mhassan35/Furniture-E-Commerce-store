<template>
    <transition name="fade-slide">
      <div v-if="visible" class="search-bar">
        <input
          type="text"
          placeholder="Search..."
          class="search-input"
          @keydown.enter="submitSearch"
        />
      </div>
    </transition>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  
  const { visible } = defineProps({
    visible: Boolean,
  });
  
  const emit = defineEmits(["search", "close"]);
  
  const submitSearch = (e) => {
    const query = e.target.value.trim();
    if (query) emit("search", query);
  };
  </script>
  
  
<style scoped>
.search-bar {
  position: absolute;
  top: 100%;
  right: 40px;
  width: 260px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 100;
}
  
.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;
}
  
.search-input:focus {
  border-color: #c39550;
}
  
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
  
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
  