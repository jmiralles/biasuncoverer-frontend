<template>
  <div>
      <div v-if="this.$route.params.result === 'ok'">
      <b-jumbotron>
          <template slot="header">New Analysis Created!</template>

          <template slot="lead">
            Your Analysis was successfully created :)
          </template>

          <hr class="my-4">
            <b-button variant="primary" :to="'/'">Upload another Analysis</b-button>
            <b-button variant="success" :to="'/analysis'">View all Analysis</b-button>
       </b-jumbotron>
    </div>
    <div v-else>
      <b-jumbotron>
          <template slot="header">Something went wrong!</template>

          <template slot="lead">
            There was an error trying to create your analysis :(
          </template>

          <hr class="my-4">

          <b-button variant="primary" href="#">Try Again</b-button>
          <b-button variant="success" href="#">View all Analysis</b-button>
       </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>