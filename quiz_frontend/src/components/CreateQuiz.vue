<template>
<div class="special-background">
    <Nav /> 
    <div class="wrapper">
        <div class="create_quiz" v-bind:test=quizId>
            <select v-model="currCateg" class="category_select">
                <option v-bind:key="option" v-for="option in selectCategories">{{option}}</option>
            </select>
            <input type="text" placeholder="Quiz Title" class="quiz_title" v-model="quizTitle">
            <div class="questions" ref="container">
                <NewQuizQuestion :id=questionNum v-bind:key="questionNum" v-for="questionNum in questionNum" />
            </div>
            <div class="add_question" v-on:click="addQuestion"><p>+ Add New Question</p></div>
            <div class="save_quiz" v-on:click="saveQuiz"><p>Save Quiz</p></div>
        </div>
    </div>
</div>

</template>

<script>
import Nav from "./Nav.vue"
import NewQuizQuestion from './CreateQuiz/NewQuizQuestion.vue'
import Vue from 'vue'
import Axios from 'axios'
import {bus} from '../main.js'

export default {
    name:"CreateQuiz",
    components: {
        Nav, NewQuizQuestion
    },
    data() {
        return {
            quizId: this.$route.params.id,
            loadData:{},//holds get data of current quiz
            selectCategories: ["History", "Education", "Trivia", "Movies"],
            currCateg:"",//default
            quizTitle:"",
            questionNum:1,   
            questionData:{},//stores child components question data
            userId: ""
        }
    },
    methods: {
        addQuestion: function () {
            this.questionNum += 1
        },
        //Saves only Category, Title and Number of Questions... the actual questions are saved in NewQuizQuestions.vue 
        saveQuiz: function() {
            console.log(this.questionData);
            Axios.post(process.env.VUE_APP_URL + '/quiz/create', {
                title: this.quizTitle,
                numOfQuestions: this.questionNum,
                questions: this.questionData,
                category: this.currCateg,
                createdBy: this.userId
            })
            .then(function (res) {
                // console.log(res);
            })
            .catch(function (error) {
                // console.log(error);
            });
        },
    },
    mounted() {
        bus.$on("saveQuestion", (data) => {
            this.questionData[data.id] = data;  
        });
    },
    created() { 
        bus.$on("userId", (data) => {
            this.userId = data;
            // console.log(this.quizId);
            if (this.quizId){
                Axios.post(process.env.VUE_APP_URL + '/specific_quiz', {
                id: this.quizId,
                })
                .then(function (response) {
                    // get information of quiz
                    // console.log(response);
                })
                .catch(function (error) {
                    // console.log(error);
                });
            }
        })
    }
}
</script>
<style lang="scss">
$categ_h:40px; //height of category and title of quiz
$categ_w: 700px;
.special-background{
    height: 100vh;
    width: 100vw;
    background: transparent linear-gradient(1deg, #3C4568 0%, #3C4568 100%) 0% 0% no-repeat padding-box;
}

.wrapper {
    width:70%;
    height: calc(100vh - 60px); // This 60px come from the header
    overflow: auto;
    margin:0 auto;
    .create_quiz {
        width:$categ_w;
        // height: 500px;
        margin:10px auto;
        display:grid;
        grid-template-rows:$categ_h $categ_h calc(100% - #{$categ_h * 2} $categ_h $categ_h); // This must be fixed .... !
        gap:10px;

        .category_select {
            &:first-child {
                width:100%;
                background:#fff;
                border-radius: 5px;
                height:$categ_h;
                display:grid;
                align-content:center;
                text-indent:15px;
                cursor:pointer;
                box-sizing:border-box;

                &:hover {
                    // position:relative;
                    border-radius: 5px 5px 0 0;
                    border-bottom:1px solid #eee;

                    li ~ ul {
                        display:grid;
                        
                        & > li:hover {
                            background:#eee;

                            //to keep the border radius at the bottom of the categ ul
                            &:last-child {
                                border-radius: 0 0 5px 5px;
                            }
                        }
                    }
                }
            }
        }

        .quiz_title {
            border-radius:5px;
            height:$categ_h;
            text-indent:15px;
            border:none;
        }

        .questions {
            display: grid;
            width:$categ_w;
        }
        .add_question {
            width:$categ_w;
            background:#fff;
            border-radius:5px;
            height:30px;
            display:grid;
            align-items:center;
            text-indent:15px;
            cursor:pointer;
        }

        .save_quiz {
            width:160px;
            background:lime;
            cursor:pointer;
        }
    }
}
</style>