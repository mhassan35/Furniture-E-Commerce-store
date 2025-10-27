<template>
  <div class="blog-page">
    <div class="blog-hero">
      <div class="container">
        <h1>Our Blog</h1>
        <p>Discover the latest trends, tips, and insights in home furniture and interior design</p>
      </div>
    </div>

    <div class="container">
      <div class="blog-grid">
        <article v-for="(post, index) in blogPosts" :key="index" class="blog-card">
          <div class="blog-image">
            <img :src="post.image" :alt="post.title" />
            <div class="blog-category">{{ post.category }}</div>
          </div>
          <div class="blog-content">
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
            <div class="blog-meta">
              <span class="blog-date">{{ post.date }}</span>
              <span class="blog-author">By {{ post.author }}</span>
            </div>
            <button class="read-more-btn">Read More</button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const blogPosts = ref([
  {
    title: "10 Modern Living Room Ideas for 2024",
    excerpt: "Transform your living space with these contemporary design trends that blend comfort and style perfectly.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Interior Design",
    date: "Dec 15, 2024",
    author: "Sarah Johnson"
  },
  {
    title: "Sustainable Furniture: Eco-Friendly Choices",
    excerpt: "Learn how to furnish your home responsibly with sustainable and environmentally friendly furniture options.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Sustainability",
    date: "Dec 12, 2024",
    author: "Mike Chen"
  },
  {
    title: "Small Space Solutions: Maximizing Your Home",
    excerpt: "Discover clever furniture arrangements and storage solutions for small apartments and compact living spaces.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Space Planning",
    date: "Dec 10, 2024",
    author: "Emma Davis"
  },
  {
    title: "Color Psychology in Home Decor",
    excerpt: "Understand how different colors affect your mood and create the perfect atmosphere in each room.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Design Tips",
    date: "Dec 8, 2024",
    author: "Alex Thompson"
  },
  {
    title: "Kitchen Makeover: Before and After",
    excerpt: "See how a complete kitchen transformation can dramatically improve both functionality and aesthetics.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Renovation",
    date: "Dec 5, 2024",
    author: "Lisa Rodriguez"
  },
  {
    title: "Bedroom Design for Better Sleep",
    excerpt: "Create a peaceful bedroom environment that promotes relaxation and improves your sleep quality.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Wellness",
    date: "Dec 3, 2024",
    author: "David Wilson"
  }
])
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.blog-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.blog-hero h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.blog-hero p {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 3rem 0;
}

.blog-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.blog-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.blog-content {
  padding: 1.5rem;
}

.blog-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.blog-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #888;
}

.read-more-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.read-more-btn:hover {
  background: #5a6fd8;
}

@media (max-width: 768px) {
  .blog-hero h1 {
    font-size: 2.2rem;
  }
  
  .blog-hero p {
    font-size: 1rem;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 2rem 0;
  }
  
  .blog-image {
    height: 200px;
  }
}
</style>
