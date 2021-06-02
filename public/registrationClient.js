$(document).ready(function() {
    var initEvents = function() {
        $("#register").on("click", function() {
            // usersServiceClient.reset();
            $("#modal-title").text("New User");
            $("#addUser").show();
            $("#updateUser").hide();
        });
        $("#usersCenter").on("click", function(req, res) {
            window.location.replace("/usersCenter");
        });
    }

    var initModalEvents = function() {
        $("#formReset").on("click", function() {
            usersServiceClient1.reset();
        });
        var formReset = $(".close, .modal-close");
        for (var i = 0; i <= formReset.length; i++) {
            $(formReset[i]).on("click", function() {
                usersServiceClient1.reset();
            });
        };

        $("#addUser").on("click", function() {
            var objectUser = usersServiceClient1.read();
            var data = JSON.stringify(objectUser);
            $.post("/users", data, function() {
                usersServiceClient1.reset();
            });
        });
    }
    initEvents();
    initModalEvents();
    var usersServiceClient1 = new UsersServiceClient();
    usersServiceClient1;
});