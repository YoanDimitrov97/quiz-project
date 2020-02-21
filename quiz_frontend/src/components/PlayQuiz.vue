<template>
    <div>
        <Nav />
        <div class="play_wrapper">
            <div v-if="!endQuiz" class="play_box">
                <div class="play_header">
                    <div class="play_top_row">
                        <div class="play_q_num"><span>Question:</span>{{quiz.questions[0][qNum].id}}/{{quiz.numOfQuestions}}</div>
                        <div class="play_q_timer">{{currentPoints}} points</div>
                    </div>
                    <div class="play_bottom_row">
                        <div class="play_q_title">{{quiz.questions[0][qNum].title}}</div>
                    </div>
                </div>
                <div class="play_main">
                    <div class="play_q_line1">
                        <div class="play_q_1" v-on:click="pickAnswer('A')"><p>{{quiz.questions[0][qNum].answerA}}</p></div>
                        <div class="play_q_2" v-on:click="pickAnswer('B')"><p>{{quiz.questions[0][qNum].answerB}}</p></div>
                    </div>
                    <div class="play_q_line2">
                        <div class="play_q_3" v-on:click="pickAnswer('C')"><p>{{quiz.questions[0][qNum].answerC}}</p></div>
                        <div class="play_q_4" v-on:click="pickAnswer('D')"><p>{{quiz.questions[0][qNum].answerD}}</p></div>
                    </div>
                </div>
            </div>
            <div v-else class="end_quiz_box">
                <div class="end_quiz_top">
                    <p>Congratulations!</p>
                    <p>You've finished the "{{quiz.title}}" and earned {{currentPoints}}/{{totalPoints}} points...</p>
                </div>
                <div class="end_quiz_middle">
                    <!-- star image divs -->
                    <div >
                        <Star :class="{star_full:star_full}" v-on:mouseover.native='drawStars()' :starId="starNum++" v-for="starNum in 5" :key="starNum" ref="star"/>
                    </div>
                </div>
                <div class="end_quiz_bottom">
                    <div class="go_back_btn" v-on:click="$router.push('/')"><p>Go Back</p></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Nav from "./Nav.vue"
