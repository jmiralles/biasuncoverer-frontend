<template>
  <div>
    <h3><router-link to="/analysis">Back to analysis</router-link></h3>

    <p>Analysis Results of result with id: {{this.$route.params.id}}</p>
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
  mounted() {
    const { id } = this.$route.params;
    console.log(id);
    //    this.$store.dispatch('GET_RESULT', id);
  
  },
  components: {LineChart},
  computed: {
    ...mapState([
      'analysis_result'
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
