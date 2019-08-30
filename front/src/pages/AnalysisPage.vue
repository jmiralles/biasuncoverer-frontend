<template>
  <div>
      <h3>Analysis List</h3>
        <b-table
        select-mode="single"
        striped
        :fields="fields"
        :items="analysis">
        <template slot="action" slot-scope="row">
         <b-button v-if="row.item.attributes.enableResult" variant="primary" size="sm" @click="onClickViewResults(row.item)" class="mr-1">
            View Results
          </b-button>
        
        </template>
        </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
        fields: {
          id: {},
          'attributes.analysisName': {
            label: 'Name'
          },
          'attributes.algorithmId': {
            label: 'Algorithm',
             formatter: (id) => {
              return this.getAlgoName(id)
            }
          },
          'attributes.biasId': {
            label: 'Bias',
             formatter: (id) => {
              return this.getBiasName(id)
            }
          },
          'attributes.enableResult': {
            label: 'Status',
            formatter: (enableResult) => {
              return enableResult ? 'Available' : 'Still processing...'
            }
          },
          'action': {
            label: 'Action'
          }
        },
    }
  },
  mounted () {
    this.$store.dispatch('GET_ANALYSIS')
    !this.biasLoaded && this.$store.dispatch('GET_BIAS');
    !this.algorithmsLoaded && this.$store.dispatch('GET_ALGORITHMS');
  },
  computed:{
    ...mapState([
      'algorithmsLoaded',
      'biasLoaded',
      'analysis',
      'algorithms',
      'bias'
     ])
  },
  methods: {
    getBiasName(id) {
      return this.bias.find(bias => bias.attributes.biaId === id).attributes.biaName
    },
    getAlgoName(id) {
      return this.algorithms.find(algo => algo.attributes.algorithmId === id).attributes.algorithmName
    },
    onClickViewResults({attributes}) {
      console.log(attributes.analysisId);
      this.$router.push('analysis/results');
      //this.$store.commit('SET_NEW_ANALYSIS_FILE', item.file_id);
    }
  }
}
</script>

<style lang="scss">
h3 {
  font-size: 25px;
  margin-bottom: 20px;
}
</style>


