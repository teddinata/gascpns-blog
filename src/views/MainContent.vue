<template>
  <main class="container mx-auto px-4 py-8">
    <section class="mb-8">
      <swiper :slides-per-view="1" :loop="true" pagination :autoplay="{ delay: 5000 }">
        <swiper-slide v-for="(article, index) in articles.slice(0, 3)" :key="index" class="relative bg-cover bg-center h-64 md:h-96 rounded-lg shadow-md flex items-center justify-center" :style="{ backgroundImage: `url(${article.image})` }">
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
          <div class="relative z-10 text-white text-center p-4">
            <h1 class="text-2xl md:text-3xl font-bold">{{ article.title }}</h1>
            <p class="mt-2">{{ formatDate(article.created_at) }} • {{ article.readTime }} min read</p>
          </div>
        </swiper-slide>
      </swiper>
    </section>
    <section>
      <h2 class="text-xl md:text-2xl font-bold mb-4">Latest Hot News</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          v-for="article in articles" 
          :key="article.id" 
          class="bg-white rounded-lg shadow-md p-4 cursor-pointer" 
          @click="goToDetail(article.slug)"
        >
          <img :src="article.image" alt="article.title" class="h-32 md:h-48 w-full object-cover rounded-md mb-4">
          <h3 class="text-lg md:text-xl font-semibold">{{ article.title }}</h3>
          <p class="text-gray-600">{{ formatDate(article.created_at) }}</p>
          <p class="text-gray-700">{{ truncateContent(article.content, 50) }} <span class="text-blue-500">Read more</span></p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  name: 'MainContent',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const articles = ref([]);
    const router = useRouter();

    const fetchArticles = async () => {
      try {
        const response = await fetch('https://api-cpns.creazylab.works/api/v1/blog');
        const data = await response.json();
        articles.value = data.data.data; // Adjusted to match the actual data path
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const truncateContent = (content, wordLimit) => {
      const words = content.replace(/<[^>]*>?/gm, '').split(' '); // Removing HTML tags
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
      }
      return content;
    };

    const goToDetail = (slug) => {
      router.push({ name: 'ArticleDetail', params: { slug } });
    };

    onMounted(() => {
      fetchArticles();
    });

    return {
      articles,
      formatDate,
      truncateContent,
      goToDetail,
    };
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
.cursor-pointer {
  cursor: pointer;
}
</style>
