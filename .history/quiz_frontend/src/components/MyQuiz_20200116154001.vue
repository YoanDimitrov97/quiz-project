<template>
    <div class="myQuiz_wrapper">
        <Nav /> 
        <div class="myQuiz_holder">
            <button v-on:click="this.$router.push("create_quiz")" class="create_quiz_btn"><p>Create New Quiz</p></button>
            <MyQuizBox :data=quiz v-for="quiz in quizes" v-bind:key=quiz />
        </div>
    </div>
</template>
<script>
import Nav from "./Nav.vue"
import MyQuizBox from "./MyQuiz/MyQuizBox.vue"
import Axios from 'axios'
import {bus} from "../main.js"
export default {
    name:"MyQuiz",
    components: {
        Nav, MyQuizBox
    },
     data () {
        return {
            userId:null,
            quizes:[],
        }
    },
    methods: {
        
    },
    beforeCreate() {
        bus.$on("userId", (data) => {
            this.userId = data
        })
        Axios.get("http://127.0.0.1:5000/quiz", {
            params: {createdBy:this.userId}
        })
        .then(res => {
            this.quizes = res.data
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>
<style lang="scss">
.myQuiz_holder {
    width:70%;
    margin: 0 auto;
    display:grid;
    justify-content:center;

    .create_quiz_btn {
        width:400px;
        background:#fff;
        border-radius:25px;
        height:30px;
        display:grid;
        align-content:center;
        justify-content:center;
        justify-self:center;
        border:none;
    }

    & > * {
        margin-top:10px;
    }
}   
</style>