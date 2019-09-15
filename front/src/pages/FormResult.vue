<template>
    <div>
        <div v-if="this.$route.params.result === 'ok'">
            <b-jumbotron>
                <template slot="header">New Analysis Created!</template>

                <template slot="lead">
                    Your Analysis was successfully created :)
                </template>

                <hr class="my-4">
                <b-button :to="'/'" variant="primary">Upload another Analysis</b-button>
                <b-button :to="'/analysis'" variant="success">View all Analysis</b-button>
            </b-jumbotron>
        </div>
        <div v-else>
            <b-jumbotron>
                <template slot="header">Something went wrong!</template>

                <template slot="lead">
                    There was an error trying to create your analysis :(
                </template>

                <hr class="my-4">

                <b-button href="#" variant="primary">Try Again</b-button>
                <b-button href="#" variant="success">View all Analysis</b-button>
            </b-jumbotron>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style>

</style>