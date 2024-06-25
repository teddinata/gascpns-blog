<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="article" class="prose">
      <img :src="article.image" alt="article.title" class="w-full h-auto rounded-md mb-4">
      <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
      <p class="text-gray-600">{{ formatDate(article.created_at) }} • {{ article.readTime }} min read</p>
      <div v-html="article.content" class="text-gray-700"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'ArticleDetail',
  setup() {
    const article = ref(null);
    const route = useRoute();

    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://api-cpns.creazylab.works/api/v1/blog/${route.params.slug}`);
        const data = await response.json();
        article.value = data.data;
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    onMounted(() => {
      fetchArticle();
    });

    return {
      article,
      formatDate,
    };
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
