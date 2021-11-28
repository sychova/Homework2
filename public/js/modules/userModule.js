var userModule = (() => {
    var initEvents = () => {
        // User registration
        $("#register").on("click", () => {
            $("#modal-title").text("New User")
            $("#addUser").show()
            $("#updateUser").hide()
        })

        // Users sorting
        var sorter = {
            sorting: "user_id",
            order: "ASC"
        }
        var sortingRow = $("th").slice(0, 6)
        var sortUsers = async (event) => {
            $("#page-current").text("1")
            sorter.sorting = $(event.target).attr("data-dbName")
            sorter.order = $(event.target).attr("data-sortingOrder")
            const response = await fetch(`/users?page=1&size=5&sorting=${sorter.sorting}&order=${sorter.order}`)
            const users = await response.json()
            if ($(event.target).attr("data-sortingOrder") === "ASC") {
                $(event.target).attr("data-sortingOrder", "DESC")
            } else {
                $(event.target).attr("data-sortingOrder", "ASC")
            }
            $("#users").html(tableBuilder(users))
            initTableEvents()
        }
        sortingRow.on("click", (e) => {
            sortUsers(e)
        })

        // Search
        $("#Search").on("keyup", async () => {
            $("#page-current").text("1")
            var page_current = parseInt($("#page-current").text())
            const response = await fetch(`/users?filter=${$("#Search").val()}&page=${page_current}&size=5&sorting=${sorter.sorting}&order=${sorter.order}`)
            const users = await response.json()
            $("#users").html(tableBuilder(users))
            initTableEvents()
        })

        // Pagination
        $("#page-previous").on("click", async () => {
            var page_current = parseInt($("#page-current").text())
            if ((page_current - 1) > 0) {
                const response = await fetch(`/users?filter=${$("#Search").val()}&page=${page_current - 1}&size=5&sorting=${sorter.sorting}&order=${sorter.order}`)
                const users = await response.json()
                    if (users.length > 0) {
                        $("#users").html(tableBuilder(users))
                        initTableEvents()
                        $("#page-current").text(`${page_current - 1}`)
                    }
            }
        })
        $("#page-next").on("click", async () => {
            var page_current = parseInt($("#page-current").text())
            const response = await fetch(`/users?filter=${$("#Search").val()}&page=${page_current + 1}&size=5&sorting=${sorter.sorting}&order=${sorter.order}`)
            const users = await response.json()
            if (users.length > 0) {
                $("#users").html(tableBuilder(users))
                initTableEvents()
                $("#page-current").text(`${page_current + 1}`)
            }
        })
    }

    // Users getter
    var getUsers = async () => {
        var page_current = parseInt($("#page-current").text())
        const response = await fetch(`/users?filter=${$("#Search").val()}&page=${page_current}&size=5`)
        const users = await response.json()
        if (users.length === 0) {
            if ((page_current - 1) > 0) {
                $("#page-current").text(page_current - 1)
                getUsers(page_current - 1)
            }
        }
        $("#users").html(tableBuilder(users))
        initTableEvents()
    }
    
    var initTableEvents = () => {
        var userDelete = $(".deleteUser")
        for (var i = 0; i < userDelete.length; i++) {
            $(userDelete[i]).on("click", async function () {
                await fetch(`/users/${$(this).attr("data-userid")}`, {
                    method: 'DELETE'
                })
                getUsers()
            })
        }
        var userEdit = $(".editUser")
        for (var i = 0; i < userEdit.length; i++) {
            $(userEdit[i]).on("click", async function () {
                var userID = $(this).attr("data-userid")
                $("#modal-title").text("Edit User")
                $("#addUser").hide()
                $("#updateUser").show()
                $("#updateUser").attr("data-userid", userID)
                const response = await fetch(`/users/${$(this).attr("data-userid")}`)
                const user = await response.json()
                $("#FirstNameI").val(user.first_name)
                $("#LastNameI").val(user.last_name)
                $("#AgeI").val(user.age)
                $("#PhoneI").val(user.phone)
                $("#EmailI").val(user.email)
                $("#GenderI").val(user.gender)
            })
        }
    }
    var initModalEvents = () => {
        $("#formReset").on("click", () => {
            modalReset()
        })
        var formReset = $(".close, .modal-close")
        for (var i = 0; i <= formReset.length; i++) {
            $(formReset[i]).on("click", () => {
                modalReset()
            })
        }

        $("#addUser").on("click", async() => {
            var objectUser = modalRead()
            await fetch('/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(objectUser)
            })
            getUsers()
            modalReset()
        })

        $("#updateUser").on("click", async function () {
            var userID = $(this).attr("data-userid")
            var objectUser = modalRead(userID)
            await fetch(`/users/${$(this).attr("data-userid")}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(objectUser)
            })
            getUsers()
            modalReset()
        })
    }

    var modalReset = () => {
        $("#userForm").trigger("reset")
    }

    var modalRead = (userID) => {
        var objectUser = {}
        objectUser.Id = userID
        objectUser.FirstName = $("#FirstNameI").val()
        objectUser.LastName = $("#LastNameI").val()
        objectUser.Age = $("#AgeI").val()
        objectUser.Phone = $("#PhoneI").val()
        objectUser.Email = $("#EmailI").val()
        objectUser.Gender = $("#GenderI").val()
        return objectUser
    }

    var tableBuilder = (data) => {
        var usersRows = ""
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
        return usersRows
    }
    var init = () => {
        initEvents()
        getUsers()
        initModalEvents()
    }
    return {
        init: init,
        moduleName: "userModule",
    }
})()
