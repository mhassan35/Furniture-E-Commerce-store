<template>
    <transition name="fade-slide">
      <div v-if="visible" ref="dropdownRef" class="profile-dropdown">
        <ul>
          <li v-for="(item, i) in menuItems" :key="i" @click="selectItem(item)">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, watch, onBeforeUnmount } from "vue";
  
  const props = defineProps({
    visible: Boolean,
  });
  
  const emit = defineEmits(["select", "close"]);
  
  const dropdownRef = ref(null);
  
  const menuItems = [
    { label: "My Profile", icon: "fa-solid fa-user" },
    { label: "Orders", icon: "fa-solid fa-box" },
    { label: "Wishlist", icon: "fa-solid fa-heart" },
    { label: "Logout", icon: "fa-solid fa-right-from-bracket" },
  ];
  
  const selectItem = (item) => {
    emit("select", item);
  };
  
  // Handle click outside to close
  const handleClickOutside = (e) => {
    if (props.visible && dropdownRef.value && !dropdownRef.value.contains(e.target)) {
      emit("close");
    }
  };
  
  watch(
    () => props.visible,
    (val) => {
      if (val) window.addEventListener("click", handleClickOutside);
      else window.removeEventListener("click", handleClickOutside);
    }
  );
  
  onBeforeUnmount(() => {
    window.removeEventListener("click", handleClickOutside);
  });
  </script>
  
  <style scoped>
  .profile-dropdown {
    position: absolute;
    top: 100%;
    right: 20px;
    width: 200px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    z-index: 150;
  }
  
  .profile-dropdown ul {
    list-style: none;
    margin: 0;
    padding: 8px 0;
  }
  
  .profile-dropdown li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    font-size: 0.95rem;
    color: #333;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
  }
  
  .profile-dropdown li i {
    font-size: 1rem;
    color: #c39550;
  }
  
  .profile-dropdown li:hover {
    background: #f9f6f1;
    color: #c39550;
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
  