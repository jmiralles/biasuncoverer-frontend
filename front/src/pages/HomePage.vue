<template>
  <div>
    {{JSON.stringify(newAnalysis)}}
    <h2>New Analysis</h2>
    <b-container>
       <b-row>
        <!--  <b-col md="7">
         <data-source-table /> 
          </b-col> -->
        <b-col md="12">
          <data-source-uploader />
        </b-col>
      </b-row>
       <b-row v-show="Boolean(newAnalysis.file) || true">
         <b-col md="12">
          <BiasAndAlgorithmPage />
         </b-col>
       </b-row>
    </b-container>
  </div>
</template>

<script>
import DataSourceTable from "../components/DataSourceTable.vue";
import DataSourceUploader from "../components/DataSourceUploader.vue";
import BiasAndAlgorithmPage from "../pages/BiasAndAlgorithmPage.vue";

import { mapGetters } from 'vuex';

export default {
  components: {DataSourceTable, DataSourceUploader, BiasAndAlgorithmPage},
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