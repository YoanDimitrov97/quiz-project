<template>
    <div class="quiz_question" v-on:change=saveChanges v-bind:id=id>
        <div class="question_header">
            <select v-model="data2.questionTime">
                <option value="" selected disabled>Time</option>
                <option value="00:10">00:10s</option>
                <option value="00:15">00:15s</option>
                <option value="00:30">00:30s</option>
            </select>
            <div class="question_pic">
                <!-- <input type="file" id="quiz_pic" value="Upload Images"> -->
                <!-- <div>
                    <label class="quiz-label" for="quiz_pic"><p>Upload Image</p><img src="~@/assets/images/upload.svg" alt=""></label>
                </div> -->
            </div>
            <select v-model="data2.questionPoints" name="" id="">
                <option value="" selected disabled>Points</option>
                <option value="10">10 Points</option>
                <option value="20">20 Points</option>
                <option value="30">30 Points</option>
            </select>
            <img src="img/error.png" alt="">
        </div>
        <div class="question_body">
            <textarea v-model="data2.title" cols="30" placeholder="Write your question here..." rows="10"></textarea>
        </div>
        <div class="question_footer">
            <div>
                <div>
                    <input v-model="data2.answerA" type="text" placeholder="Answer A">
                    <img v-on:click="answerClicked('A')" :src="answerCheck == 'A' ? images.clicked : images.default">
                </div>
                <div>
                    <input v-model="data2.answerB" type="text" placeholder="Answer B">
                    <img v-on:click="answerClicked('B')" :src="answerCheck == 'B' ? images.clicked : images.default">
                </div>
            </div>
            <div>
                <div>
                    <input v-model="data2.answerC" type="text" placeholder="Answer C">
                    <img v-on:click="answerClicked('C')" :src="answerCheck == 'C' ? images.clicked : images.default">
                </div>
                <div>
                    <input v-model="data2.answerD" type="text" placeholder="Answer D">
                    <img v-on:click="answerClicked('D')" :src="answerCheck == 'D' ? images.clicked : images.default">
                </div>
            </div>
        </div>
        <div class="question-delete">
            <div class="delete-btn"><p>Delete Question</p><img src="~@/assets/images/Delete.svg" alt=""></div>
        </div>
    </div>
