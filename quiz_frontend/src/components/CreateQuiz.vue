<template>
<div class="wrapper">
    <div class="create_quiz">
        <ul class="category_select">
            <li>Categories</li>
            <ul>
                <li>History</li>
                <li>Education</li>
                <li>Trivia</li>
            </ul>
        </ul>
        <input type="text" placeholder="Title Name" class="quiz_title">
        <div class="questions" ref="container">
            <NewQuizQuestion/>
        </div>
        <div class="add_question" v-on:click="addQuestion"><p>+ Add New Question {{counter}}</p></div>
    </div>
</div>
</template>

<script>
import NewQuizQuestion from './CreateQuiz/NewQuizQuestion.vue'
import Vue from 'vue'

export default {
    name:"CreateQuiz",
    components: {
        NewQuizQuestion
    },
    data() {
        return {
            counter:1
        }
    },
    methods: {
    addQuestion: function () {
        var ComponentClass = Vue.extend(NewQuizQuestion)
        var instance = new ComponentClass()
        instance.$mount() // pass nothing
        this.$refs.container.appendChild(instance.$el)
    }
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
        }
    }
</style>