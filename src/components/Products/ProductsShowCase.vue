<template>
  <div class="main-container">
    <h2 class="title">
      Products Showcase
    </h2>
    <p class="subtitle">
      Get inspired. Your perfect home starts with these collections.
    </p>
    <div v-if="loading" class="loading">
      Loading products...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="card-grid">
      <div class="card" v-for="(item, index) in products" :key="item.id || index">
        <div class="image-wrapper">
          <img :src="item.image_path" :alt="item.name" />
        </div>
        <div class="card-content">
          <h3>{{ item.name }}</h3>
          <p class="category">{{ item.category }}</p>
          <div class="price-section">
            <span class="price">
              ${{ item.discount_price ? item.discount_price.toFixed(2) : item.price.toFixed(2) }}
            </span>
            <span v-if="item.discount_price" class="old-price">
              ${{ item.price.toFixed(2) }}
            </span>
          </div> 
          <button class="details-btn" @click="openModal(item)">
            <i class="fas fa-info-circle"/> 
            More Details
          </button>
        </div>
      </div>
    </div>
    <ProductDetails
      v-if="showModal"
      :product="selectedProduct"
      :closeModal="closeModal"
    />
    <button class="more-product">
      More Produect
    </button>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import ProductDetails from "./ProductDetails.vue"

const products = ref([])
const loading = ref(true)
const error = ref("")
const showModal = ref(false)
const selectedProduct = ref(null)

const openModal = (product) => {
  console.log("Opening modal for:", product.name)
  selectedProduct.value = product
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProduct.value = null
}

onMounted(async () => {
  try {
    const res = await fetch("https://furniture-api.fly.dev/v1/products?limit=12")
    const data = await res.json()
    if (!data.success) throw new Error("Failed to fetch products")
    products.value = data.data
  } catch (err) {
    error.value = "Error loading products: " + err.message
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.main-container {
  text-align: center;
  padding: 2.5rem 1.3rem;
  .title {
    font-size: 2rem;
    font-weight: 700;
    color: #222;
  }
  .subtitle {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 0.5rem;
  }
  .loading,
  .error {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
    margin-top: 3rem;
  }


  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
    margin: 0 auto;
    max-width: 1200px;
    justify-items: center;

    .card {
      background: #fff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;

      // this is just layer for handle image width and height
    // .image-wrapper {
      //   width: 100%;
      //   aspect-ratio: 16 / 11;
      //   overflow: hidden;
      //   background: #f9f9f9;

        img {
          width: 100%;
          height: 100%;
          // object-fit: contain;
        }

      // }

      .card-content {
        padding: 1rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h3 {
          text-align: start;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .category {
          text-align: start;
          color: #888;
          font-size: 0.9rem;
        }

        .price-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;

          .price {
            font-size: 1rem;
            font-weight: 600;
            color: #1e88e5;
          }

          .old-price {
            font-size: 0.9rem;
            color: #999;
            text-decoration: line-through;
          }
        }

        .details-btn {
          background: #1e88e5;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1rem;
          cursor: pointer;
          transition: background 0.3s;

          i {
            margin-right: 0.4rem;
          }

          &:hover {
            background: #1565c0;
          }
        }
      }
    }
  }
  .more-product {
    background: #1e88e5;
    color: white;
    border: none;
    margin-top: 8px;
    border-radius: 8px;
    padding: 0.6rem 1rem;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background: #1565c0;
    }
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 2rem 1rem;
  }

  .card-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .card-content h3 {
    font-size: 1rem;
  }
}
</style>
