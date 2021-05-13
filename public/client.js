$(document).ready(function() {
    var initEvents = function() {
        $("#newUser").click(function() {
            $("#modal-title").text("New User");
            $("#addUser").show();
            $("#updateUser").hide();
        });
        $("#Search").keyup(function() {
            $.get(`/users?FirstName=${$("#Search").val()}`, function(data) {
                var usersRows = "";
                for (i = 0; i < data.length; i++) {
                    usersRows += `
                <tr>
                    <td>${data[i].FirstName}</td>
                    <td>${data[i].LastName}</td>
                    <td>${data[i].Age}</td>
                    <td>${data[i].Phone}</td>
                    <td>${data[i].Email}</td>
                    <td>${data[i].Gender}</td>
                    <td>
                        <button class="editUser btn btn-primary" type="button" data-toggle="modal" data-target="#usersModal" data-userid="${data[i].UserID}">Edit</button>
                        <button class="deleteUser btn btn-danger" data-userid="${data[i].UserID}">Delete</button>
                    </td>
                </tr>`
                }
                $("#users").html(usersRows);
                initTableEvents();
            });
            // http://localhost/articles?year=2016&month=1&day=19
            // $.get(`/users/${$("#Search").val()}`, function(data) {
            //     $("#users").html(data);
            //     initTableEvents();
            // });
        });
    }
    var getUsers = function() {
        $.get("/users", function(data) {
            var usersRows = "";
            for (i = 0; i < data.length; i++) {
                usersRows += `
                <tr>
                    <td>${data[i].FirstName}</td>
                    <td>${data[i].LastName}</td>
                    <td>${data[i].Age}</td>
                    <td>${data[i].Phone}</td>
                    <td>${data[i].Email}</td>
                    <td>${data[i].Gender}</td>
                    <td>
                        <button class="editUser btn btn-primary" type="button" data-toggle="modal" data-target="#usersModal" data-userid="${data[i].UserID}">Edit</button>
                        <button class="deleteUser btn btn-danger" data-userid="${data[i].UserID}">Delete</button>
                    </td>
                </tr>`
            }
            $("#users").html(usersRows);
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
            userModal.reset();
        });
        $("#addUser").click(function() {
            var objectUser = userModal.read();
            var data = JSON.stringify(objectUser);
            $.post("/users", data, function() {
                getUsers();
                userModal.reset();
            });
        });

        $("#updateUser").click(function() {
            var userID = $(this).attr("data-userid");
            var objectUser = userModal.read(userID);
            var data = JSON.stringify(objectUser);
            $.post(`/users/${$(this).attr("data-userid")}`, data, function() {
                getUsers();
                userModal.reset();
            });
        });

        // var formReset = document.querySelectorAll("[class*='close']");
        var formReset = $(".close");
        for (var i = 0; i < formReset.length; i++) {
            $(formReset[i]).click(function() {
                userModal.reset();
            });
        };
    }
    initEvents();
    initTableEvents();
    initModalEvents();
    var userModal = new UsersModal();
    userModal;
});