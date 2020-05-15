import Vue from 'vue'
import Router from 'vue-router'
import CreateQuiz from './components/CreateQuiz.vue'
// import Nav from './components/Nav.vue'
import Index from './components/Index.vue'
// import Play from './components/Play.vue'
import MyQuiz from './components/MyQuiz.vue'
import PlayQuiz from './components/PlayQuiz.vue'
import CreateRoom from './components/CreateRoom.vue'
// import Nav from './components/Nav.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path:'/',
            name: 'Index',
            component: Index
        },
        {
            path:'/my_quiz',
            name: 'MyQuiz',
            component: MyQuiz
        },
        {
            path:'/create_quiz/:id',
            component:CreateQuiz
        },
        {
            path:'/create_quiz/',
            component:CreateQuiz
        },
        {
            path:'/play/:id',
            component:PlayQuiz
        },
        {
            path:'/room/:id',
            component:CreateRoom
        },
    ]
})