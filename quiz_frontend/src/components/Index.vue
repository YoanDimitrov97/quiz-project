<template>
    <div>
        <Nav />
        <div class="wrapperz">
            <div></div>
            <div class="middle">
                <QuizBox :data=quiz :user=user v-bind:key="index" v-for="(quiz, index) in quizes" />
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
import Axios from 'axios'
import {bus} from "../main.js"
export default {
    name:"Index",
    components: {
        Nav, QuizBox, EnterCode
    },
    data() {
        return {
            quizes:[],
            user: [],
        }
    },
    methods: {
        //right now loads only logged user's quizes
        loadTopQuizes: function () {
            Axios.post(process.env.VUE_APP_URL + "/all_quizes")
            .then(res => {
                this.quizes = res.data
                console.log(this.quizes);
            })
            .catch(function (error) {
                console.log(error);
            });
        } 
    },
    created() {
        Axios.get(process.env.VUE_APP_URL)
            .then(res => {
                this.user = res.data;
            }).catch(err => { console.log(err) });
        this.loadTopQuizes();
    },
}
</script>
<style lang="scss">
.wrapperz {
    position: absolute;
    width:100%;
    margin-top:10px;
    display:grid;
    grid-template-columns:30% 40% 30%;
    justify-items:center;
    position:absolute;
    z-index:1;

    .middle {
        justify-self: center;
        overflow:auto;
        height:calc(100vh - 70px);

        & > * {
            margin-bottom:10px;
        }
    }
    .right-side {
        justify-self: start;
    }
}
</style>