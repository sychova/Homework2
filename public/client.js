$(document).ready(function() {
    var initEvents = function() {
        $("#newUser").click(function() {
            // usersServiceClient.reset();
            $("#modal-title").text("New User");
            $("#addUser").show();
            $("#updateUser").hide();
        });
        $("#Search").keyup(function() {
            $("#page-current").text("1");
            var page_current = parseInt($("#page-current").text());
            $.get(`/users?filter=${$("#Search").val()}&page=${page_current}&size=5`, function(data) {
                $("#users").html(usersServiceClient.build(data));
                initTableEvents();
            });
        });
        $("#page-previous").click(function() {
            console.log("Previous");
            var page_current = parseInt($("#page-current").text());
            if ((page_current - 1) > 0) {
                $.get(`/users?filter=${$("#Search").val()}&page=${page_current - 1}&size=5`, function(data) {
                    if (data.length > 0) {
                        $("#users").html(usersServiceClient.build(data));
                        initTableEvents();
                        $("#page-current").text(`${page_current - 1}`);
                    }
                });
            }
        })
        $("#page-next").click(function() {
            console.log("Next");
            var page_current = parseInt($("#page-current").text());
            $.get(`/users?filter=${$("#Search").val()}&page=${page_current + 1}&size=5`, function(data) {
                if (data.length > 0) {
                    $("#users").html(usersServiceClient.build(data));
                    initTableEvents();
                    $("#page-current").text(`${page_current + 1}`);
                }
            });
        })
    }
    var getUsers = function(page_current) {
        $.get(`/users?filter=${$("#Search").val()}&page=${page_current}&size=5`, function(data) {
            console.log(data);
            if (data.length == 0) {
                if ((page_current - 1) > 0) {
                    $("#page-current").text(page_current - 1);
                    getUsers(page_current - 1);
                }
            }
            $("#users").html(usersServiceClient.build(data));
            initTableEvents();
        });
    }
    var initTableEvents = function() {
        var userDelete = $(".deleteUser");
        for (var i = 0; i < userDelete.length; i++) {
            $(userDelete[i]).click(function() {
                $.ajax({
                    url: `/users/${$(this).attr("data-userid")}`,
                    type: 'DELETE',
                    success: function() {
                        getUsers(parseInt($("#page-current").text()));
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
                getUsers(parseInt($("#page-current").text()));
                usersServiceClient.reset();
            });
        });

        $("#updateUser").click(function() {
            var userID = $(this).attr("data-userid");
            var objectUser = usersServiceClient.read(userID);
            var data = JSON.stringify(objectUser);
            $.post(`/users/${$(this).attr("data-userid")}`, data, function() {
                getUsers(parseInt($("#page-current").text()));
                usersServiceClient.reset();
            });
        });
        var formReset = $(".close, .modal-close");
        for (var i = 0; i <= formReset.length; i++) {
            console.log(formReset.length);
            console.log(formReset[i]);
            $(formReset[i]).click(function() {
                usersServiceClient.reset();
            });
        };
    }
    getUsers(parseInt($("#page-current").text()));
    initEvents();
    initTableEvents();
    initModalEvents();
    var usersServiceClient = new UsersServiceClient();
    usersServiceClient;
});