import Star from "./PlayQuiz/Star.vue"
import Axios from 'axios'
import {bus} from "../main.js"
export default {
    name:"PlayQuiz",
    components: {
        Nav, Star
    },
    data() {
        return {
            quiz:[],
            qNum:1,
            userId:null,
            quizId:this.$route.params.id,
            endQuiz:false,
            currentPoints:0,
            totalPoints:0,
            starNum:0,
            star_full:false,
        }
    },
    methods: {
        loadQuiz: function(){
             Axios.post("http://127.0.0.1:5000/specific_quiz", {id:this.quizId})
            .then(res => {
                this.quiz = res.data;
                this.calculateTotalPoints();
                console.log(this.quiz);
            })
            .catch(function (error) { console.log(error); });
        },
        pickAnswer: function(answer){
            if(answer == this.quiz.questions[0][this.qNum].correct){
                console.log("correct");
                this.currentPoints += parseInt(this.quiz.questions[0][this.qNum].questionPoints);
            } else {
                console.log("incorrect");
            }
            //move to next question
            if(this.qNum != this.quiz.numOfQuestions)
                this.qNum++;
            else {
                this.finishQuiz();
            }
        },
        calculateTotalPoints: function(){
            for(var i in this.quiz.questions[0]){
                this.totalPoints += parseInt(this.quiz.questions[0][i].questionPoints);
            }
        },
        finishQuiz: function(){
            this.endQuiz = true;
            Axios.post("http://127.0.0.1:5000/play/completeQuiz", {userId: this.userId, quizId:this.quizId, earnedPoints:this.currentPoints})
            .then(res => {
                console.log(res);
            })
            .catch(function (err) { console.log(err); });
        },
        starRating: function (starNum) {
            var stars = document.querySelectorAll(".star");
            console.log(stars);
            console.log(stars.length);
            //Animating stars on hover
            //if you mouseenter first half of star
            if(starNum % Math.ceil(starNum) != 0){
                document.querySelector(".star:nth-child(2)").style.backgroundImage = "../assets/full_star.png";
                // for(var i = stars.length; i > 0; i--){
                //     stars[2].style.backgroundImage = "../assets/full_star.png";
                    
                // }
                stars[Math.ceil(starNum)].style.backgroundImage="../assets/half_star.png";
            }
        },
        drawStars: function(){
            this.$refs.star[this.starNum].starOn = true;
     
           
            // this.star_full = true;
          //  this.$refs.star.star_full = true
        }
    },
    mounted() {
        this.loadQuiz();
    }, 
    created() {
        bus.$on("userId", (data) => {
            this.userId = data
            console.log(this.userId);
        })
    }
}
</script>
<style lang="scss">
@function random_element($elements){
    @return nth($elements, random(length($elements)))
}
$qColor: random_element(#FFB45D #4ddb73 #49d4de #8091ff #ff7575);
.play_wrapper {
    display:grid;
    width:100%;
    height:calc(100vh - (60px * 2));
    align-content:center;
    justify-content:center;

    .play_box {
        width:720px;
        background:$qColor;
        height:420px;
        border-radius:5px;
        display:grid;
        grid-template-rows:210px 210px;

        .play_header {
            display:grid;
            grid-template-rows:50px 160px;

            .play_top_row {
                display:grid;
                grid-template-columns:50% 50%;
                align-content:center;
                justify-items:start;
                .play_q_num {
                    padding-left:40px;
                    span {
                        font-weight:300;
                    }
                }
                .play_q_timer {
                    justify-self:end;
                    padding-right:40px;
                }
            }

            .play_bottom_row {
                display:grid;
                justify-items:center;
                align-content:center;
                font-size:32px;
                .play_q_title {
                    box-sizing:border-box;
                    padding:0 40px;
                    text-align:center;
                }
            }
            & > * {
                color:#fff;
            }
        }

        .play_main {
            background:#fff;
            display:grid;
            grid-template-rows:50% 50%;

            .play_q_line1 {
                display:grid;
                grid-template-columns:50% 50%;
                justify-items:center;
                align-content:end;
                div {
                     width:200px;
                     height:40px;
                     border-radius:25px;
                     background:$qColor;
                     display:grid;
                     align-items:center;
                     justify-content:center;
                     color:#fff;
                     cursor:pointer;
                 }
                 &>div:first-child{
                     justify-self:end;
                     margin-right:30px;
                 }
                 &>div:last-child{
                     justify-self:start;
                     margin-left:30px;
                 }
                 &>div:hover {
                     background:#fff;
                     color:$qColor;
                     border:2px solid $qColor;
                 }
            }
            .play_q_line2 {
                display:grid;
                grid-template-columns:50% 50%;
                align-content:center;
                div {
                     width:200px;
                     height:40px;
                     border-radius:25px;
                     background:$qColor;
                     display:grid;
                     align-items:center;
                     justify-items:center;
                     color:#fff;
                     cursor:pointer;
                 }
                 &>div:first-child{
                     justify-self:end;
                     margin-right:30px;
                 }
                 &>div:last-child{
                     justify-self:start;
                     margin-left:30px;
                 }
                 &>div:hover {
                     background:#fff;
                     color:$qColor;
                     border:2px solid $qColor;
                 }
            }
        }
    }
    .end_quiz_box {
        width:720px;
        background:$qColor;
        height:420px;
        border-radius:5px;
        display:grid;
        align-items:center;
        justify-content:center;
        grid-template-rows:60% 10% 30%;
        font-size:36px;
        padding:0 50px;
        text-align:center;
        color:#fff;
        .end_quiz_middle {
            div {
                display:flex;
                flex-direction:row;
                justify-content:center;
            }
        }
        .end_quiz_bottom {
            font-size:16px;
            display:grid;
            align-items:center;
            justify-content:center;
            
            .go_back_btn {
                width:240px;
                height:50px;
                background:#fff;
                color:$qColor;
                border-radius:25px;
                display:grid;
                align-items:center;
                justify-content:center;
                cursor:pointer;
            }
        }
    }
}
</style>