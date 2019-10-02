<template>
  <div>
    <h3>2. Select Name, Bias and Algorithm</h3>
    <b-form class="analysis-form">
      <b-form-group id="name-group" label="Analysis name:" label-for="name">
        <b-input
          :state="Boolean(newAnalysis.name)"
          v-model="newAnalysis.name"
          placeholder="Enter a name for the analysis"
        ></b-input>
        <b-form-invalid-feedback :state="Boolean(newAnalysis.name)">Name is required</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="bias-group" label="Bias:" label-for="bias" v-if="biasLoaded">
        <b-form-select
          :options="bias"
          :state="Boolean(newAnalysis.bias)"
          class="select"
          id="bias"
          required
          v-model="newAnalysis.bias"
        ></b-form-select>
        <b-form-invalid-feedback :state="Boolean(newAnalysis.bias)">Bias is required</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group v-else>
        <div class="text-center">
          <b-spinner variant="primary"></b-spinner>
        </div>
      </b-form-group>

      <b-form-group
        id="algorithm-group"
        label="Algorithm:"
        label-for="algorithm"
        v-if="algorithmsLoaded"
      >
        <b-form-select
          :options="algorithms"
          :state="Boolean(newAnalysis.algorithm)"
          class="select"
          id="algorithm"
          required
          v-model="newAnalysis.algorithm"
        ></b-form-select>
        <b-form-invalid-feedback :state="Boolean(newAnalysis.algorithm)">Algorithm is required</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group v-else>
        <div class="text-center">
          <b-spinner variant="primary"></b-spinner>
        </div>
      </b-form-group>

      <b-row>
        <b-col md="12" offset-md="12">
          <b-button @click="onClickCancel" variant="warning">Cancel</b-button>
          <b-button @click="onClickAnalyze" variant="success">Analyze!</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    onClickAnalyze() {
      if (!this.validation()) return;

      this.$store.dispatch("ANALYZE");
    },
    onClickCancel() {
      this.newAnalysis = {
        name: null,
        file: null,
        bias: null,
        algorithm: null,
        status: "FORM"
      };
    },
    validation() {
      return (
        this.newAnalysis.name &&
        this.newAnalysis.bias &&
        this.newAnalysis.algorithm
      );
    }
  },
  mounted() {
    this.$store.dispatch("GET_BIAS");
    this.$store.dispatch("GET_ALGORITHMS");
  },
  computed: {
    newAnalysis: {
      get() {
        return this.$store.state.newAnalysis;
      },
      set(value) {
        this.$store.commit("SET_NEW_ANALYSIS", value);
      }
    },
    bias: {
      get() {
        return this.$store.state.bias.map(bias => {
          return {
            value: bias.attributes.biasId,
            text: bias.attributes.biasName
          };
        });
      }
    },
    algorithms: {
      get() {
        return this.$store.state.algorithms.map(algo => {
          return {
            value: algo.attributes.algorithmId,
            text: algo.attributes.algorithmName
          };
        });
      }
    },
    ...mapState(["algorithmsLoaded", "biasLoaded"])
  }
};
</script>

<style lang="scss">
.analysis-form .select {
  background: none !important;
}
</style>