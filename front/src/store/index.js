import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import algoData from "./random_algorithm.js";
import biasData from "./popularity_bias.js";

Vue.use(Vuex);
const maxDataItems = 100;

function limitDataLength(data) {
  return data.filter((_, index) => {
    return index % ~~(data.length / maxDataItems) == 0;
  });
}

const limitedAlgoData = limitDataLength(algoData.data);
const limitedBiasData = limitDataLength(biasData.data);

export default new Vuex.Store({
  state: {
    files: [],
    bias: [],
    biasLoaded: false,
    algorithms: [],
    algorithmsLoaded: false,
    analysis: [{"type":"analysis","id":"1744f036-acca-4fcd-861a-f3f220d8f7e5","attributes":{"analysisId":"1744f036-acca-4fcd-861a-f3f220d8f7e5","fileId":"12","biasId":"0","algorithmId":"48","analysisName":"78d0252c-a05a-4af0-b502-09589fc2f927","enableResult":false},"links":{"self":"/analysis/1744f036-acca-4fcd-861a-f3f220d8f7e5"}},{"type":"analysis","id":"1aee670b-fcbc-4fd0-8d30-4d5aca5cb2eb","attributes":{"analysisId":"1aee670b-fcbc-4fd0-8d30-4d5aca5cb2eb","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/1aee670b-fcbc-4fd0-8d30-4d5aca5cb2eb"}},{"type":"analysis","id":"1d071125-01a5-404f-a7ab-78da6329b3de","attributes":{"analysisId":"1d071125-01a5-404f-a7ab-78da6329b3de","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/1d071125-01a5-404f-a7ab-78da6329b3de"}},{"type":"analysis","id":"1d2cd936-1c77-465e-8b5c-ad073ea1b7aa","attributes":{"analysisId":"1d2cd936-1c77-465e-8b5c-ad073ea1b7aa","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/1d2cd936-1c77-465e-8b5c-ad073ea1b7aa"}},{"type":"analysis","id":"23b1cbfc-35fd-4c53-87c3-edf3a6343ad3","attributes":{"analysisId":"23b1cbfc-35fd-4c53-87c3-edf3a6343ad3","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/23b1cbfc-35fd-4c53-87c3-edf3a6343ad3"}},{"type":"analysis","id":"24b1d836-6695-4bcb-92c5-8c5df658a2a9","attributes":{"analysisId":"24b1d836-6695-4bcb-92c5-8c5df658a2a9","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/24b1d836-6695-4bcb-92c5-8c5df658a2a9"}},{"type":"analysis","id":"3261bec5-0470-45bc-8103-1f6782419088","attributes":{"analysisId":"3261bec5-0470-45bc-8103-1f6782419088","fileId":"4","biasId":"1","algorithmId":"1","analysisName":"1","enableResult":true},"links":{"self":"/analysis/3261bec5-0470-45bc-8103-1f6782419088"}},{"type":"analysis","id":"38fbeb1b-e666-4d9d-8b04-61ee94966fd9","attributes":{"analysisId":"38fbeb1b-e666-4d9d-8b04-61ee94966fd9","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/38fbeb1b-e666-4d9d-8b04-61ee94966fd9"}},{"type":"analysis","id":"390f905c-a1df-48b9-8026-aadd951a779a","attributes":{"analysisId":"390f905c-a1df-48b9-8026-aadd951a779a","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/390f905c-a1df-48b9-8026-aadd951a779a"}},{"type":"analysis","id":"48e2949c-5ea8-44e4-8145-9b8de55059b9","attributes":{"analysisId":"48e2949c-5ea8-44e4-8145-9b8de55059b9","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/48e2949c-5ea8-44e4-8145-9b8de55059b9"}},{"type":"analysis","id":"4a6aeee6-ceac-4c7c-89ba-4a6969e77e63","attributes":{"analysisId":"4a6aeee6-ceac-4c7c-89ba-4a6969e77e63","fileId":"4","biasId":"1","algorithmId":"1","analysisName":"1","enableResult":true},"links":{"self":"/analysis/4a6aeee6-ceac-4c7c-89ba-4a6969e77e63"}},{"type":"analysis","id":"503c10a2-50ac-4338-bfeb-b4a8c6ea129f","attributes":{"analysisId":"503c10a2-50ac-4338-bfeb-b4a8c6ea129f","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/503c10a2-50ac-4338-bfeb-b4a8c6ea129f"}},{"type":"analysis","id":"60a73cf6-c3b3-4674-a188-ae003409d567","attributes":{"analysisId":"60a73cf6-c3b3-4674-a188-ae003409d567","fileId":"4","biasId":"1","algorithmId":"1","analysisName":"1","enableResult":true},"links":{"self":"/analysis/60a73cf6-c3b3-4674-a188-ae003409d567"}},{"type":"analysis","id":"60bd3669-9523-45ab-bbe3-330b21f30bc6","attributes":{"analysisId":"60bd3669-9523-45ab-bbe3-330b21f30bc6","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/60bd3669-9523-45ab-bbe3-330b21f30bc6"}},{"type":"analysis","id":"70635dae-77e4-4216-89c2-689de0de4467","attributes":{"analysisId":"70635dae-77e4-4216-89c2-689de0de4467","fileId":"12","biasId":"0","algorithmId":"48","analysisName":"78d0252c-a05a-4af0-b502-09589fc2f927","enableResult":false},"links":{"self":"/analysis/70635dae-77e4-4216-89c2-689de0de4467"}},{"type":"analysis","id":"7921ed54-d73c-4fce-b1d5-7da531cd4abe","attributes":{"analysisId":"7921ed54-d73c-4fce-b1d5-7da531cd4abe","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/7921ed54-d73c-4fce-b1d5-7da531cd4abe"}},{"type":"analysis","id":"92cd61b6-7ecd-4460-a6d6-ae7ebd0f2d14","attributes":{"analysisId":"92cd61b6-7ecd-4460-a6d6-ae7ebd0f2d14","fileId":"0","biasId":"48","algorithmId":"78","analysisName":"name","enableResult":false},"links":{"self":"/analysis/92cd61b6-7ecd-4460-a6d6-ae7ebd0f2d14"}},{"type":"analysis","id":"9cb4890e-5f1e-4c68-984d-ccbab914ab89","attributes":{"analysisId":"9cb4890e-5f1e-4c68-984d-ccbab914ab89","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/9cb4890e-5f1e-4c68-984d-ccbab914ab89"}},{"type":"analysis","id":"a039ce3b-621b-49cf-a707-bfd7f81a2878","attributes":{"analysisId":"a039ce3b-621b-49cf-a707-bfd7f81a2878","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/a039ce3b-621b-49cf-a707-bfd7f81a2878"}},{"type":"analysis","id":"b1ed1066-acab-4410-af11-f4d568393c54","attributes":{"analysisId":"b1ed1066-acab-4410-af11-f4d568393c54","fileId":"4","biasId":"1","algorithmId":"1","analysisName":"1","enableResult":true},"links":{"self":"/analysis/b1ed1066-acab-4410-af11-f4d568393c54"}},{"type":"analysis","id":"bbe08ddf-e8f6-4f9c-8c03-d8ae4adaa66a","attributes":{"analysisId":"bbe08ddf-e8f6-4f9c-8c03-d8ae4adaa66a","fileId":"4","biasId":"1","algorithmId":"1","analysisName":"1","enableResult":true},"links":{"self":"/analysis/bbe08ddf-e8f6-4f9c-8c03-d8ae4adaa66a"}},{"type":"analysis","id":"c41014a6-66a0-4e1a-b73a-df85b7918973","attributes":{"analysisId":"c41014a6-66a0-4e1a-b73a-df85b7918973","fileId":"4","biasId":"1","algorithmId":"1","analysisName":"1","enableResult":true},"links":{"self":"/analysis/c41014a6-66a0-4e1a-b73a-df85b7918973"}},{"type":"analysis","id":"d5bb12f8-2cb8-4146-b30f-006c38c2cde9","attributes":{"analysisId":"d5bb12f8-2cb8-4146-b30f-006c38c2cde9","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/d5bb12f8-2cb8-4146-b30f-006c38c2cde9"}},{"type":"analysis","id":"d9c197ee-9198-40b4-a47e-65044c183fcc","attributes":{"analysisId":"d9c197ee-9198-40b4-a47e-65044c183fcc","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/d9c197ee-9198-40b4-a47e-65044c183fcc"}},{"type":"analysis","id":"daf51f6e-1672-4c4e-aac6-00083ffbac50","attributes":{"analysisId":"daf51f6e-1672-4c4e-aac6-00083ffbac50","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/daf51f6e-1672-4c4e-aac6-00083ffbac50"}},{"type":"analysis","id":"e3bb9496-28c0-4040-8964-572d317b76c1","attributes":{"analysisId":"e3bb9496-28c0-4040-8964-572d317b76c1","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":true},"links":{"self":"/analysis/e3bb9496-28c0-4040-8964-572d317b76c1"}},{"type":"analysis","id":"ea1143c4-f7ea-4942-a04f-e336c8d8f5c4","attributes":{"analysisId":"ea1143c4-f7ea-4942-a04f-e336c8d8f5c4","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/ea1143c4-f7ea-4942-a04f-e336c8d8f5c4"}},{"type":"analysis","id":"ea9c2997-61f3-4453-83c9-21605c5fccdf","attributes":{"analysisId":"ea9c2997-61f3-4453-83c9-21605c5fccdf","fileId":"4","biasId":"1","algorithmId":"1","analysisName":"1","enableResult":true},"links":{"self":"/analysis/ea9c2997-61f3-4453-83c9-21605c5fccdf"}},{"type":"analysis","id":"ee2c17df-1636-4436-a71a-d2eb37db8446","attributes":{"analysisId":"ee2c17df-1636-4436-a71a-d2eb37db8446","fileId":"4","biasId":"1","algorithmId":"1","analysisName":"1","enableResult":true},"links":{"self":"/analysis/ee2c17df-1636-4436-a71a-d2eb37db8446"}},{"type":"analysis","id":"f2e1a845-2026-4949-8a20-f6a15ff1bc2f","attributes":{"analysisId":"f2e1a845-2026-4949-8a20-f6a15ff1bc2f","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/f2e1a845-2026-4949-8a20-f6a15ff1bc2f"}},{"type":"analysis","id":"f7bb28a3-d930-48cf-b37b-da900e7fb06f","attributes":{"analysisId":"f7bb28a3-d930-48cf-b37b-da900e7fb06f","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/f7bb28a3-d930-48cf-b37b-da900e7fb06f"}},{"type":"analysis","id":"f904a0a9-7ba9-4562-9dc6-55535871c01e","attributes":{"analysisId":"f904a0a9-7ba9-4562-9dc6-55535871c01e","fileId":"78","biasId":"48","algorithmId":"0","analysisName":"name","enableResult":false},"links":{"self":"/analysis/f904a0a9-7ba9-4562-9dc6-55535871c01e"}}],
    analysis_result: {
      labels: new Array(limitedAlgoData.length).fill(""),
      datasets: [
        {
          fill: false,
          showLine: true,
          label: "Popularity Bias",
          backgroundColor: "#f87979",
          borderColor: "#f87979",
          data: limitedAlgoData
        },
        {
          fill: false,
          label: "Random Algorithm",
          backgroundColor: "#567890",
          borderColor: "#567890",
          data: limitedBiasData
        }
      ]
    },
    newAnalysis: {
      name: null,
      file: null,
      bias: null,
      algorithm: null
    }
  },
  mutations: {
    SET_ALGORITHMS_LOADED: (state) => {
      state.algorithmsLoaded = true;
    },
    SET_BIAS_LOADED: (state) => {
      state.biasLoaded = true;
    },
    SET_FILES: (state, payload) => {
      state.files = payload.data;
    },
    SET_BIAS: (state, payload) => {
      state.bias = payload.data;
    },
    SET_ALGORITHMS: (state, payload) => {
      state.algorithms = payload.data;
    },
    SET_ANALYSIS: (state, payload) => {
      state.analysis = payload.data;
    },
    SET_NEW_ANALYSIS: (state, payload) => {
      state.newAnalysis = payload;
    },
    SET_NEW_ANALYSIS_BIAS: (state, payload) => {
      state.newAnalysis.bias = payload;
    },
    SET_NEW_ANALYSIS_FILE: (state, payload) => {
      state.newAnalysis.file = payload;
    },
    SET_RESULT: (state, payload) => {
      state.analysis_result = payload;
    }
  },
  actions: {
    GET_FILES: async (context, payload) => {
      let { data } = await Axios.get("api/files");
      context.commit("SET_FILES", data);
    },
    GET_BIAS: async (context, payload) => {
      let { data } = await Axios.get("api/bias");
      context.commit("SET_BIAS", data);
      context.commit("SET_BIAS_LOADED");
    },
    GET_ALGORITHMS: async (context, payload) => {
      let { data } = await Axios.get("api/algorithms");
      context.commit("SET_ALGORITHMS", data);
      context.commit("SET_ALGORITHMS_LOADED");
    },
    GET_ANALYSIS: async (context, payload) => {
      let { data } = await Axios.get("/api/analysis");
      context.commit("SET_ANALYSIS", data);
    },
    GET_RESULT_BY_ID: async (context, payload) => {
      let { data } = await Axios.get("/api/result" + payload.id);
      context.commit("SET_RESULT", data);
    },
    RESET_ANALYSIS: async (context) => {
      context.commit("SET_NEW_ANALYSIS", {
        name: null,
        file: null,
        bias: null,
        algorithm: null
      });
    },
    ANALYZE: async (context, payload) => {
      const { name, file, bias, algorithm } = state.newAnalysis;
      let { data } = await Axios.post("/api/analysis", {
        data: [
          {
            type: "analysis",
            attributes: {
              file_id: file,
              bias_id: bias,
              algorithm_id: algorithm,
              analysis_name: name
            }
          }
        ]
      });
      context.commit("SET_ANALYSIS", data);
    }
  },
  getters: {
    newAnalysis: state => {
      return state.newAnalysis;
    }
  }
});
