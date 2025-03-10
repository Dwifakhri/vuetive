const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

import HomeComponent from "./pages/home.js";
import TaskListComponent from "./pages/taskList.js";
import CreateTaskComponent from "./pages/createTask.js";
import NavbarComponent from "./components/navbar.js";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", meta: { title: "Home" }, component: HomeComponent },
    {
      path: "/task",
      meta: { title: "Task List" },
      component: TaskListComponent
    },
    {
      path: "/task/form",
      meta: { title: "Task Form" },
      component: CreateTaskComponent
    }
  ]
});

const app = createApp();

router.afterEach((to) => {
  document.title = to.meta.title + " | Vuetive";
});

app.component("navbar", NavbarComponent);

app.use(router).mount("#app");
