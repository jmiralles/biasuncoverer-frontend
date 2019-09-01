import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import PageNotFoundPage from "./pages/PageNotFoundPage.vue";
import AnalysisPage from "./pages/AnalysisPage.vue";
import AnalysisResultsPage from "./pages/AnalysisResultsPage.vue";
import FormResult from "./pages/FormResult.vue";

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
      path: "/analysis",
      component: AnalysisPage
    },
    {
      path: "/analysis/results/:id",
      component: AnalysisResultsPage
    },
    {
      path: "/form/:result",
      component: FormResult
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
