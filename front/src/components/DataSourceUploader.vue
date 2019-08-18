<template>
  <div>
    <!-- Styled -->
   <!-- <b-form-file
      multiple
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a csv file..."
      drop-placeholder="Drop file here..."
    ></b-form-file> -->
    <h3>Upload File</h3>
     <b-form-group
        id="input-group-1"
        label="Drag or upload a CSV File"
        label-for="input-1"
        description=""
      >
    
     <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        id="file"
        ref="fileInput" />
      <b-form-invalid-feedback :state="validation">
        Your user ID must be 5-12 characters long.
      </b-form-invalid-feedback>
    </b-form-group>
    <b-row>
      <b-col  md="4" offset-md="5" >
        <b-button variant="success" @click="upload">Upload</b-button>
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
      }
    },
    methods: {
      upload: async function(e) {
        //const fileToUpload = this.$refs.fileInput.files[0];
        const fileToUpload = this.file;

        console.log(fileToUpload)
        if (!fileToUpload) {
           return;

        }

        let data = new FormData();
        console.log("fileToUpload===>", fileToUpload);

        data.append("file", fileToUpload);

        console.log("DATA===>", data);

        // Send as multipart/form-data
        // Ensure the URL points to your server
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        const { url } = await response.json();
    
      }
    }
  }
</script>

<style>

</style>
