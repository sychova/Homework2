var userModule = (function() {
    var initEvents = function() {
        // User registration
        $("#register").on("click", function() {
            $("#modal-title").text("New User");
            $("#addUser").show();
            $("#updateUser").hide();
        });
        $("#usersCenter").on("click", function(req, res) {
            window.location.replace("/usersCenter");
        });

        // Users sorting
        var sorter = {
            sorting: "user_id",
            order: "ASC"
        };
        var sortingRow = $("th").slice(0, 6);
        var sortUsers = function(e) {
            $("#page-current").text("1");
            sorter.sorting = $(e.target).attr("data-dbName");
            sorter.order = $(e.target).attr("data-sortingOrder");
            $.get(`/users?page=1&size=5&sorting=${sorter.sorting}&order=${sorter.order}`, function(data) {
                if ($(e.target).attr("data-sortingOrder") === "ASC") {
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
            if (data.length === 0) {
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
            $.ajax({
                type: 'PATCH',
                url: `/users/${$(this).attr("data-userid")}`,
                data,
                success: function() {
                    getUsers();
                    modalReset();
                }
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
                <td>${data[i].first_name}</td>
                <td>${data[i].last_name}</td>
                <td>${data[i].age}</td>
                <td>${data[i].phone}</td>
                <td>${data[i].email}</td>
                <td>${data[i].gender}</td>
                <td>
                    <button class="editUser btn btn-primary" type="button" data-toggle="modal" data-target="#usersModal" data-userid="${data[i].user_id}">Edit</button>
                    <button class="deleteUser btn btn-danger" data-userid="${data[i].user_id}">Delete</button>
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
