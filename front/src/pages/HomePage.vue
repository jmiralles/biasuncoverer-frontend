<template>
  <div>
    <h2>Select Your Data Source</h2>
    <b-container>
       <b-row>
        <b-col  md="7">
          <data-source-table />
          </b-col>
        <b-col   md="5">
          <data-source-uploader />
          </b-col>
      </b-row>
       <b-row>
         <b-col  md="5" offset-md="5" >
          <b-button to="/bias-algorithm" variant="primary" v-if="newAnalysis.file">Next</b-button>
         </b-col>
       </b-row>
    </b-container>
  </div>
</template>

<script>
import DataSourceTable from "../components/DataSourceTable.vue";
import DataSourceUploader from "../components/DataSourceUploader.vue";
import { mapGetters } from 'vuex';

export default {
  components: {DataSourceTable, DataSourceUploader},
  computed: {
    newAnalysis() {
      return this.$store.getters.newAnalysis
    }
  }
};
</script>