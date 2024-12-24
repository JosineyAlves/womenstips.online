$(document).ready(function () {
    $("#step1 input").click(function () {
        setTimeout(function () {
            $('#surveyContainer').removeClass('surveyContainerOne');
            $('#surveyContainer').addClass('surveyContainerTwo');
            $("#step1").hide();
            $("#step2").fadeIn();
        }, 500);
    });

    $("#step2 input").click(function () {
        setTimeout(function () {
            $('#surveyContainer').removeClass('surveyContainerTwo');
            $('#surveyContainer').addClass('surveyContainerThree');
            $("#step2").hide();
            $("#step3").fadeIn();
        }, 500);
    });

    $("#step3 input").click(function () {
        setTimeout(function () {
            $("#step3").hide();
            $("#thanks").fadeIn();
            $("#nextStep").fadeIn();
        }, 500);
    });
});