<template>
    <form v-on:submit.prevent="onSubmit" id="quiz-register" method="post">
        <div class="register-wrap"></div>
        <input v-model="email" type="email" name="email" id="register-email" placeholder="Email">
        <input v-model="username" type="text" name="username" id="register-username" placeholder="Username">
        <input v-model="firstname" type="text" name="firstname" id="register-firstname" placeholder="First Name">
        <input v-model="lastname" type="text" name="lastname" id="register-lastname" placeholder="Last Name">
        <input v-model="password" type="password" name="password" id="register-password" placeholder="Password">
        <button class="register-btn" type="submit">Sign Up</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Register',
    data() {
        return {
            errors: [],
            email: null,
            username: null,
            firstname: null,
            lastname: null,
            password: null,
        }
    },
    methods: {
        async onSubmit() {
            const userData = this;
            await axios.post(process.env.VUE_APP_URL + '/register', {
                email: userData.email,
                username: userData.username,
                firstname: userData.firstname,
                lastname: userData.lastname,
                password: userData.password
            }).then(res => { // This will sign in the newly registered person !
                if(res.status == 200){
                    axios.post(process.env.VUE_APP_URL + '/login', {
                        email: userData.email,
                        password: userData.password
                    }).then(res => {
                        if(res.data.userId){
                            this.$emit('hideLogin', res.data);
                        }
                    }).catch(err => { console.log(err) });
                    this.$router.go(); // This will force to refresh current page.
                } else {
                    console.log("Unable to login with new user !");
                }
            }).catch(err => { console.log(err) });
        }
    }
}
</script>

<style lang="scss">
#quiz-register {
    display: grid;
    float: right;
    position: relative;
    width: 240px;
    height: 300px;
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
    .register-btn {
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
    .register-wrap {
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