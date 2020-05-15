<template>
    <div class="myQuiz_wrapper">
        <Nav /> 
        <div class="myQuiz_holder">
            <button class="create_quiz_btn"><p>Create New Quiz</p></button>
            <MyQuizBox />
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
            test:""
        }
    },
    methods: {
        
    },
    beforeCreate() {
        bus.$on("userId", (data) => {
            Nav.userId = data
        })
        Axios.get("http://127.0.0.1:5000/quiz", {
            params: {
                createdBy:Nav.userId,
            }
        })
        .then(function (res) {
            console.log(res.data)
            console.log(this.test)
            this.test = res.data
            
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
    padding-top:10px;

    .create_quiz_btn {
        width:400px;
        background:#fff;
        border-radius:25px;
        height:30px;
        display:grid;
        align-content:center;
        justify-content:center;
    }
}   
</style>