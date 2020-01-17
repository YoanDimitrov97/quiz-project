<template>
    <div class=quiz_box>
        <div class="leftside">
            <img src="../../assets/doge.jpg" alt="">
        </div>
        <div class="rightside">
            <div class="quiz_box_header">
                <p>Questions: <span>{{data.numOfQuestions}}</span></p>
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
    name:"QuizBox",
    props: {
        data: {}
    },
}
</script>
<style lang="scss">
$box_w: 720px;
.quiz_box {
    width:$box_w;
    // height:calc((#{$box_w} / 16) * 9);//if you want 16/9 resolution
    height:280px;
    background:#fff;
    display:grid;
    grid-template-columns:50% 50%;
    // border:1px solid #707070;
    border-radius:5px;
    box-sizing:border-box;

    .leftside {
        width:100%;
        height:100%;
        display:grid;
        justify-content:center;
        align-items:center;
        img {
            width:100%;
            height:100%;
            object-fit:cover;
            border-radius:5px 0 0 5px;
        }
    }
    .rightside {
        display:grid;
        grid-template-rows:20% 40% 40%; 
        padding:0 20px;
        .quiz_box_header{
            display:grid;
            grid-template-columns:calc(100% - 50px) 20px 20px;
            gap:5px;
            align-items:center;
            p:first-child {
                justify-self:start;
                span {
                    font-weight:700;
                }
            }
            p {
                line-height:20px;
                justify-self:end;
            }
            img{
                width:20px;
                height:20px;
            }
        }
        .main {
            display:grid;
            margin-top:25px;
            color:#61045F;
            font-weight:700;
            text-align:center;
        }
        .footer {
            display:grid;
            justify-content:center;
            div {
                display:grid;
                justify-content:center;
                align-items:center;
                color:#E8D0DF;
                background:#AA076B;
                width:240px;
                height:40px;
                border-radius:25px;
                cursor:pointer;

                &:last-child {
                    background:#61045F;
                }
            }
        }
    }
}
</style>