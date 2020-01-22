import Vue from 'vue'
import Router from 'vue-router'
import CreateQuiz from './components/CreateQuiz.vue'
import Index from './components/Index.vue'
import MyQuiz from './components/MyQuiz.vue'
// import Nav from './components/Nav.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path:'/',
            component: Index
        },
        {
            path:'/my_quiz',
            component: MyQuiz
        },
        {
            path:'/create_quiz/:id',
            component:CreateQuiz
        }
    ]
})