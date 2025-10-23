<template>
  <div class="main-container">
    <div v-if="loading" class="loading">Loading products...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
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
            More Details
          </button>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <button class="close-btn" @click="closeModal">×</button>

        <div class="modal-content">
          <div class="modal-image">
            <img :src="selectedProduct.image_path" :alt="selectedProduct.name" />
          </div>

          <div class="modal-details">
            <h2>{{ selectedProduct.name }}</h2>
            <p class="description">{{ selectedProduct.description }}</p>

            <div class="details-grid">
              <p><strong>Category:</strong> {{ selectedProduct.category }}</p>
              <p><strong>Wood Type:</strong> {{ selectedProduct.wood_type }}</p>
              <p><strong>Finish:</strong> {{ selectedProduct.finish }}</p>
              <p><strong>Dimensions:</strong>
                {{ selectedProduct.dimensions.width }} ×
                {{ selectedProduct.dimensions.height }} ×
                {{ selectedProduct.dimensions.depth }} cm
              </p>
              <p><strong>Weight:</strong> {{ selectedProduct.weight }} kg</p>
              <p><strong>Stock:</strong> {{ selectedProduct.stock }}</p>
              <p><strong>Status:</strong> {{ selectedProduct.status }}</p>
              <p><strong>Created:</strong> {{ formatDate(selectedProduct.created_at) }}</p>
            </div>

            <div class="price-section large">
              <span class="price">
                ${{ selectedProduct.discount_price ? selectedProduct.discount_price.toFixed(2) : selectedProduct.price.toFixed(2) }}
              </span>
              <span v-if="selectedProduct.discount_price" class="old-price">
                ${{ selectedProduct.price.toFixed(2) }}
              </span>
            </div>

            <button class="add-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const products = ref([])
const loading = ref(true)
const error = ref("")

const showModal = ref(false)
const selectedProduct = ref(null)

const openModal = (product) => {
  selectedProduct.value = product
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProduct.value = null
}

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString()

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
  padding: 2rem;

  .loading,
  .error {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
    margin-top: 3rem;
  }
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  .image-wrapper {
    width: 100%;
    aspect-ratio: 16 / 11;
    overflow: hidden;
    background: #f9f9f9;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
    }
  }

  .card-content {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
    }

    .category {
      color: #888;
      font-size: 0.9rem;
      margin: 0.4rem 0;
    }

    .price-section {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;

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

      &:hover {
        background: #1565c0;
      }
    }
  }
}

/* 🔹 Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
  z-index: 999;
  padding: 1rem;
}

.modal {
  background: #fff;
  border-radius: 16px;
  max-width: 850px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 14px;
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: #444;
  cursor: pointer;
}

.modal-content {
  display: flex;
  flex-wrap: wrap;
  padding: 1.5rem;

  .modal-image {
    flex: 1 1 320px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: auto;
      border-radius: 12px;
      object-fit: contain;
    }
  }

  .modal-details {
    flex: 1 1 400px;
    padding: 1rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .description {
      color: #555;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem 1rem;
      margin-bottom: 1.5rem;

      p {
        font-size: 0.95rem;
        color: #444;
      }
    }

    .price-section.large {
      margin-bottom: 1rem;

      .price {
        font-size: 1.3rem;
        color: #1e88e5;
        font-weight: 700;
      }

      .old-price {
        color: #999;
        text-decoration: line-through;
      }
    }

    .add-btn {
      background: #43a047;
      color: white;
      border: none;
      padding: 0.7rem 1.4rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #2e7d32;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
  }

  .details-grid {
    grid-template-columns: 1fr !important;
  }

  .modal {
    max-height: 95vh;
  }
}
</style>
