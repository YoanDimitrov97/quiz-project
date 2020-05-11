<template>
    <div class="box">
        <h1>Enter CODE</h1>
        <input type="text" v-model="code" maxlength="6" placeholder="Enter CODE">
        <div v-on:click="enterRoom"><p>Play Quiz</p></div>
    </div>
</template>
<script>
import {bus} from "../../main";
import Axios from "axios"
export default {
    name:"EnterCode",
    data() {
        return {
            code:null,
            user:null,
        }
    },
    methods: {
        enterRoom: function(){
            //check if code corresponds to room, check if room is active, 
            Axios.post("http://127.0.0.1:5000/join_room", {
                code:this.code,
                id: this.user.userId,
                name:this.user.userName
            }).then(res => {
                console.log(res)
                this.$router.push('/room/' + res.data.code);
            })
            console.log(this.code);
        }
    },
    created() {
        bus.$on("user", (data) => {
            this.user = data;
        })
    }
}
</script>
<style lang="scss">
.box {
    width:320px;
    height:200px;
    background:#FFB45D;
    border-radius:5px;
    display:grid;
    justify-content:center;
    align-items:center;
    
    h1 {
        color:#fff;
        text-align:center;
    }
    input {
        border:none;
        border-radius:25px;
        width:200px;
        height:40px;
        text-align:center;
    }
    div {
        display:grid;
        text-align:center;
        border-radius:25px;
        background:#61045F;
        height:40px;
        align-items:center;
        color:#E8D0DF;
        cursor:pointer;
    }
}
</style>