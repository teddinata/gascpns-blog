<template>
  <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row">
    <div v-if="article" class="md:w-2/3">
      <img :src="article.image" alt="article.title" class="w-full h-auto rounded-md mb-4">
      <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
      <p class="text-gray-600 mb-4">{{ formatDate(article.created_at) }} • {{ readTime }} min read</p>
      <div v-html="article.content" class="prose text-gray-700"></div>
    </div>
    <aside class="md:w-1/3 md:pl-8 mt-8 md:mt-0">
      <div class="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h2 class="text-xl font-bold mb-2">Related Blogs</h2>
        <div v-for="relatedArticle in relatedArticles" :key="relatedArticle.id" class="mb-4">
          <img :src="relatedArticle.image" alt="relatedArticle.title" class="w-full h-auto rounded-md mb-2">
          <h3 class="text-lg font-semibold">{{ relatedArticle.title }}</h3>
          <p class="text-gray-600">{{ formatDate(relatedArticle.created_at) }}</p>
          <a :href="`/article/${relatedArticle.slug}`" class="text-blue-500">Read more</a>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'ArticleDetail',
  setup() {
    const article = ref(null);
    const articles = ref([]);
    const readTime = ref(0);
    const route = useRoute();
    const router = useRouter();

    const fetchArticle = async (slug) => {
      try {
        const response = await fetch(`https://api-cpns.creazylab.works/api/v1/blog/${slug}`);
        const data = await response.json();
        article.value = data.blog;
        readTime.value = data.readTime;
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

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
      return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const relatedArticles = computed(() => {
      if (!article.value) return [];
      return articles.value.filter(a => a.id !== article.value.id).slice(0, 3);
    });

    watch(route, (to, from) => {
      if (to.params.slug !== from.params.slug) {
        fetchArticle(to.params.slug);
        // reload related articles
        fetchArticles();
      }
    });

    onMounted(() => {
      fetchArticle(route.params.slug);
      fetchArticles();
    });

    return {
      article,
      articles,
      relatedArticles,
      formatDate,
      readTime,
    };
  },
};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}
.prose {
  max-width: 100%;
}
</style>
