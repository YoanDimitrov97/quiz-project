<template>
    <div class="star" :class={star_full:starOn} v-bind:starId=starId>
        <div class="first_half"></div>
        <div class="last_half"></div>
    </div>
</template>
<script>
import {bus} from "../../main.js"
export default {
    name:"Star",
    props: ['starId', 'starOn'],
}
</script>
<style lang="scss">
.star {
    width:40px;
    height:40px;
    cursor:pointer;
    margin:0 10px;
    background-size:cover;
    background-image: url("../../assets/empty_star.png");

    div {
        width:50%;
        height:100%;
    }
}
.star_full {
    background-image: url("../../assets/full_star.png") !important;
}
</style>