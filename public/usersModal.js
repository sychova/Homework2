var UsersModal = function() {
    this.reset = function() {
        document.getElementById("userForm").reset();
        document.querySelector(".validationWarning").innerHTML = "";
    }
    this.validate = function() {
        form = document.getElementById("userForm");
        if (form.checkValidity()) {
            return true;
        } else {
            document.querySelector(".validationWarning").innerHTML = "Your form is not valid. Please revise your data.";
        }
    }
    this.read = function(userID) {
        var objectUser = {};
        objectUser.Id = userID;
        objectUser.FirstName = document.getElementById("FirstNameI").value;
        objectUser.LastName = document.getElementById("LastNameI").value;
        objectUser.Age = document.getElementById("AgeI").value;
        objectUser.Phone = document.getElementById("PhoneI").value;
        objectUser.Email = document.getElementById("EmailI").value;
        objectUser.Gender = document.getElementById("GenderI").value;
        return objectUser;
    }
}