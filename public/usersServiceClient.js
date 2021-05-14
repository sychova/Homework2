var UsersServiceClient = function() {
    this.reset = function() {
        $("#userForm").trigger("reset");
        $(".validationWarning").text = "";
    }
    this.validate = function() {
        //form = $("#userForm");
        if ($("#userForm").isValid()) {
            return true;
        } else {
            $(".validationWarning").text("Your form is not valid. Please revise your data.");
        }
    }
    this.read = function(userID) {
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
    this.build = function(data) {
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
}