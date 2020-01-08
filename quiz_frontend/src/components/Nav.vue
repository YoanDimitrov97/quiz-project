<template>
    <div class="header">
        <ul class="nav">
            <li><a href="#">Play</a></li>
            <li><a href="#">Quizes</a></li>
            <li><a href="#">Plans</a></li>
        </ul>
        <ul class="nav_login">
            <div v-if="isLogged == true" class="login_section">
                <li><a href="">Login</a></li>
                <li><a href="">Register</a></li>
            </div>
            <div v-else class="profile_section">
                <p>Welcome, pesho!</p>
            </div>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    props: {
        isLogged: Boolean
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

                li {
                    a {
                        color:$nav_color;
                        font-weight:700;
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