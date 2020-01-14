<template>
    <div>
        <div class="header">
            <ul class="nav">
                <li><a href="#">Play</a></li>
                <li><a href="#">Quizes</a></li>
                <li><a href="#">Plans</a></li>
            </ul>
            <ul class="nav_login" v-show="showLogin">
                <div v-if="!isLoggedIn" class="login_section">
                    <li><a v-on:click.prevent="signIn" href="">Login</a></li>
                    <li><a href="">Sign Up</a></li>
                </div>
                <div v-else class="profile_section">
                    <p>Welcome, {{ userName }}</p>
                </div>
            </ul>
        </div>
        <Login v-if="isClicked" @hideLogin="hideLogin" v-bind:isClicked="isClicked" />
        <ProfileNav @logout="logout"/>
    </div>
</template>

<script>
import axios from 'axios';
import Login from './Index/Login.vue';
import ProfileNav from './Index/ProfileNav.vue';

export default {
    name: 'Nav',
    components: {
        Login,
        ProfileNav
    },
    data () {
        return {
            showLogin: false,
            isClicked: false,
            isLoggedIn: false,
            userName: null,
        }
    },
    beforeCreate() {
        axios.get(process.env.VUE_APP_URL)
            .then(res => {
                this.showLogin = true;
                this.isLoggedIn = res.data.isLoggedIn;
                this.userName = res.data.userName;
            }).catch(err => { console.log(err) });
    },
    methods: {
        signIn() {
            if(this.isClicked == false){
                this.isClicked = true;
            }else {
                this.isClicked = false;
            }
            
        },
        hideLogin(value) {
            this.isClicked = false;
            this.isLoggedIn = true;
            this.userName = value.username;
        },
        logout(value) {
            this.isLoggedIn = value;
        }
    }
}
</script>

<style lang="scss">
    $nav_color:#E8D0DF;
    $login_size:240px;//size of the Login/Register section
    .header {
        background: transparent linear-gradient(90deg, #AA076B 0%, #61045F 100%) 0% 0% no-repeat padding-box;
        box-shadow: 0px 0px 10px #000000;
        height:60px;
        display:grid;
        grid-template-columns:calc(100% - #{$login_size}) $login_size;

        .nav {
            display:grid;
            grid-template-columns:repeat(3, 160px);
            justify-content:center;
            align-content:center;
            height:100%;
            margin-left:$login_size;//this is the size of the Login/Register on the right of the nav

            li {
                text-align:center;
                a {
                    color:$nav_color;
                    font-weight:700;
                }
            }
        }

        .nav_login {
            height:100%;

            .login_section {
                height:100%;
                display:grid;
                grid-template-columns:50% 50%;
                align-content:center;
                justify-content:center;

                li:first-child {
                    justify-self: center;
                }
                li:nth-child(2){
                    a {
                        background: #0879f2;
                        padding: 7px 15px;
                        border-radius: 5px;
                    }
                }
                li {
                    a {
                        color:$nav_color;
                    }
                }
            }
            
           .profile_section {
               color:$nav_color;
               height:100%;
               display:grid;
               align-content:center;
               justify-content:center;
               font-size:14px;
           } 
        }
    }
</style>