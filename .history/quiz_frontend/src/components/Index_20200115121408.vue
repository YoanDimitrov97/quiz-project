<template>
    <div>
        <Nav />
        <div class="wrapperz">
            <div></div>
            <div class="middle">
                <QuizBox :data=custom v-bind:key="num" v-for="num in num" />
            </div>
            <div class="rightside">
                <EnterCode />
            </div>
        </div>
    </div>
</template>
<script>
import Nav from "./Nav.vue"
import QuizBox from "./Index/QuizBox.vue"
import EnterCode from "./Index/EnterCode.vue"
export default {
    name:"Index",
    components: {
        Nav, QuizBox, EnterCode
    },
    data() {
        return {
            num:5,
            custom: {
                numOfQuestions:20,
                title: "It's Time To Find Out Which Member Of Pentagon You'll Date"
            }
        }
    }
}
</script>
<style lang="scss">

.wrapperz {
    width:100%;
    margin-top:10px;
    display:grid;
    grid-template-columns:30% 40% 30%;
    justify-items:center;
    position:absolute;
    z-index:1;

    .middle {
        overflow:auto;
        height:calc(100vh - 70px);

        & > * {
            margin-bottom:10px;
        }
    }
}
</style>