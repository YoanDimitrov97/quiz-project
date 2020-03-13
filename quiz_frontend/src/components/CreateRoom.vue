<template>
    <div>
        <Nav />
        <div class="room_wrapper">
            <div class="room_header">
                <div class="room_counter">Users in Room: {{data.usersInRoom.length}}</div>
                <div class="room_start"><p>Start Quiz</p></div>
                <div class="room_code">Room Code {{code}}</div>
            </div>
            <div class="room_body">
                <div v-bind:key="user" v-for="user in data.usersInRoom"><p>{{data.user}}</p></div>
            </div>
        </div>
    </div>
</template>
<script>
import Nav from "./Nav.vue"
import Axios from "axios"
import {bus} from "../main.js"
export default {
    name:"CreateRoom",
    components: {
        Nav
    },
    data() {
        return {
            data:null,
            roomId: this.$route.params.id,
            code: null,
        }
    },
    methods: {
        getRoomInfo: function() {
            Axios.post("http://127.0.0.1:5000/get_room", {
                id: this.roomId,
            })
            .then(res => {
                this.code = res.data.code;
                this.data = res.data;
            })
            .catch(function (error) { console.log(error); });
        }
    },
    mounted() {
        this.getRoomInfo();
    }
}
</script>
<style lang="scss">
@function random_element($elements){
    @return nth($elements, random(length($elements)))
}
$qColor: random_element(#FFB45D #4ddb73 #49d4de #8091ff #ff7575);
.room_wrapper {
    display:grid;
    grid-template-rows:10% 90%;
    height:calc(100vh - 60px);
    background:$qColor;
    .room_header {
        display:flex;
        flex-direction: row;
        justify-content:space-around;
        align-items:center;

        & > * {
            color:#fff;
        }
    }
}
</style>