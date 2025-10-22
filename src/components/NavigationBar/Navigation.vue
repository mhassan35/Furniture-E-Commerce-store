<template>
  <header class="navbar">
    <div class="navbar-logo">
      <span>Furniro</span>
    </div>

    <button class="menu-btn" @click="toggleMenu">
      <i class="fa-solid fa-bars"></i>
    </button>

    <MobileMenu
      v-if="isMenuOpen"
      :centerButtons="centerButtons"
      :rightButtons="rightButtons"
    />

    <nav class="navbar-center desktop-only">
      <ul class="navbar-menu">
        <li v-for="(btn, i) in centerButtons" :key="i">
          <a href="/">
            {{ btn.label }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="navbar-icons desktop-only">
      <ul>
        <li><i class="fa-solid fa-cart-shopping"/></li>
        <li><i class="fa-solid fa-user" @click="toggleProfile"/></li>
        <li><i class="fa-solid fa-magnifying-glass" @click="toggleSearch"/></li>
        <li class="like-wrapper" @click="toggleLike">
          <i
            class="fa-solid fa-thumbs-up"
            :class="{ liked: isLiked }"
          />
          <span v-if="likeCount > 0" class="like-count">{{ likeCount }}</span>
        </li>
      </ul>
      <Profile :visible="isShowingProfile" />
      <SearchBar
        :visible="showSearch"
        @search="handleSearch"
        @close="showSearch = false"
      />
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { centerButtons } from "./subComponents/NavigationData";
import MobileMenu from "./MobileNav.vue";
import SearchBar from "./subComponents/SearchBar.vue";
import Profile from "./subComponents/Profile.vue";

const isMenuOpen = ref(false);
const showSearch = ref(false);
const isShowingProfile = ref(false);

const isLiked = ref(false);
const likeCount = ref(0);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

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
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 40px;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);

  .navbar-logo {
    span {
      font-size: 1.5rem;
      font-weight: 700;
      color: #000000;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  .navbar-center {
    .navbar-menu {
      display: flex;
      gap: 3rem;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        a {
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
  }

  .navbar-icons {
    position: relative;

    ul {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    i {
      font-size: 1.3rem;
      color: #000000;
      cursor: pointer;

      &:hover {
        color: #c39550;
      }
    }

    .liked {
      color: #28a745 !important;
    }

    .like-count {
      font-size: 1rem;
      color: #28a745;
      font-weight: 600;
    }
  }
}

.menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.6rem;
  color: #000000;
  cursor: pointer;
}

@media (max-width: 760px) {
  .desktop-only {
    display: none !important;
  }

  .menu-btn {
    display: flex;
  }
}
</style>
