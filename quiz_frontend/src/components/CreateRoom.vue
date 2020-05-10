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
import Vue from 'vue'
import Nav from "./Nav.vue"
import Axios from "axios"
import {bus} from "../main.js"
import io from "socket.io-client"
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
            user:null,
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
        },
        removeUserFromRoom: function() {
            Axios.post("http://127.0.0.1:5000/remove_from_room", {
                code:this.code,
                id:this.user.userId,
                name:this.user.userName
            })
            .then(res => {
                this.code = res.data.code;
                this.data = res.data;
            })
            .catch(function (error) { console.log(error); });
        }
    },
    created() {
        bus.$on("user", (data) => {
            this.user = data;
        })
    },
    mounted() {
        const socket = io();
        socket.emit("test", "Testing...");
        this.getRoomInfo();
    },
    // beforeUpdate(){
    //     console.log("UPDATING...");
    //     this.getRoomInfo();
    // },
    beforeDestroy() {
        this.removeUserFromRoom();
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