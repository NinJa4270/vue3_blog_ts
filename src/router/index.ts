import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home.vue");
const Main = () => import(/* webpackChunkName: "Main" */ "../views/Main/Main.vue");
const List = () => import(/* webpackChunkName: "List" */ "../views/List/index.vue");
const Center = () => import(/* webpackChunkName: "Center" */ "../views/Center/index.vue")
const Article = () => import(/* webpackChunkName: "Article" */ "../views/Article/index.vue")
const Login = () => import(/* webpackChunkName: "Login" */ "../views/Login/index.vue")
const AddArticle = () => import(/* webpackChunkName: "Admin" */ "../views/Admin/AddArticle/index.vue")
const ArticleList = () => import(/* webpackChunkName: "Admin" */ "../views/Admin/ArticleList/index.vue")

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/main",
    component: Home,
    children: [
      {
        path: "/main",
        name: "main",
        component: Main,
      },
      {
        path: "/list",
        name: "List",
        component: List
      },
      {
        path: "/center",
        name: "Center",
        component: Center
      },
      {
        path: "/article",
        name: "Article",
        component: Article
      },
      {
        path: "/articleList",
        name: "ArticleList",
        component: ArticleList
      },
      {
        path: "/addArticle",
        name: "AddArticle",
        component: AddArticle
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
