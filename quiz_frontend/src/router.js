import Vue from 'vue'
import Router from 'vue-router'
import CreateQuiz from './components/CreateQuiz.vue'
import Index from './components/Index.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            component: Index
        },
        {
            path:'/create_quiz.html',
            component:CreateQuiz
        }
    ]
})