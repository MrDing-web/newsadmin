import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import EditPost from "../views/EditPost";
import PostList from "../views/PostList";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: {name:"PostList"},
        meta:{
            breadcrumb:"后台首页"
        },
        children:[
            {
                path:"editpost",
                name:"EditPost",
                component:EditPost,
                meta:{
                    breadcrumb:"编辑文章"
                }
            },
            {
                path:"postlist",
                name:"PostList",
                component: PostList,
                meta:{
                    breadcrumb:"文章列表"
                }
            }
        ]
    },
    {
        path:"/login",
        name:"Login",
        component: Login
    }
]

const router = new VueRouter({
    routes
})

export default router
