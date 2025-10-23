<template>
    <div class="main-container">
        <h2 class="title">
            Focus on Quality and Craft
        </h2>
        <p class="subtitle">
            Get inspired. Your perfect home starts with these collections.
        </p>
        <div class="category-grid">
            <a v-for="category in categories" :key="category.name" :href="category.link" class="category-card">
                <img :src="category.image" :alt="category.name" class="category-image"/>
                <span class="category-name">{{ category.name }}</span>
            </a>
        </div>
    </div>
</template>
<script setup>

import { categories } from "@/components/features/subComponent/imagesData";

</script>
  
<style scoped>
.main-container {
text-align: center;
padding: 2.5rem 1.3rem;

.title {
    font-size: 2rem;
    font-weight: 700;
    color: #222;
    margin-bottom: 0.5rem;
}

.subtitle {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 2.5rem;
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
}

.category-card {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: 0.8rem;
    box-shadow: 0 0.3rem 0.7rem rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.6rem 1.2rem rgba(0, 0, 0, 0.15);
    }

    .category-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 3 / 4;
    transition: transform 0.4s ease;

    &:hover {
        transform: scale(1.05);
    }
    }

    .category-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 1;
    }

    .category-name {
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 0.6rem 1.2rem;
        background: rgba(0, 0, 0, 0.35);
        border-radius: 6px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    }
}

@media (max-width: 768px) {
    .title {
    font-size: 1.7rem;
    }

    .subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
    }

    .category-grid {
    gap: 1.2rem;
    }

    .category-name {
    font-size: 1.1rem;
    }
}

@media (max-width: 480px) {
    padding: 1.5rem 1rem;

    .title {
    font-size: 1.5rem;
    }

    .category-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    }

    .category-card {
    border-radius: 0.6rem;

    .category-image {
        aspect-ratio: 3 / 3.8;
    }
    }
}
}
</style>