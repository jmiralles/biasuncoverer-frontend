<template>
    <div>
        <h3>
            <router-link to="/analysis">Back to List of Analysis</router-link>
        </h3>
        <div v-if="isAllDataLoaded()">
            <p>Result of analysis <strong>{{analysisName}}</strong></p>

            <line-chart :chartdata="analysis_result" :options="chartOptions"></line-chart>
        </div>
    </div>

</template>

<script>
    import {mapState} from 'vuex';
    import LineChart from '../components/LineChart.vue';

    export default {
        data: () => ({
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Proportion of items (log %)'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of users (2^n)'
                        }
                    }],
                }
            },
            analysis_result: {
                labels: [],
                datasets: [
                    {
                        fill: false,
                        showLine: true,
                        label: "Recommendations",
                        backgroundColor: "#567890",
                        borderColor: "#567890",
                        data: []
                    },
                    {
                        fill: false,
                        showLine: true,
                        label: "Dataset",
                        backgroundColor: "#f87979",
                        borderColor: "#f87979",
                        data: []
                    }
                ]
            },
        }),
        watch: {
            algorithmBiasGraphData(newValue) {
                this.analysis_result.datasets[0].data = newValue;
            },
            dataBiasGraphData(newValue) {
                this.analysis_result.datasets[1].data = newValue;
            },
            graphLabels(newValue) {
                this.analysis_result.labels = newValue;
            }
        },
        mounted() {
            this.$store.dispatch('CLEAR_ANALYSIS_RESULTS');
            this.$store.dispatch('GET_ANALYSIS');

            const {id} = this.$route.params;
            this.$store.dispatch('GET_RESULT_BY_ID', id);
        },
        methods: {
            isAllDataLoaded() {
                return this.algorithmBiasGraphData.length > 0
                    && this.analysis.length > 0
                    && this.graphLabels.length > 0
                    && this.dataBiasGraphData.length > 0;
            }
        },
        components: {LineChart},
        computed: {
            analysisName() {
                return this.$store.getters.analysisName(this.$route.params.id);
            },
            ...mapState([
                'algorithmBiasGraphData',
                'dataBiasGraphData',
                'graphLabels',
                'analysis'
            ])
        }
    }
</script>


<style lang="scss">
    h3 {
        font-size: 25px;
        margin-bottom: 20px;
    }
</style>
