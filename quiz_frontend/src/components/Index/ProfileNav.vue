<template>
    <ul id="profile-nav">
        <div class="profile-wrap"></div>
        <li><a href="#">Account Settings</a></li>
        <li><a href="#">Create Quiz</a></li>
        <li><a href="#">Game History</a></li>
        <li><a v-on:click.prevent="logout" href="#">Logout</a></li>
    </ul>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ProfileNav',
    methods: {
        logout() {
            axios.get(process.env.VUE_APP_URL + '/logout')
                .then(res => {
                    if (res.data == true){
                        this.$emit('logout', false);
                    }
                    console.log(res.data);
                }).catch(err => { console.log(err)});
        }
    }
}
</script>

<style lang="scss">
#profile-nav {
    display: grid;
    float: right;
    position: relative;
    width: 240px;
    height: 150px;
    opacity: 1;
    z-index: 2;
    margin-right: 20px;
    li {
        display: grid;
    }
    li a {
        color: #fff;
        justify-self: center;
        align-self: center;
        cursor: pointer;
        z-index: 2;
    }
    .profile-wrap {
        background-color: #1c011b;
        backdrop-filter: blur(6px);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        opacity: 0.5;
        position: absolute;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 1;
    }  
}

</style>