<template>
<div>
    <Nav /> 
    <div class="wrapper">
        <div class="create_quiz" v-on:change="saveQuiz">
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
            selectCategories: ["History", "Education", "Trivia", "Movies"],
            currCateg:"",//default
            quizTitle:"",
            questionNum:1,   
        }
    },
    methods: {
    addQuestion: function () {
        this.questionNum += 1
        console.log(this.counter)
    },
    //Saves only Category, Title and Number of Questions... the actual questions are saved in NewQuizQuestions.vue 
    saveQuiz: function() {
        console.log(`Saving... Category: ${this.currCateg} Title: ${this.quizTitle} Num: ${this.questionNum}`)
        // this.$emit("getQuestions")
        Axios.post('http://127.0.0.1:5000/quiz/create', {
            title: this.quizTitle,
            numOfQuestions: this.questionNum,
            category: this.currCateg,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
  },
  created() {
      console.log(Nav.userId)
  }
}
</script>
<style lang="scss">
    $categ_h:30px; //height of category and title of quiz
    $categ_w: 480px;
    .wrapper {
        width:70%;
        margin:0 auto;

        .create_quiz {
            width:$categ_w;
            margin:10px auto;
            display:grid;
            grid-template-rows:$categ_h $categ_h calc(100% - #{$categ_h * 2});
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
                        position:relative;
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
                ul {
                    display:none;
                    width:100%;
                    background:#fff;
                    position:absolute;
                    top:$categ_h;
                    border-radius: 0 0 5px 5px;
                    z-index:2;
                    
                    li {
                        line-height:25px;
                        height:25px;
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