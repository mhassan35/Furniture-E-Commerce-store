<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="page-title">Shopping Cart</h1>
      
      <div v-if="cartItems.length === 0" class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <router-link to="/shop" class="shop-btn">Continue Shopping</router-link>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <div class="cart-item" v-for="(item, index) in cartItems" :key="item.id">
            <div class="item-image">
              <img :src="item.image_path" :alt="item.name" />
            </div>
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="item-category">{{ item.category }}</p>
              <div class="item-price">
                <span class="current-price">
                  ${{ item.discount_price ? item.discount_price.toFixed(2) : item.price.toFixed(2) }}
                </span>
                <span v-if="item.discount_price" class="original-price">
                  ${{ item.price.toFixed(2) }}
                </span>
              </div>
            </div>
            <div class="item-quantity">
              <button @click="decreaseQuantity(index)" class="qty-btn">-</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)" class="qty-btn">+</button>
            </div>
            <div class="item-total">
              ${{ ((item.discount_price || item.price) * item.quantity).toFixed(2) }}
            </div>
            <button @click="removeItem(index)" class="remove-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>${{ shipping.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Tax:</span>
            <span>${{ tax.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
          
          <button @click="proceedToCheckout" class="checkout-btn">
            Proceed to Checkout
          </button>
          
          <router-link to="/shop" class="continue-shopping">
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const cartItems = ref([])

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.discount_price || item.price) * item.quantity
  }, 0)
})

const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 15
})

const tax = computed(() => {
  return subtotal.value * 0.08
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value
})

const increaseQuantity = (index) => {
  cartItems.value[index].quantity++
  saveCartToLocalStorage()
}

const decreaseQuantity = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--
  } else {
    removeItem(index)
  }
  saveCartToLocalStorage()
}

const removeItem = (index) => {
  cartItems.value.splice(index, 1)
  saveCartToLocalStorage()
}

const proceedToCheckout = () => {
  if (cartItems.value.length === 0) {
    alert('Your cart is empty!')
    return
  }
  
  // Simulate checkout process
  alert('Order placed successfully! Thank you for your purchase.')
  
  // Clear cart after successful order
  cartItems.value = []
  saveCartToLocalStorage()
}

const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  }
}

onMounted(() => {
  loadCartFromLocalStorage()
})
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.empty-cart i {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.empty-cart h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

.empty-cart p {
  color: #666;
  margin-bottom: 2rem;
}

.shop-btn {
  background: #3498db;
  color: white;
  padding: 1rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.shop-btn:hover {
  background: #2980b9;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.item-category {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.item-price {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.current-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
}

.original-price {
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background: #f8f9fa;
  border-color: #3498db;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.item-total {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  background: #e74c3c;
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.remove-btn:hover {
  background: #c0392b;
}

.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.cart-summary h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
}

.summary-row.total {
  border-top: 2px solid #eee;
  padding-top: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
}

.checkout-btn {
  width: 100%;
  background: #27ae60;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background 0.3s ease;
}

.checkout-btn:hover {
  background: #229954;
}

.continue-shopping {
  display: block;
  text-align: center;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.continue-shopping:hover {
  color: #2980b9;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }
  
  .item-quantity,
  .item-total,
  .remove-btn {
    grid-column: 2;
    justify-self: start;
  }
  
  .item-quantity {
    margin-top: 0.5rem;
  }
  
  .item-total {
    margin-top: 0.5rem;
  }
  
  .remove-btn {
    margin-top: 0.5rem;
  }
}
</style>
