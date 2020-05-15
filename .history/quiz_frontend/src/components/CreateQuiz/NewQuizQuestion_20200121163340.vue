<template>
    <div class="quiz_question" v-on:change=saveChanges v-bind:id=id>
        <div class="question_header">
            <select>
                <option selected>00:10s</option>
                <option>00:15s</option>
                <option>00:30s</option>
            </select>
            <div class="question_pic">
                <input type="file" id="quiz_pic" value="Upload Images">
                <div>
                    <label for="quiz_pic"><p>Upload Image</p></label>
                </div>
            </div>
            <select name="" value="" id="">
                <option selected>10 Points</option>
                <option>20 Points</option>
                <option>30 Points</option>
            </select>
            <img src="img/error.png" alt="">
        </div>
        <div class="question_body">
            <textarea v-model="questionData.title" cols="30" placeholder="Write your question here..." rows="10"></textarea>
        </div>
        <div class="question_footer" v-on:change=saveChanges>
            <div>
                <div>
                    <input v-model="questionData.answerA" type="text" placeholder="Answer A">
                    <input type="radio" name="correctAnswer">
                </div>
                <div>
                    <input v-model="questionData.answerB" type="text" placeholder="Answer B">
                    <input type="radio" name="correctAnswer">
                </div>
            </div>
            <div>
                <div>
                    <input v-model="questionData.answerC" type="text" placeholder="Answer C">
                    <input type="radio" name="correctAnswer">
                </div>
                <div>
                    <input v-model="questionData.answerD" type="text" placeholder="Answer D">
                    <input type="radio" name="correctAnswer">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {bus} from "../../main"
import { setTimeout } from 'timers'
export default {
    name:"NewQuizQuestion",
    data() {
        return {
            questionData: {
                title:"",
                answerA: "",
                answerB: "",
                answerC: "",
                answerD: "",
            }
        }
    },
    props: ['id'],
    methods: {
        saveChanges() {
            var data = {
                id:this.id,
                title:questionData.title,
                answerA: questionData.answerA,
                answerB: questionData.answerB,
                answerC: questionData.answerC,
                answerD: questionData.answerD,
            }
            bus.$emit("saveQuestion", {})
            console.log("Saving... " + this.id)
        }     
    },
}
</script>
<style lang="scss">
$categ_h:30px; //height of category and title of quiz
$categ_w: 480px;
$question_h:240px;
.quiz_question {
    width:100%;
    height:$question_h;
    display:grid;
    grid-template-rows:10% 45% 45%;
    background:#5D083C;
    border-radius:5px;
    box-shadow: 0px 0px 12px #1C011B;
    margin-bottom:20px;

    .question_header {
        display:grid;
        grid-template-columns:18% 64% 18%;
        
        select {
            height:24px;//is 10% of 240px
        }
        .question_pic {
            position:relative;
            input {
                width:1px;
                height:1px;
            }
            div label {
                top:0;
                position:absolute;
                z-index:1;
            }
        }
    }

    .question_body {
        width:$categ_w;
        display:grid; 

        textarea {
            width:calc(80% - 15px * 2);
            height:calc(80% - 15px * 2);
            align-self:center;
            justify-self:center;
            resize:none;
            padding:15px;
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
            gap:10px;
            
            & > div {
                position:relative;
                justify-self:center;
                input {
                    border:none;
                }
                input:first-child {
                    position:relative;
                    height:40px;
                }
                input:last-child {
                    position:absolute;
                    top:0;
                    left:0;
                }
            }
        }
    }
}
</style>