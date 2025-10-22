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
                <img :src="category.image" :alt="category.name" class="category-image" />
                <div class="category-overlay">
                    <span class="category-name">{{ category.name }}</span>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup>
import { categories } from '@/components/features/subComponent/imagesData'; 
</script>

<style scoped>
.main-container {
    text-align: center;
    padding: 2.5rem 1.3rem;

    .title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #333;
        margin-bottom: o.4rem;
    }

    .subtitle {
        font-size: 1rem;
        color: #666;
        margin-bottom: 2.5rem;
    }

    .category-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr); 
        gap: 1.2rem; 
        margin: 0 auto;

        .category-card {
            position: relative;
            display: block; 
            overflow: hidden; 
            border-radius: 0.5rem; 
            box-shadow: 0 0.3rem 0.7rem rgba(0, 0, 0, 0.1); 
            aspect-ratio: 3 / 4; 
            text-decoration: none;
            color: inherit;

            .category-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .category-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
                
                &:hover {
                    opacity: 1;
                }

                .category-name {
                    color: white;
                    font-size: 1.5rem;
                    font-weight: bold;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
                    padding: 0.6rem 1.3rem;
                    background-color: rgba(0, 0, 0, 0.3);
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>