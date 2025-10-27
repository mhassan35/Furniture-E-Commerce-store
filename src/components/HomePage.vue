<template>
  <div>
    <section class="hero-section">
      <div class="hero-image-dimmer"></div>
      <div class="hero-content">
        <div class="hero-box-wrapper">
            <div class="hero-box">
                <p class="new-arrival">New Arrival</p>
                <h1 class="hero-title">
                    Discover Our New Collection
                </h1>
                <p class="hero-text">
                    Explore our latest additions designed for modern living. Find unique furniture and decor that perfectly blends style and comfort.
                </p>
                <button class="buy-btn">BUY Now</button>
            </div>
        </div>
      </div>
    </section>
    <ShowCaseProd/>
    <ProductsShowCase/>
  </div>
</template>

<script setup>
import ShowCaseProd from '@/components/features/ShowCaseProd.vue';
import ProductsShowCase from '@/components/Products/ProductsShowCase.vue';
</script>

<style scoped>

.hero-section {
  position: relative;
  width: 100%;
  height: 80vh; 
  overflow: hidden;
  background: url("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032") center center / cover no-repeat;
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  padding: 0;

  .hero-image-dimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); 
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .hero-box-wrapper {
      width: 45%; 
      height: 100%;
      display: flex;
      justify-content: flex-end; 
      align-items: center;
      padding-right: 5%; 

      .hero-box {
        background-color: #FAF4E5; 
        max-width: 500px; 
        padding: 2rem 2rem;
        border-radius: 4px;

        .new-arrival {
          color: #000000; 
          font-weight: 400;
          font-size: 0.9rem;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .hero-title {
          color: #000000; 
          font-size: 2rem; 
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 1.2rem;
        }

        .hero-text {
          font-size: 0.95rem; 
          color: #555;
          margin-bottom: 2.2rem;
          line-height: 1.5;
        }

        .buy-btn {
          background-color: #000000; 
          color: #fff; 
          font-weight: 500;
          font-size: 1rem;
          padding: 1rem 3rem;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #000020; 
          }
        }
      }
    }
  }
}

@media (max-width: 760px) {
.hero-section {
  justify-content: center;
  align-items: flex-end;
  height: 70vh; 

  .hero-content {
      justify-content: center; 

      .hero-box-wrapper {
        width: 90%; 
        padding-right: 0;
        margin-bottom: 2rem; 
        justify-content: center;

        .hero-box {
          max-width: 100%; 
          padding: 1.5rem; 

          .hero-title {
            font-size: 1.6rem;
          }
        }
      }
    }
  }
}
</style>
