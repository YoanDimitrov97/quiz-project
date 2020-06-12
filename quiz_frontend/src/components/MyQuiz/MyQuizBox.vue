<template>
    <div class="quiz_box">
        <div class="leftside">
            <img src="../../assets/doge.jpg" alt />
        </div>
        <div class="rightside">
            <div class="quiz_box_header">
                <p>
                    Questions:
                    <span>{{ data.numOfQuestions }}</span>
                </p>
                <p>4.7</p>
                <img src="../../assets/star.png" alt />
            </div>
            <div class="main">
                <p>{{ data.title }}</p>
            </div>
            <div class="footer">
                <div
                    v-on:click="
                        editQuiz();
                        changeButton();
                    "
                    :quizid="data._id"
                    class="play_quiz"
                >
                    <p>Edit Quiz</p>
                </div>
                <div
                    v-on:click="deleteQuiz"
                    :quizid="data._id"
                    class="play_quiz"
                >
                    <p>Delete Quiz</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from "axios";
import { bus } from "../../main";
import { mapActions } from "vuex";
export default {
    name: "MyQuizBox",
    props: {
        data: {},
        index: null,
    },
    methods: {
        ...mapActions(["changeButton"]),
        editQuiz() {
            this.$router.push({ path: `/edit_quiz/${this.data._id}` });
        },
        deleteQuiz() {
            Axios.post(process.env.VUE_APP_URL + "/quiz/delete", {
                quizId: this.data._id,
                numOfQuestions: this.data.numOfQuestions,
            })
                .then((res) => {
                    this.$emit("deleteQuiz", this.index);
                })
                .catch((err) => {});
        },
    },
};
</script>
<style lang="scss"></style>
