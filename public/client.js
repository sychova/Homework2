$(document).ready(function() {
    var initEvents = function() {
        $("#newUser").click(function() {
            $("#modal-title").text("New User");
            $("#addUser").show();
            $("#updateUser").hide();
        });
        $("#Search").keyup(function() {
            $.get(`/users?FirstName=${$("#Search").val()}`, function(data) {
                $("#users").html(usersServiceClient.build(data));
                initTableEvents();
            });
        });
        $("#searchArea").on("shown.bs.collapse", function() {
            $("#Search").val("");
            getUsers();
        });
    }
    var getUsers = function() {
        $.get("/users", function(data) {
            $("#users").html(usersServiceClient.build(data));
            initTableEvents();
        });
    }
    var initTableEvents = function() {
        var userDelete = $(".deleteUser");
        for (var i = 0; i < userDelete.length; i++) {
            $(userDelete[i]).click(function() {
                $.ajax({
                    url: "/users/" + $(this).attr("data-userid"),
                    type: 'DELETE',
                    success: function() {
                        getUsers();
                    }
                });
            });
        };
        var userEdit = $(".editUser");
        for (var i = 0; i < userEdit.length; i++) {
            $(userEdit[i]).click(function() {
                var userID = $(this).attr("data-userid");
                $("#modal-title").text("Edit User");
                $("#addUser").hide();
                $("#updateUser").show();
                $("#updateUser").attr("data-userid", userID);
                $.get(`/users/${$(this).attr("data-userid")}`, function(data) {
                    $("#FirstNameI").val(data.FirstName);
                    $("#LastNameI").val(data.LastName);
                    $("#AgeI").val(data.Age);
                    $("#PhoneI").val(data.Phone);
                    $("#EmailI").val(data.Email);
                    $("#GenderI").val(data.Gender);
                });
            });
        }
    }
    var initModalEvents = function() {
        $("#formReset").click(function() {
            usersServiceClient.reset();
        });
        $("#addUser").click(function() {
            var objectUser = usersServiceClient.read();
            var data = JSON.stringify(objectUser);
            $.post("/users", data, function() {
                getUsers();
                usersServiceClient.reset();
            });
        });

        $("#updateUser").click(function() {
            var userID = $(this).attr("data-userid");
            var objectUser = usersServiceClient.read(userID);
            var data = JSON.stringify(objectUser);
            $.post(`/users/${$(this).attr("data-userid")}`, data, function() {
                getUsers();
                usersServiceClient.reset();
            });
        });
        var formReset = $(".close");
        for (var i = 0; i < formReset.length; i++) {
            $(formReset[i]).click(function() {
                usersServiceClient.reset();
            });
        };
    }
    initEvents();
    initTableEvents();
    initModalEvents();
    var usersServiceClient = new UsersServiceClient();
    usersServiceClient;
});