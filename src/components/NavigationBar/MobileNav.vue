<template>
  <transition name="dropdown">
    <div class="mobile-dropdown">
      <nav class="navbar-center">
        <ul class="navbar-menu">
          <li v-for="(btn, i) in centerButtons" :key="i">
            <router-link :to="btn.route || '/'" class="nav-link">{{ btn.label }}</router-link>
          </li>
        </ul>
      </nav>

      <div class="navbar-icons">
        <ul>
          <li><i class="fa-solid fa-cart-shopping" /></li>
          <li><i class="fa-solid fa-user" @click="toggleProfile" /></li>
          <li><i class="fa-solid fa-magnifying-glass" @click="toggleSearch" /></li>
          <li class="like-wrapper" @click="toggleLike">
            <i
              class="fa-solid fa-thumbs-up"
              :class="{ liked: isLiked }"
            />
            <span v-if="likeCount > 0" class="like-count">{{ likeCount }}</span>
          </li>
        </ul>

        <!-- Components -->
        <Profile :visible="isShowingProfile" />
        <SearchBar
          :visible="showSearch"
          @search="handleSearch"
          @close="showSearch = false"
        />
      </div>
    </div>
  </transition>
</template>

<script setup>
import SearchBar from "./subComponents/SearchBar.vue";
import Profile from "./subComponents/Profile.vue";
import { ref } from "vue";

defineProps({
  centerButtons: Array,
  rightButtons: Array,
});

const showSearch = ref(false);
const isShowingProfile = ref(false);

const isLiked = ref(false);
const likeCount = ref(0);

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
};

const handleSearch = (query) => {
  console.log("Searching for:", query);
  showSearch.value = false;
};

const toggleProfile = () => {
  isShowingProfile.value = !isShowingProfile.value;
};

const toggleLike = () => {
  if (isLiked.value) {
    isLiked.value = false;
    likeCount.value--;
  } else {
    isLiked.value = true;
    likeCount.value++;
  }
};
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-dropdown {
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  position: absolute;
  top: 60px;
  right: 10px;
  z-index: 10;
  border-radius: 10px;

  .navbar-center {
    .navbar-menu {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0;

      li a, li .nav-link {
        text-decoration: none;
        color: #000000;
        font-size: 1.1rem;
        font-weight: 500;

        &:hover {
          color: #c39550;
        }
      }
    }
  }

  .navbar-icons {
    margin-top: 1rem;

    ul {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0;

      i {
        font-size: 1.3rem;
        color: #000000;
        cursor: pointer;

        &:hover {
          color: #c39550;
        }
      }

      .like-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .liked {
        color: #28a745 !important;
      }

      .like-count {
        font-size: 0.9rem;
        color: #28a745;
        font-weight: 600;
      }
    }
  }
}

@media (min-width: 761px) {
  .mobile-dropdown {
    display: none !important;
  }
}
</style>
