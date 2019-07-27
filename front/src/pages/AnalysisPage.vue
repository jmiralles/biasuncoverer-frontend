<template>
  <div>
      <h3>Analysis List</h3>
      <b-table
       selectable
       select-mode="single"
       hover 
       :items="analysis">
       <template slot="action">
        <b-button variant="primary" size="sm" @click="onClickViewResults" class="mr-1">
          View Results
        </b-button>
       
      </template>
       </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   mounted () {
    this.$store.dispatch('GET_ANALYSIS')
  },
  computed:{
    analysis() {
      return this.$store.getters.analysis
    }
  },
  methods: {
    onClickViewResults() {
      this.$router.push('analysis/results');
      //this.$store.commit('SET_NEW_ANALYSIS_FILE', item.file_id);
    }
  }
}
</script>

<style>

</style>


