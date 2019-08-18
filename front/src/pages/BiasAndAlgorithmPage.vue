<template>
  <div>
    <h2>Select Bias and Algorithm</h2>
    <b-form class="analysis-form">
      <b-form-group id="name-group" label="Analysis name:" label-for="name">
        <b-input :state="Boolean(newAnalysis.name)" v-model="newAnalysis.name" placeholder="Enter a name for the analysis"></b-input>
        <b-form-invalid-feedback :state="Boolean(newAnalysis.name)">
          Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="bias-group" label="Bias:" label-for="bias">
        <b-form-select
          :state="Boolean(newAnalysis.bias)" 
          id="bias"
          class="select"
          v-model="newAnalysis.bias"
          :options="bias"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="algorithm-group" label="Algorithm:" label-for="algorithm">
        <b-form-select
          :state="Boolean(newAnalysis.algorithm)" 
          id="algorithm"
          class="select"
          v-model="newAnalysis.algorithm"
          :options="algorithms"
          required
        ></b-form-select>
      </b-form-group>

      <b-row>
        <b-col md="12" offset-md="10" >
          <b-button variant="success" @click="onClickAnalyze">Analyze!</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    onClickAnalyze() {
      if (!this.validation) return;

      this.$store.dispatch('ANALYZE');
    },
    validation() {
      return this.newAnalysis.name && newAnalysis.bias && this.newAnalysis.algorithm;
    }
  },
  mounted () {
    this.$store.dispatch('GET_BIAS');
    this.$store.dispatch('GET_ALGORITHMS');
  },
  computed: {
    newAnalysis: {
      get () {
          return this.$store.state.newAnalysis
        },
      set (value) {
          this.$store.commit('SET_NEW_ANALYSIS', value)
        }
    },
     bias: {
       get () {
          return this.$store.state.bias.map(a => a.name = a.bias_name)
        }
     },
      algorithms: {
       get () {
          return this.$store.state.algorithms.map(a => a.name = a.algorithm_name)
        }
     }
  }
}
</script>

<style lang="scss">
.analysis-form .select {
  background: none !important;
}

</style>