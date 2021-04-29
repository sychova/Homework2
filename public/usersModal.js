var UsersModal = function() {
    // this.close = function() {
    //     setTimeout(function() { document.querySelector(".popup").style.display = "none"; }, 500);
    //     document.querySelector(".popup").style.animation = "popupOUT 500ms";
    //     setTimeout(function() { usersModal.classList.remove("popup"); }, 500);
    //     usersModal.innerHTML = "";
    // }
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