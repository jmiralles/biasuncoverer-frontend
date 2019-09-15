<template>
    <div class="section">
        <h3>1. Upload File</h3>
        <b-form-group
                description=""
                id="input-group-1"
                label="Drag or upload a CSV File"
                label-for="input-1"
        >

            <b-form-file
                    :disabled="Boolean(newAnalysis.file)"
                    :state="Boolean(file)"
                    id="file"
                    placeholder="Choose a file or drop it here..."
                    ref="fileInput"
                    v-model="file"/>
            <b-form-invalid-feedback :state="validation">ººº
                Your user ID must be 5-12 characters long.
            </b-form-invalid-feedback>
        </b-form-group>
        <b-row>
            <b-col md="12" offset-md="12">
                <b-button
                        :disabled="Boolean(newAnalysis.file)"
                        @click="upload"
                        variant="success"
                >Upload File
                </b-button>
            </b-col>
        </b-row>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                file: null
            }
        },
        computed: {
            validation() {
                return this.dataset
            },
            newAnalysis() {
                return this.$store.getters.newAnalysis
            }
        },
        methods: {
            upload: async function (e) {
                //const fileToUpload = this.$refs.fileInput.files[0];
                const fileToUpload = this.file;

                if (!fileToUpload) {
                    return;

                }

                let bodyData = new FormData();

                bodyData.append("file_csv", fileToUpload);
                bodyData.append("file_name", "data csv form");

                const response = await fetch("/api/file", {
                    method: "POST",
                    body: bodyData
                });

                const {data} = await response.json();

                this.$store.commit('SET_NEW_ANALYSIS_FILE', data[0].attributes.file_id || null);

            }
        }
    }
</script>

<style>

</style>
