var UsersModal = function() {
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
}