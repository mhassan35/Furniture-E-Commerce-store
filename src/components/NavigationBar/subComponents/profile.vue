<template>
    <div class="relative" ref="dropdownRef">
      <div @click="toggleDropdown" class="icon-wrapper">
        <i class="fa-solid fa-user"></i>
      </div>  
      <div v-if="open" class="dropdown">
        <div v-if="!isLoggedIn" class="auth-options">
          <button @click="mode = 'login'">Login</button>
          <button @click="mode = 'signup'">Sign Up</button>
        </div>
        <div v-else class="user-panel">
          <p class="name">{{ user.name }}</p>
          <p class="email">{{ user.email }}</p>
          <div class="balance-section"
               @mouseenter="hoverBalance = true"
               @mouseleave="hoverBalance = false">
            <p class="balance">Balance: ${{ user.balance }}</p>
            <transition name="fade">
              <div v-if="hoverBalance" class="balance-actions">
                <button @click="addFunds">Add Balance</button>
                <button @click="withdrawFunds">Withdraw Funds</button>
              </div>
            </transition>
          </div>
          <button class="logout" @click="logout">Logout</button>
        </div>
        <div v-if="mode === 'login'" class="auth-form">
          <h3>Login</h3>
          <input v-model="form.email" placeholder="Email" />
          <input v-model="form.password" type="password" placeholder="Password" />
          <button @click="loginUser">Login</button>
        </div>
        <div v-if="mode === 'signup'" class="auth-form">
          <h3>Sign Up</h3>
          <input v-model="form.name" placeholder="Full Name" />
          <input v-model="form.email" placeholder="Email" />
          <input v-model="form.password" type="password" placeholder="Password" />
          <button @click="signupUser">Create Account</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  const open = ref(false);
  const hoverBalance = ref(false);
  const mode = ref(null);
  
  const form = ref({ name: "", email: "", password: "" });
  const isLoggedIn = ref(false);
  const user = ref({ name: "", email: "", balance: 0 });
  
  const dropdownRef = ref(null);
  
  const toggleDropdown = () => {
    open.value = !open.value;
    mode.value = null;
  };
  
  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
      open.value = false;
      mode.value = null;
    }
  };
  
  onMounted(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      user.value = JSON.parse(stored);
      isLoggedIn.value = true;
    }
  
    document.addEventListener("click", handleClickOutside);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
  });
  
  // Signup
  const signupUser = () => {
    user.value = {
      name: form.value.name,
      email: form.value.email,
      balance: 0,
    };
    localStorage.setItem("userData", JSON.stringify(user.value));
    isLoggedIn.value = true;
    mode.value = null;
  };
  
  // Login
  const loginUser = () => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email === form.value.email && form.value.password) {
        user.value = parsed;
        isLoggedIn.value = true;
        mode.value = null;
      }
    }
  };
  
  // Logout
  const logout = () => {
    isLoggedIn.value = false;
    user.value = {};
  };
  
  // Add Balance
  const addFunds = () => {
    user.value.balance += 10;
    localStorage.setItem("userData", JSON.stringify(user.value));
  };
  
  // Withdraw Balance
  const withdrawFunds = () => {
    if (user.value.balance >= 10) {
      user.value.balance -= 10;
      localStorage.setItem("userData", JSON.stringify(user.value));
    }
  };
  </script>
  
  <style scoped>
  .icon-wrapper {
    cursor: pointer;
  }
  
  .dropdown {
    position: absolute;
    right: 0;
    top: 45px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 15px;
    width: 230px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 999;
  }
  
  .auth-options button,
  .auth-form button,
  .user-panel .logout,
  .balance-actions button {
    width: 100%;
    margin-top: 10px;
    padding: 8px 0;
    border: none;
    background: #c39550;
    color: white;
    cursor: pointer;
    border-radius: 6px;
    font-weight: 600;
    transition: 0.2s ease;
  }
  
  .auth-options button:hover,
  .auth-form button:hover,
  .user-panel .logout:hover,
  .balance-actions button:hover {
    background: #a67f3d;
  }
  
  .auth-form input {
    width: 100%;
    margin-top: 10px;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  .balance-section {
    position: relative;
    margin-top: 10px;
  }
  
  .balance-actions {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  /* Smooth fade animation */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .name {
    font-weight: 700;
  }
  
  .email {
    font-size: 0.9rem;
    color: #666;
  }
  
  .balance {
    margin-top: 10px;
    font-weight: 600;
  }
  </style>
  