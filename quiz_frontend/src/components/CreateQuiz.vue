<template>
<div class="special-background">
    <Nav /> 
    <div class="wrapper">
        <div v-if="userId" class="create_quiz" v-bind:test=quizId>
            <select v-model="currCateg" class="category_select">
                <option disabled selected="selected" value>Select Category</option>
                <option v-bind:key="option" v-for="option in selectCategories">{{option}}</option>
            </select>
            <input type="text" placeholder="Quiz Title" class="quiz_title" v-model="quizTitle">
            <input type="file" id="quiz_pic" value="Upload Images">
            <label class="quiz-label" for="quiz_pic"><p>Upload Image</p><img src="~@/assets/images/upload.svg" alt=""></label>
            <div class="questions" ref="container">
                <NewQuizQuestion :id="questionNum" :quizId="quizId" :questionData="questionData[questionNum]" :key="questionNum" v-for="questionNum in questionNum" @deleteQuestion="deleteQuestion" />
            </div>
            <div class="add-save-container">
                <div class="add_question" v-on:click="addQuestion"><p>Add New Question</p><img src="~@/assets/images/add.svg"></div>
                <div class="save_quiz" v-on:click="saveQuiz"><p>Save Quiz</p><img src="~@/assets/images/Save.svg"></div>
            </div> 
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
            questionNum:0,   
            questionData:{},//stores child components question data
            userId: "",
            questionDataForSave: []
        }
    },
    methods: {
        deleteQuestion(id) {
            console.log(id);
            this.questionNum -= 1
        },
        addQuestion: function () {
            this.questionNum += 1
        },
        //Saves only Category, Title and Number of Questions... the actual questions are saved in NewQuizQuestions.vue 
        saveQuiz: function() {
            console.log(this.questionDataForSave);
            Axios.post(process.env.VUE_APP_URL + '/quiz/create', {
                title: this.quizTitle,
                numOfQuestions: this.questionNum,
                questions: this.questionDataForSave,
                category: this.currCateg,
                createdBy: this.userId
            })
            .then(res => {
                this.$router.push({ name: 'MyQuiz' });
            })
            .catch(function (error) {
                // console.log(error);
            });
        },
    },
    mounted() {
        if (this.quizId){
            Axios.post(process.env.VUE_APP_URL + '/specific_quiz', {
                id: this.quizId,
            })
            .then(res => {
                this.currCateg = res.data.category;
                this.quizTitle = res.data.title;
                this.questionNum = res.data.numOfQuestions;
                this.questionData = res.data.questions;
            }).catch(err => { console.log(err) });
        }
        bus.$on("saveQuestion", (data) => {
            if(data != null) {
                this.questionDataForSave[data.id] = data;  
            }
            
        });
    },
    created() {
        bus.$on("user", (data) => {
            this.userId = data.userId;
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
        #quiz_pic {
            width:0px;
            height:0px;
        }
        .quiz-label {
            // width: 180px;
            display: grid;
            grid-template-columns: 50% 50%;
            background: #8C94BE;
            border-radius: 20px;
            padding: 4px 4px;
            img {
                justify-self: end;
                align-self: center;
                width: 30px;
                margin-left: 10px;
            }
            p {
                margin-left: 10px;
                justify-self: start;
                align-self: center;
                color: #202F53;
            }
        }
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
        .category_select:focus {
            outline: none;
        }
        .quiz_title {
            border-radius:5px;
            height:$categ_h;
            text-indent:20px;
            border:none;
        }
        .quiz_title:focus {
            outline: none;
        }
        .quiz_title::placeholder {
            color: #000;
        }

        .questions {
            display: grid;
            width:$categ_w;
        }
        .add-save-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 70px;
            .add_question {
                width: 180px;
                display: grid;
                grid-template-columns: 80% 20%;
                background: #16192C;
                border-radius: 20px;
                padding: 4px 4px;
                justify-self: end;
                box-shadow: 0px 0px 12px rgba(28, 1, 27, 0.5);
                img {
                    justify-self: end;
                    align-self: center;
                    width: 30px;
                }
                p {
                    justify-self: center;
                    align-self: center;
                    color: #fff;
                }
            }

            .save_quiz {
                width: 180px;
                display: grid;
                grid-template-columns: 80% 20%;
                background: #0879F2;
                border-radius: 20px;
                padding: 4px 4px;
                justify-self: start;
                img {
                    justify-self: end;
                    align-self: center;
                    width: 30px;
                }
                p {
                    justify-self: center;
                    align-self: center;
                    color: #FFF;
                }
            }
        }
    }
}
</style>