</template>
<script>
import {bus} from "../../main"
import { setTimeout } from 'timers'
import { log } from 'util'
import Axios from 'axios'
export default {
    name:"NewQuizQuestion",
    data() {
        return {
            images:{
                default: require("@/assets/images/Ellipse-3.svg"),
                clicked: require("@/assets/images/Ellipse-4.svg"),
            },
            answerCheck: "",
            data: {
                title:"",
                questionTime:"",
                questionPoints:"",
                answerA: "",
                answerB: "",
                answerC: "",
                answerD: "",
                correct: "A",
            },
            data2: {

            }
        }
    },
    props: {
        id: null,
        questionData: {}
    },
    created() {
        if(!this.questionData) {
            console.log("IF");
            this.data2 = this.data;
        }else {
            console.log("ELSE");
            this.data2 = this.questionData;
        }     

        // const quizId = this.$route.params.id;
        // if(quizId){
        //     Axios.post(process.env.VUE_APP_URL + `/update_quiz`, {
        //         quizId: quizId
        //     }).then(res => {

        //     }).catch(err => { console.log(err) });
        // }
        console.log(this.id);
        console.log(this.data2.correct);
        switch(this.data2.correct) {
            case 'A':
                this.answerCheck = 'A';
                this.data.correct = 'A';
                break;
            case 'B':
                this.answerCheck = 'B';
                this.data.correct = 'B';
                break;
            case 'C':
                this.answerCheck = 'C';
                this.data.correct = 'C';
                break;
            case 'D':
                this.answerCheck = 'D';
                this.data.correct = 'D';
                break;
        }
    },
    methods: {
        answerClicked(answer) {
            switch(answer) {
                case 'A':
                    this.answerCheck = 'A';
                    this.data.correct = 'A';
                    break;
                case 'B':
                    this.answerCheck = 'B';
                    this.data.correct = 'B';
                    break;
                case 'C':
                    this.answerCheck = 'C';
                    this.data.correct = 'C';
                    break;
                case 'D':
                    this.answerCheck = 'D';
                    this.data.correct = 'D';
                    break;
            }
            this.saveChanges();
        },
        saveChanges() {
            var sendData = {
                id:this.id,
                title:this.data.title,
                questionTime:this.data.questionTime,
                questionPoints:this.data.questionPoints,
                answerA: this.data.answerA,
                answerB: this.data.answerB,
                answerC: this.data.answerC,
                answerD: this.data.answerD,
                correct: this.data.correct,
            }
            bus.$emit("saveQuestion", sendData)
        }     
    },
}
</script>
<style lang="scss">
$categ_h:30px; //height of category and title of quiz
$categ_w: 480px;
$question_h:370px;
.quiz_question {
    width:100%;
    height:$question_h;
    display:grid;
    align-self: center;
    grid-template-rows:15% 45% 35% 5%;
    background:#242B4C;
    border-radius:5px;
    box-shadow: 0px 0px 12px rgba(28, 1, 27, 0.5);
    margin-top: 25px;
    margin-bottom:60px;

    .question_header {
        display:grid;
        grid-template-columns:18% 64% 18%;
        select {
            margin-top: 10px;
            background: #8C94BE;
            color: #202F53;
            justify-self: center;
            align-self: center;
            width: 100px;
            height:30px;//is 10% of 240px
            border:none;
            border-radius: 5px;
        }
        .question_pic {
            justify-self: center;
            align-self: center;
            position:relative;
            width: 180px;
            input {
                width:0px;
                height:0px;
            }
            div label {
                top:-30px;
                position:absolute;
                z-index:1;
            }
            .quiz-label {
                width: 180px;
                display: grid;
                grid-template-columns: 80% 20%;
                background: #8C94BE;
                border-radius: 20px;
                padding: 4px 4px;
                img {
                    justify-self: end;
                    align-self: center;
                    width: 30px;
                }
                p {
                    justify-self: center;
                    align-self: center;
                    color: #202F53;
                }
            }
        }
    }

    .question_body {
        width:$categ_w;
        display:grid; 
        justify-self: center;
        align-self: center;
        textarea::placeholder {
            color: #fff;
        }
        textarea {
            color: #fff;
            width:calc(100% - 15px * 2);
            height:calc(80% - 15px * 2);
            align-self:center;
            justify-self:center;
            resize:none;
            padding:15px;
            background: #202F53;
            border: 2px solid #0E476D;
            border-radius: 5px;
        }
        textarea:focus {
            outline: none;
        }
    }

    .question_footer {
        width:100%;
        height:100%;
        display:grid;
        grid-template-rows:50% 50%;
        
        & > div {
            display:grid;
            grid-template-columns:50% 50%;
            align-items:center;
            & > div {
                display: grid;
                width: 250px;
                grid-template-columns: 80% 20%;
                justify-self:center;
                border: 2px solid #0E476D;
                background: #202F53;
                border-radius: 5px;
                padding: 0 7px;
                input {
                    border:none;
                    background: #202F53;
                }
                input:focus {
                    outline: none;
                }
                input:first-child {
                    color: #fff;
                    height:40px;
                }
                img {
                    align-self: center;
                    width: 25px;
                    cursor: pointer;
                }
            }
        }
    }
    .question-delete {
        display: grid;
    }
    .delete-btn {
        width: 180px;
        display: grid;
        grid-template-columns: 80% 20%;
        background: #141C2E;
        border-radius: 20px;
        padding: 4px 4px;
        justify-self: center;
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
</style>