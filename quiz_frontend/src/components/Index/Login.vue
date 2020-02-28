<template>
    <form v-on:submit.prevent="onSubmit" id="quiz-login" method="post" class="form-login" v-bind:class="{ animationOn: isClicked }">
        <div class="login-wrap"></div>
        <input v-model="email" type="text" name="email" id="login-email" placeholder="Email">
        <input v-model="password" type="password" name="password" id="login-password" placeholder="Password">
        <button class="login-btn" type="submit">Sign In</button>
    </form>

</template>

<script>
import axios from 'axios';
import {bus} from "../../main.js"
export default {
    name: 'Login',
    props: ['isClicked'],
    data() {
        return {
            errors: [],
            email: null,
            password: null,
        }
    },
    methods: {
        onSubmit() {
            console.log(`${this.email} ${this.password}`)
            if(this.email.length > 0 && this.password.length > 0){
                axios.post(process.env.VUE_APP_URL + '/login', {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    console.log(res);
                    if(res.data.userId){
                        this.$emit('hideLogin', res.data);
                        //this emits userId after login for other components to use like CreateRoom
                        bus.$emit("user", res.data);
                    }
                }).catch(err => { console.log(err) });
            } else {
                this.errors = "Wrong password or email.";
                console.log(this.errors);
            }
        }
    }
}
</script>

<style lang="scss">

#quiz-login {
    display: grid;
    float: right;
    position: relative;
    width: 240px;
    height: 150px;
    opacity: 1;
    transform: translateY(0);
    padding: 10px 0 10px 0;
    z-index:2;
    input {
        justify-self: center;
        align-self: center;
        background: #00000040 0% 0% no-repeat padding-box;
        width: 200px;
        height: 30px;
        border: none;
        text-indent: 15px;
        border-radius: 5px;
        z-index: 2;
        color: #E8D0DF;
        cursor: pointer;
    }
    .login-btn {
        justify-self: center;
        align-self: center;
        border-radius: 5px;
        border: none;
        z-index: 2;
        height: 30px;
        width: 200px;
        color: #FFF;
        text-align: center;
        background: #0879F2;
    }
    .login-wrap {
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        opacity: 0.1;
        position: absolute;
        top: 0px;
        width: 100%;
        height: 100%;
    }
}



</style>