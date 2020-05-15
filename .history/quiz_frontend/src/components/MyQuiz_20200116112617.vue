<template>
    <div class="myQuiz_wrapper">
        <Nav />
        <div class="create_quiz_btn"><p>Create New Quiz</p></div>
        <div class="myQuiz_holder">

        </div>
    </div>
</template>
<script>
import Nav from "./Nav.vue"
export default {
    name:"MyQuiz",
    components: {
        Nav
    }
}
</script>
<style lang="scss">
.myQuiz_wrapper {
    width:100%;
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
    }
}   
</style>