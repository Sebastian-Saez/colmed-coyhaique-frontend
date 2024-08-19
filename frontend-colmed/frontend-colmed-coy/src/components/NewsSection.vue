<template>
  <div class="news-section">
    <h2 class="section-title">Últimas Noticias</h2>
    <div v-if="news.length" class="news-list">
      <div v-for="(item, index) in news" :key="index" class="news-item">
        <h3 class="news-title">{{ item.title }}</h3>
        <p class="news-content">{{ item.content }}</p>
      </div>
    </div>
    <div v-else>
      <p>No hay noticias disponibles.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsSection",
  data() {
    return {
      news: [
        { title: "Noticia 1", content: "Contenido de la noticia 1." },
        { title: "Noticia 2", content: "Contenido de la noticia 2." },
        // Más noticias aquí...
      ],
    };
  },
};
</script>

<style scoped>
.section-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.news-list {
  display: flex;
  flex-direction: column;
}

.news-item {
  margin-bottom: 12px;
}

.news-title {
  font-size: 18px;
  font-weight: bold;
}

.news-content {
  font-size: 16px;
}
</style>
