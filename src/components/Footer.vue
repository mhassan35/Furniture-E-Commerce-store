<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <svg width="150" height="40" viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(40, 10)">
              <rect x="0" y="0" width="12" height="40" fill="#B68B40"/>
              <rect x="18" y="0" width="12" height="40" fill="#A37E39"/>
              <rect x="0" y="17.5" width="30" height="5" fill="#FFFFFF"/>
            </g>
            <text x="80" y="40" font-size="30" font-weight="600" fill="#FFFFFF">
              F<tspan dx="2">U</tspan><tspan dx="2">R</tspan><tspan dx="2">N</tspan><tspan dx="2">O</tspan>
            </text>
          </svg>
          <p>Quality Furniture for Every Home</p>
        </div>

        <div class="footer-links">
          <router-link to="/">Home</router-link>
          <router-link to="/shop">Shop</router-link>
          <router-link to="/blog">Blog</router-link>
          <router-link to="/contact">Contact</router-link>
          <router-link to="/cart">Cart</router-link>
        </div>

        <div class="social-links">
          <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 Furno. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Simple footer - no complex functionality needed
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-logo p {
  color: #bdc3c7;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #3498db;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #34495e;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: background 0.3s ease;
}

.social-link:hover {
  background: #3498db;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 1rem;
  text-align: center;
}

.footer-bottom p {
  color: #bdc3c7;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
  }
}
</style>
