<template>
    <div class="box">
        <h1>Enter CODE</h1>
        <input type="text" maxlength="6" placeholder="Enter CODE">
        <div><p>Play Quiz</p></div>
    </div>
</template>
<script>
export default {
    name:"EnterCode",
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
    }
}
</style>