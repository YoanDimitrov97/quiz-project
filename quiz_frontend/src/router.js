import Vue from 'vue'
import Router from 'vue-router'
import CreateQuiz from './components/CreateQuiz.vue'
// import Nav from './components/Nav.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path:'/',
        },
        {
            path:'/create_quiz',
            component:CreateQuiz
        }
    ]
})