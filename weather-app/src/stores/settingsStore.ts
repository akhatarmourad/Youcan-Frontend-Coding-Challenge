// stores/settings.ts
import { defineStore } from 'pinia';

type Degree = 'C' | 'F';
type Measurement = 'metric' | 'imperial';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    degree: 'C' as Degree, // Default is Celsius
    measurement: 'metric' as Measurement, // Default is Metric
  }),
  actions: {
    toggleDegree(newDegree: Degree) {
      console.log(`Degree Type Value : ${newDegree}`)
      this.degree = newDegree;
    },
    toggleMeasurement(newMeasurement: Measurement) {
      console.log(`Measurement Type Value : ${newMeasurement}`)
      this.measurement = newMeasurement;
    },
  },
});
