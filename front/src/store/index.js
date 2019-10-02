import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import algoData from "./random_algorithm.js";
import biasData from "./popularity_bias.js";
import router from "../router";

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
    analysisListStatus: "DONE",
    analysis: [],
    algorithmBiasGraphData: [],
    dataBiasGraphData: [],
    graphLabels: [],
    newAnalysis: {
      name: null,
      file: null,
      bias: null,
      algorithm: null,
      status: "FORM"
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
    SET_RESULT: (state, { algorithmBiasGraph, dataBiasGraph }) => {
      const algorithmBiasGraphData = algorithmBiasGraph.map(point => point.y);
      const dataBiasGraphData = dataBiasGraph.map(point => point.y);

      state.algorithmBiasGraphData = algorithmBiasGraphData;
      state.dataBiasGraphData = dataBiasGraphData;
      state.graphLabels = new Array(dataBiasGraphData.length).fill("");
    },
    SET_NEW_ANALYSIS_STATUS: (state, payload) => {
      state.newAnalysis.status = payload;
    },
    CLEAR_RESULTS: (state) => {
      state.algorithmBiasGraphData = [];
      state.dataBiasGraphData = [];
      state.graphLabels = [];
    },
    ANALYSIS_LIST_STATUS: (state, payload) => {
      state.analysisListStatus = payload;
    }
  },
  actions: {
    CLEAR_ANALYSIS_RESULTS: async (context) => {
      context.commit("CLEAR_RESULTS");
    },
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
      let { data } = await Axios.get("/api/results/" + payload);
      context.commit("SET_RESULT", data.data[0].attributes);
    },
    RESET_ANALYSIS: async (context) => {
      context.commit("SET_NEW_ANALYSIS", {
        name: null,
        file: null,
        bias: null,
        algorithm: null,
        status: "FORM"
      });
    },
    ANALYZE: async (context, payload) => {
      context.commit("SET_NEW_ANALYSIS_STATUS", "SENDING");
      const { name, file, bias, algorithm } = context.state.newAnalysis;
      let result = await Axios.post("/api/analysis", {
        data: {
          type: "analysis",
          attributes: {
            file_id: file,
            bias_id: bias,
            algorithm_id: algorithm,
            analysis_name: name
          }
        }
      });
      context.dispatch("RESET_ANALYSIS");

      if (result.status === 200) {
        router.push('/form/ok');
      } else {
        router.push('/form/ko');
      }

    }
  },
  getters: {
    newAnalysis: state => {
      return state.newAnalysis;
    },
    analysisName: state => (id) => {
      const analysis = state.analysis.find(a => a.attributes.analysisId == id);
      return analysis && analysis.attributes.analysisName || '';
    }
  }
});
