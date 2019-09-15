<template>
    <div>
        <h3>Analysis List</h3>
        <b-table
                :fields="fields"
                :items="analysis"
                select-mode="single"
                striped>
            <template slot="action" slot-scope="row">
                <b-button @click="onClickViewResults(row.item)" class="mr-1" size="sm"
                          v-if="row.item.attributes.enableResult" variant="primary">
                    View Results
                </b-button>

            </template>
        </b-table>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                fields: {
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
        mounted() {
            this.$store.dispatch('GET_ANALYSIS');
            !this.biasLoaded && this.$store.dispatch('GET_BIAS');
            !this.algorithmsLoaded && this.$store.dispatch('GET_ALGORITHMS');
        },
        computed: {
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
                const bias = this.bias.find(bias => bias.attributes.biasId === id);
                return bias && bias.attributes.biasName || "Popularity"
            },
            getAlgoName(id) {
                const algorithm = this.algorithms.find(algo => algo.attributes.algorithmId === id);
                return algorithm && algorithm.attributes.algorithmName || "Random"
            },
            onClickViewResults({attributes}) {
                this.$router.push('analysis/results/' + attributes.analysisId);
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


