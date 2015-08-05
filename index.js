
function enableQuiz()
{
    $("#join").fadeOut(900, null).off("click");
    $("#instructions").fadeOut(900, null).off("click");
    $("#operand1").attr("disabled", false);
    $("#operand2").attr("disabled", false);
    $("#answer").attr("disabled", false);
    $("#solve").attr("disabled", false);
}
