<template>
  <div class="events-section">
    <h2 class="section-title">Próximos Eventos</h2>
    <div v-if="events.length" class="events-list">
      <div v-for="(event, index) in events" :key="index" class="event-item">
        <h3 class="event-title">{{ event.name }}</h3>
        <p class="event-date">{{ event.date }}</p>
      </div>
    </div>
    <div v-else>
      <p>No hay eventos disponibles.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventsSection",
  data() {
    return {
      events: [
        { name: "Evento 1", date: "2024-08-20" },
        { name: "Evento 2", date: "2024-09-15" },
        // Más eventos aquí...
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

.events-list {
  display: flex;
  flex-direction: column;
}

.event-item {
  margin-bottom: 12px;
}

.event-title {
  font-size: 18px;
  font-weight: bold;
}

.event-date {
  font-size: 16px;
  color: #888;
}
</style>
