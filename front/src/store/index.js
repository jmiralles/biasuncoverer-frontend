import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    files: [],
    bias: [],
    algorithms: [],
    analysis: [],
    analysis_result: {
      labels: new Array(8),
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [94, 24, 8, 4, 3, 2, 1, 0]
        },
        {
          label: "Data Two",
          backgroundColor: "#567890",
          data: [100, 30, 10, 5, 4, 3, 2, 1]
        }
      ]
    },
    newAnalysis: {
      file: null,
      bias: null
    }
  },
  mutations: {
    SET_FILES: (state, payload) => {
      state.files = payload.items;
    },
    SET_BIAS: (state, payload) => {
      state.bias = payload.items;
    },
    SET_ALGORITHMS: (state, payload) => {
      state.algorithms = payload.items;
    },
    SET_ANALYSIS: (state, payload) => {
      state.analysis = payload.items;
    },
    SET_NEW_ANALYSIS_BIAS: (state, payload) => {
      state.newAnalysis.bias = payload;
    },
    SET_NEW_ANALYSIS_FILE: (state, payload) => {
      state.newAnalysis.file = payload;
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
    },
    GET_ALGORITHMS: async (context, payload) => {
      let { data } = await Axios.get("api/algorithms");
      context.commit("SET_ALGORITHMS", data);
    },
    GET_ANALYSIS: async (context, payload) => {
      let { data } = await Axios.get("/api/analysis");
      context.commit("SET_ANALYSIS", data);
    },
    ANALYZE: async (context, payload) => {
      let { data } = await Axios.post("/api/analysis", {
        data: [
          {
            type: "analysis",
            attributes: {
              file_id: 3,
              bias_id: 3,
              algorithm_id: 3
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
