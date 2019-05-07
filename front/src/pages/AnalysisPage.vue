<template>
  <div>
      <h3>Analysis List</h3>
      <b-table
       selectable
       select-mode="single"
       @row-selected="rowSelected"
       hover 
       :items="analysis">
       </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   mounted () {
    this.$store.dispatch('GET_ANALYSIS')
  },
  computed: mapState([
    'analysis'
  ]),
  methods: {
    rowSelected([item]) {
      this.$router.push('analysis/results');
      //this.$store.commit('SET_NEW_ANALYSIS_FILE', item.file_id);
    }
  }
}
</script>

<style>

</style>


