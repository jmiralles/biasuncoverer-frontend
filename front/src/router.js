import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import PageNotFoundPage from "./pages/PageNotFoundPage.vue";
import BiasAndAlgorithmPage from "./pages/BiasAndAlgorithmPage.vue";
import AnalysisPage from "./pages/AnalysisPage.vue";
import AnalysisResultsPage from "./pages/AnalysisResultsPage.vue";

const AboutPage = () => import("./pages/AboutPage.vue");
const HomePage = () => import("./pages/HomePage.vue");

export default new Router({
  mode: "history",
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: "/",
      component: HomePage
    },
    {
      path: "/bias-algorithm",
      component: BiasAndAlgorithmPage
    },
    {
      path: "/analysis",
      component: AnalysisPage
    },
    {
      path: "/analysis/results/:id",
      component: AnalysisResultsPage
    },
    {
      path: "/about",
      component: AboutPage
    },
    {
      path: "*",
      component: PageNotFoundPage
    }
  ]
});
