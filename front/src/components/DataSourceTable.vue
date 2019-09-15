<template>
    <div>
        <h3>Data List</h3>
        <b-table
                :items="files"
                @row-selected="rowSelected"
                hover
                select-mode="single"
                selectable
                v-if="files">
        </b-table>
        <div v-else>Please, upload a file first</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        mounted() {
            this.$store.dispatch('GET_FILES')
        },
        computed: mapState([
            'files'
        ]),
        methods: {
            rowSelected([item]) {
                this.$store.commit('SET_NEW_ANALYSIS_FILE', item && item.file_id || null);
            }
        }
    }
</script>

<style>

</style>


