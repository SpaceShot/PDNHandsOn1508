$(function () {
    var math = $.connection.mathHub;

    math.client.hello = function () {
        alert("I was called from the server hub!");
    };

    $.connection.hub.start()
        .done(function () {
            $("#callHello").click(function () {
                math.server.hello();
            });
        });
});
