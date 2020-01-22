<template>
    <form v-on:submit.prevent="onSubmit" id="quiz-login" method="post">
        <div class="login-wrap"></div>
        <input v-model="email" type="text" name="email" id="login-email" placeholder="Email">
        <input v-model="password" type="password" name="password" id="login-password" placeholder="Password">
        <button class="login-btn" type="submit">Sign In</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            errors: [],
            email: null,
            password: null,
        }
    },
    methods: {
        onSubmit() {
            if(this.email.length > 0 && this.password.length > 0){
                axios.post(process.env.VUE_APP_URL + '/login', {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    if(res.data.userId){
                        this.$emit('hideLogin', res.data);
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
    margin-right: 20px;
    z-index: 2;
    input::placeholder {
        color: #ccc;
    }
    input {
        color: #fff;
        justify-self: center;
        align-self: center;
        background: #0000008a;
        width: 200px;
        height: 30px;
        border: none;
        text-indent: 15px;
        border-radius: 5px;
        z-index: 2;
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
        color: #E8D0DF;
        text-align: center;
        background: #0879F2;
    }
    .login-wrap {
        background-color: #1c011b;
        backdrop-filter: blur(6px);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        opacity: 0.5;
        position: absolute;
        top: 0px;
        width: 100%;
        height: 100%;
    }
}



</style>