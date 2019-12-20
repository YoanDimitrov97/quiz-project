$(document).ready(() => {
    $(".add_question").click(() => {
        $(".quiz_question").eq(0).clone().appendTo(".questions");
    })
});