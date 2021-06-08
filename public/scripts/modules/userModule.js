var userModule = (function() {
    var initEvents = function() {
        // Users sorting
        var sorter = {
            sorting: "UserID",
            order: "ASC"
        };
        var sortingRow = $("th").slice(0, 6);
        var sortUsers = function(e) {
            $("#page-current").text("1");
            sorter.sorting = $(e.target).attr("data-dbName");
            sorter.order = $(e.target).attr("data-sortingOrder");
            $.get(`/users?page=1&size=5&sorting=${sorter.sorting}&order=${sorter.order}`, function(data) {
                if ($(e.target).attr("data-sortingOrder") == "ASC") {
                    $(e.target).attr("data-sortingOrder", "DESC");
                } else {
                    $(e.target).attr("data-sortingOrder", "ASC");
                }
                $("#users").html(tableBuilder(data));
                initTableEvents();
            });
        }
        sortingRow.on("click", function(e) {
            sortUsers(e);
        });

        // Search
        $("#Search").on("keyup", function() {
            $("#page-current").text("1");
            var page_current = parseInt($("#page-current").text());
            $.get(`/users?filter=${$("#Search").val()}&page=${page_current}&size=5&sorting=${sorter.sorting}&order=${sorter.order}`, function(data) {
                $("#users").html(tableBuilder(data));
                initTableEvents();
            });
        });

        // Pagination
        $("#page-previous").on("click", function() {
            console.log("Previous");
            var page_current = parseInt($("#page-current").text());
            if ((page_current - 1) > 0) {
                $.get(`/users?filter=${$("#Search").val()}&page=${page_current - 1}&size=5&sorting=${sorter.sorting}&order=${sorter.order}`, function(data) {
                    if (data.length > 0) {
                        $("#users").html(tableBuilder(data));
                        initTableEvents();
                        $("#page-current").text(`${page_current - 1}`);
                    }
                });
            }
        });
        $("#page-next").on("click", function() {
            console.log("Next");
            var page_current = parseInt($("#page-current").text());
            $.get(`/users?filter=${$("#Search").val()}&page=${page_current + 1}&size=5&sorting=${sorter.sorting}&order=${sorter.order}`, function(data) {
                if (data.length > 0) {
                    $("#users").html(tableBuilder(data));
                    initTableEvents();
                    $("#page-current").text(`${page_current + 1}`);
                }
            });
        });
    }

    // Users getter
    var getUsers = function() {
        var page_current = parseInt($("#page-current").text());
        $.get(`/users?filter=${$("#Search").val()}&page=${page_current}&size=5`, function(data) {
            if (data.length == 0) {
                if ((page_current - 1) > 0) {
                    $("#page-current").text(page_current - 1);
                    getUsers(page_current - 1);
                }
            }
            $("#users").html(tableBuilder(data));
            initTableEvents();
        });
    }
    var initTableEvents = function() {
        var userDelete = $(".deleteUser");
        for (var i = 0; i < userDelete.length; i++) {
            $(userDelete[i]).on("click", function() {
                $.ajax({
                    url: `/users/${$(this).attr("data-userid")}`,
                    type: 'DELETE',
                    success: function() {
                        getUsers();
                    }
                });
            });
        };
        var userEdit = $(".editUser");
        for (var i = 0; i < userEdit.length; i++) {
            $(userEdit[i]).on("click", function() {
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
        $("#formReset").on("click", function() {
            modalReset();
        });
        var formReset = $(".close, .modal-close");
        for (var i = 0; i <= formReset.length; i++) {
            $(formReset[i]).on("click", function() {
                modalReset();
            });
        };

        $("#addUser").on("click", function() {
            var objectUser = modalRead();
            var data = JSON.stringify(objectUser);
            $.post("/users", data, function() {
                getUsers();
                modalReset();
            });
        });

        $("#updateUser").on("click", function() {
            var userID = $(this).attr("data-userid");
            var objectUser = modalRead(userID);

            var data = JSON.stringify(objectUser);
            $.post(`/users/${$(this).attr("data-userid")}`, data, function() {
                getUsers();
                modalReset();
            });
        });
    }

    var modalReset = function() {
        $("#userForm").trigger("reset");
        $(".validationWarning").text = "";
    }

    var modalValidate = function() {
        //form = $("#userForm");
        if ($("#userForm").isValid()) {
            return true;
        } else {
            $(".validationWarning").text("Your form is not valid. Please revise your data.");
        }
    }

    var modalRead = function(userID) {
        var objectUser = {};
        objectUser.Id = userID;
        objectUser.FirstName = $("#FirstNameI").val();
        objectUser.LastName = $("#LastNameI").val();
        objectUser.Age = $("#AgeI").val();
        objectUser.Phone = $("#PhoneI").val();
        objectUser.Email = $("#EmailI").val();
        objectUser.Gender = $("#GenderI").val();
        return objectUser;
    }

    var tableBuilder = function(data) {
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
        return usersRows;
    }
    var init = function() {
        initEvents();
        getUsers();
        initModalEvents();
    }
    return {
        init: init,
        moduleName: "userModule",
    };
})();