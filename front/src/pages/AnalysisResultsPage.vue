<template>
  <div>
    <h2>Analysis Results</h2>
    <line-chart :chartdata="analysis_result" :options="chartOptions"></line-chart>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import LineChart from '../components/LineChart.vue';

export default {
   data: () => ({
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  components: {LineChart},
  computed: mapState([
    'analysis_result'
  ])
}
</script>