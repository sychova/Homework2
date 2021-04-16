var UsersModal = function() {
    // this.open = function(onModalOpen, title, modalMode) {
    //     var usersModal = document.getElementById("usersModal");
    //     usersModal.classList.add("modal");
    //     usersModal.tabIndex = -1;
    //     usersModal.setAttribute("role", "dialog");
    //     usersModal.innerHTML = `
    //     .modal-dialog(role='document')
    //     .modal-content
    //       .modal-header
    //         h5.modal-title Modal title
    //         button.close(type='button' data-dismiss='modal' aria-label='Close')
    //           span(aria-hidden='true') &times;
    //       .modal-body
    //         p Modal body text goes here.
    //       .modal-footer
    //         button.btn.btn-primary(type='button') Save changes
    //         button.btn.btn-secondary(type='button' data-dismiss='modal') Close`
    //     if (onModalOpen) {
    //         onModalOpen();
    //     }
    //     if (modalMode) {
    //         modalMode();
    //     }
    //     document.querySelector(".popup").style.display = "flex";
    //     document.querySelector(".popup").style.animation = "popupIN 500ms";
    // }
    this.close = function() {
        setTimeout(function() { document.querySelector(".popup").style.display = "none"; }, 500);
        document.querySelector(".popup").style.animation = "popupOUT 500ms";
        setTimeout(function() { usersModal.classList.remove("popup"); }, 500);
        usersModal.innerHTML = "";
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