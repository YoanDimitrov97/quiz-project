<template>
    <div>
        <Nav />
        <div class="playQuiz-main-box">
            <div class="playQuiz-box-1">
                <div><img src="~@/assets/doge.jpg" alt=""></div>
                <div class="box-1-cont">
                    <p>Question 1/10</p>
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repudiandae accusantium eaque eius, totam consequuntur natus sit perferendis enim ducimus, commodi veniam sapiente autem culpa ratione molestiae reprehenderit quos dolor!</h2>
                </div>
            </div>
            <div class="playQuiz-box-2">
                <div class="line-1">
                    <p class="playQuiz-answer-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, similique?</p>
                    <p class="playQuiz-answer-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, in?</p>
                </div>
                <div class="line-2">
                    <p class="playQuiz-answer-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, et.</p>
                    <p class="playQuiz-answer-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, repellendus?</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from './Nav';

export default {
    name: 'Play',
    components: {
        Nav
    },
}
</script>

<style lang="scss">
    .playQuiz-main-box {
        display: grid;
        margin: 100px auto;
        width: 720px;
        height: 500px;
        grid-template-rows: 2fr 1fr;
        .playQuiz-box-1 {
            background: #FFB45D;
            color: #fff;
            position: relative;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            div img {
                position: absolute;
                z-index: 1;
                width: 100%;
                height: 333px;
                object-fit: cover;
                border-radius:5px 0 0 5px;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            .box-1-cont {
                z-index: 2;
                position: relative;
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-rows: 10% 90%;
                p {
                    margin-left: 20px;
                    margin-top: 10px
                }
                h2 {
                    align-self: end;
                    text-align: center;
                    margin-bottom: 10px;
                }
            }
            
        }
        .playQuiz-box-2 {
            background: #fff;
            display: grid;
            grid-template-rows: 1fr 1fr;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            .line-1 {
                display: grid;
                justify-self: center;
                align-self: center;
                grid-template-columns: 1fr 1fr;
                grid-gap: 50px;
                p {
                    padding: 7px 20px;
                    border-radius: 20px;
                    background: #61045F;
                    color: #E8D0DF;
                    font-size: 1rem;
                }
                .playQuiz-answer-1{
                    margin-left: 20px;
                }
                .playQuiz-answer-2 {
                    margin-right: 20px;
                }
            }
            .line-2 {
                grid-gap: 50px;
                display: grid;
                justify-self: center;
                align-self: center;
                grid-template-columns: 1fr 1fr;
                p {
                    background: #61045F;
                    color: #E8D0DF;
                    font-size: 1rem;
                    padding: 7px 20px;
                    border-radius: 20px;
                }
                .playQuiz-answer-3{
                    margin-left: 20px;
                }
                .playQuiz-answer-4 {
                    margin-right: 20px;
                }
            }
        }
    }
</style>