<template>
<div class=quiz_box>
    <div class="leftside">
        <img src="../../assets/doge.jpg" alt="">
    </div>
    <div class="rightside">
        <div class="quiz_box_header">
            <p>Questions: <span></span></p>
            <p>4.7</p>
            <img src="../../assets/star.png" alt="">
        </div>
        <div class="main">
            <p>{{data.title}}</p>
        </div>
        <div class="footer">
            <div class="play_quiz"><p>Play Quiz</p></div>
            <div class="create_room"><p>Create a Room</p></div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:"MyQuizBox",
    props: {
        data: {}
    },
}
</script>
<style lang="scss">
    
</style>