/// <reference path="jquery-1.10.2.min.js" />
/// <reference path="jquery.signalR-2.1.2.min.js" />

function enableQuiz()
{
    $("#join").fadeOut(900, null).off("click");
    $("#instructions").fadeOut(900, null).off("click");
    $("#operand1").attr("disabled", false);
    $("#operand2").attr("disabled", false);
    $("#answer").attr("disabled", false);
    $("#solve").attr("disabled", false);
}

$(function () {
    var math = $.connection.mathHub;

    math.client.hello = function () {
        alert("I was called from the server hub!");
    };

    math.client.correct = function (correctAnswer) {
        if (correctAnswer) {
            $("#correct").text("You were right!");
        }
        else {
            $("#correct").text("You were wrong!");
        }
    }

    math.client.newSolution = function(statement)
    {
        var newItem = $("<li>").append(statement);
        $("#solutions").append(newItem);
    }

    math.client.notifyJoin = function(info)
    {
        var newItem = $('<li>').append("Connection: " + info.Id + " joined at " + info.Time);
        $('#connectionInfo').append(newItem);
    }

    $.connection.hub.start()
        .done(function () {
            $("#callHello").click(function () {
                math.server.hello();
            });

            $("#transportInfo").text("Connected with transport " + $.connection.hub.transport.name);

            $("#join").click(function () {
                math.state.myUserName = $("#name").val();
                enableQuiz();
            });

            $("#solve").click(function () {
                var operand1 = $("#operand1").val();
                var operand2 = $("#operand2").val();
                var answer = $("#answer").val();

                math.server.solve(operand1, operand2, answer);
            });
        });
});