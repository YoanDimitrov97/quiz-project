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
        z-index:2;
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
        z-index: 1;
    }  
}

</style>