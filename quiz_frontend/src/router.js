import Vue from 'vue'
import Router from 'vue-router'
import CreateQuiz from './components/CreateQuiz.vue'
import Nav from './components/Nav.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            component: Nav
        },
        {
            path:'/create_quiz.html',
            component:CreateQuiz
        }
    ]
})