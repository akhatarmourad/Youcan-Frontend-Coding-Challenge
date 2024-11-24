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
      console.log(`Degree Type Value: ${newDegree}`);

      if (newDegree === 'F') {
        this.degree = 'F';
        if (this.measurement === 'imperial') {
          this.measurement = 'metric'; 
        }
      } else {
        this.degree = 'C';
      }
    },

    toggleMeasurement(newMeasurement: Measurement) {
      console.log(`Measurement Type Value: ${newMeasurement}`);

      if (newMeasurement === 'imperial') {
        if (this.degree === 'F') {
          this.degree = 'C';
        }
        this.measurement = 'imperial'; 
      } else {
        this.measurement = 'metric';
      }
    },
  },
});
