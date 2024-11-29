import { defineStore } from "pinia";
import axios from "axios";
import dayjs from "dayjs";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    events: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchEvents() {
      this.loading = true;
      this.error = null;

      const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
      const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

      const timeMin = new Date().toISOString(); // Desde ahora
      const timeMax = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString(); // Hasta un año adelante

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events`;

      try {
        const response = await axios.get(url, {
          params: {
            key: apiKey,
            timeMin: timeMin,
            timeMax: timeMax,
            singleEvents: true,
            orderBy: "startTime",
          },
        });

        this.events = response.data.items;
      } catch (error) {
        console.error("Error al obtener los eventos del calendario:", error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchWeeklyEvents() {
      this.loading = true;
      this.error = null;

      const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
      const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

      const timeMin = dayjs().startOf("week").toISOString();
      const timeMax = dayjs().endOf("week").toISOString();

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events`;

      try {
        const response = await axios.get(url, {
          params: {
            key: apiKey,
            timeMin: timeMin,
            timeMax: timeMax,
            singleEvents: true,
            orderBy: "startTime",
          },
        });

        this.events = response.data.items;
      } catch (error) {
        console.error("Error al obtener los eventos del calendario:", error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
