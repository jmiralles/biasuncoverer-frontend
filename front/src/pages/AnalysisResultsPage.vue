<template>
  <div>
    <h3><router-link to="/analysis">Back to analysis</router-link></h3>
    <p>Analysis Results of result with id: {{this.$route.params.id}}</p>
    <div v-if="isAllDataLoaded()">
          <line-chart :chartdata="analysis_result" :options="chartOptions"></line-chart>
    </div>
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
    },
     analysis_result: {
      labels: [],
      datasets: [
        {
          fill: false,
          showLine: true,
          label: "Popularity Bias",
          backgroundColor: "#f87979",
          borderColor: "#f87979",
          data: []
        },
        {
          fill: false,
          label: "Random Algorithm",
          backgroundColor: "#567890",
          borderColor: "#567890",
          data: []
        }
      ]
    },
  }),
  watch: {
    algorithmBiasGraphData(newValue) {
        this.analysis_result.datasets[0].data = newValue;
    },
    dataBiasGraphData(newValue) {
        this.analysis_result.datasets[1].data = newValue;
    },
    graphLabels(newValue) {
        this.analysis_result.labels = newValue;
    } 
  },
  mounted() {
    console.log("MOUNTED!!")
    this.$store.dispatch('CLEAR_ANALYSIS_RESULTS');

    const { id } = this.$route.params;
    this.$store.dispatch('GET_RESULT_BY_ID', id);
  },
  methods: {
    isAllDataLoaded() {
      return this.algorithmBiasGraphData.length > 0
            && this.graphLabels.length > 0
            && this.dataBiasGraphData.length > 0;
    }
  },
  components: {LineChart},
  computed: {
    ...mapState([
      'algorithmBiasGraphData',
      'dataBiasGraphData',
      'graphLabels'
    ])
  }
}
</script>


<style lang="scss">
h3 {
  font-size: 25px;
  margin-bottom: 20px;
}
</style>
