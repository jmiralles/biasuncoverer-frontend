<template>
  <div>
    <h3>New Analysis</h3>

    <div v-if="newAnalysis.status === 'FORM'">
      <b-container>
        <b-row>
          <b-col md="12">
            <data-source-uploader />
          </b-col>
        </b-row>
        <b-row v-show="Boolean(true || newAnalysis.file)">
          <b-col md="12">
            <BiasAndAlgorithmForm />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div v-else-if="newAnalysis.status === 'SENDING'">
      <b-jumbotron align="center">
          <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
          <p>Sending Analysis</p>
      </b-jumbotron>
   </div>
    
  </div>
</template>

<script>
import DataSourceTable from "../components/DataSourceTable.vue";
import DataSourceUploader from "../components/DataSourceUploader.vue";
import BiasAndAlgorithmForm from "../components/BiasAndAlgorithmForm.vue";

import { mapGetters } from 'vuex';

export default {
  components: {DataSourceTable, DataSourceUploader, BiasAndAlgorithmForm},
  computed: {
    newAnalysis() {
      return this.$store.getters.newAnalysis
    }
  }
};
</script>

<style lang="scss">
.section {
  margin: 50px 0;
}

h3 {
  font-size: 25px;
  margin-bottom: 20px;
}
</style>