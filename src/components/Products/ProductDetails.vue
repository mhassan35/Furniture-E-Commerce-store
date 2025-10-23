<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="modal">
            <button class="close-btn" @click="closeModal">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-content">
                <div class="modal-image">
                    <img :src="product.image_path" :alt="product.name" />
                </div>
                <div class="modal-details">
                    <h2>{{ product.name }}</h2>
                    <p class="description">{{ product.description }}</p>
                    <div class="details-grid-dynamic">
                    <div class="detail-row" v-for="detail in details" :key="detail.label">
                        <span class="label">{{ detail.label }}</span>
                        <span class="value">{{ detail.value }}</span>
                    </div>
                </div>
            
                <div class="price-section large">
                    <span class="price">
                        ${{ product.discount_price ? product.discount_price.toFixed(2) : product.price.toFixed(2) }}
                    </span>
                    <span v-if="product.discount_price" class="old-price">
                        ${{ product.price.toFixed(2) }}
                    </span>
                    </div>
                    <button class="add-btn">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProductDetails } from './subComponent/DetailsArray'

const props = defineProps({
product: { type: Object, required: true },
closeModal: { type: Function, required: true },
})

const { details } = useProductDetails(props.product)
</script>

<style lang="scss" scoped>
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

    .close-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: transparent;
      border: none;
      font-size: 1rem;
      color: #555;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1e88e5;
      }
    }

    .modal-content {
      display: flex;
      flex-wrap: wrap;
      padding: 1rem;

      .modal-image {
        flex: 1 1 320px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }
      }

      .modal-details {
        flex: 1 1 400px;
        padding: 0 1rem;

        h2 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.4rem;
        }

        .description {
          color: #555;
          margin-bottom: 0.4rem;
          line-height: 1.5;
          font-size: 1rem;
        }

        .details-grid-dynamic {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem 1rem;

          .detail-row {
            display: flex;
            flex-direction: column;

            .label {
              font-weight: 600;
              color: #000000;
            }

            .value {
              color: #000000;
              margin: 0;
            }
          }
        }

        .price-section.large {
          margin-bottom: 0.4rem;

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
          background: #000000;
          color: white;
          border: none;
          padding: 0.7rem 1.4rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;

          i {
            margin-right: 0.4rem;
          }

          &:hover {
            background: #2e7d32;
          }
        }
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
  .modal-overlay {
    .modal {
        .close-btn {
            position: absolute;
            top: 6px;
            right: 6px;
            background: transparent;
            border: none;
            font-size: 0.7rem;
            color: #555;
            cursor: pointer;
            transition: color 0.3s;
        }
        .modal-content {
            flex-direction: column; 
            .modal-details {
                h2 {
                  font-size: 1.2rem;
                  font-weight: 600;
                  color: #000000;
                  margin: 1rem 0 0 0;
                }
            }
        }
    }
  }
}
</style>
