<template>
    <div class="myQuiz_wrapper">
        <Nav /> 
        <div class="myQuiz_holder">
            <div class="create_quiz_btn"><p>Create New Quiz</p></div>
            <QuizBox />
        </div>
    </div>
</template>
<script>
import Nav from "./Nav.vue"
import MyQuizBox from "./MyQuiz/MyQuizBox.vue"
export default {
    name:"MyQuiz",
    components: {
        Nav, QuizBox
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