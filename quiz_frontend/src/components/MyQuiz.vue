<template>
    <div class="myQuiz_wrapper">
        <Nav />
        <div v-if="userId" class="myQuiz_holder">
            <button
                v-on:click="$router.push('/create_quiz/')"
                class="create_quiz_btn"
            >
                <p>Create New Quiz</p>
            </button>
            <MyQuizBox
                @deleteQuiz="deleteQuiz"
                :data="quiz"
                :index="index"
                v-for="(quiz, index) in quizes"
                :key="index"
            />
        </div>
    </div>
</template>
<script>
import Nav from "./Nav.vue";
import MyQuizBox from "./MyQuiz/MyQuizBox.vue";
import Axios from "axios";
import { bus } from "../main.js";
export default {
    name: "MyQuiz",
    components: {
        Nav,
        MyQuizBox,
    },
    data() {
        return {
            userId: null,
            quizes: {},
        };
    },
    methods: {
        deleteQuiz(id) {
            // this.quizes.splice(id, 1);
            this.$delete(this.quizes, id);
        },
    },
    created() {
        bus.$on("user", (data) => {
            this.userId = data.userId;
            if (this.userId) {
                Axios.post(process.env.VUE_APP_URL + "/my_quiz", {
                    createdBy: this.userId,
                })
                    .then((res) => {
                        if (!res.data.length) {
                            console.log("Some error here !");
                        } else {
                            this.quizes = res.data;
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        });
        bus.$on("logout", (data) => {
            this.$router.push({ name: "Index" });
        });
    },
};
</script>
<style lang="scss">
.myQuiz_holder {
    height: calc(100vh - 60px); // This 60px come from the header
    margin: 0 auto;
    display: grid;
    justify-content: center;
    overflow: auto;

    .create_quiz_btn {
        position: sticky;
        top: 10px;
        width: 200px;
        background: #aa076b;
        color: #fff;
        border-radius: 25px;
        height: 30px;
        display: grid;
        align-content: center;
        justify-content: center;
        justify-self: center;
        border: none;
        cursor: pointer;
    }

    & > * {
        margin-top: 10px;
    }
}
</style>
