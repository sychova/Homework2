(function() {
    var initEvents = function() {
        // document.getElementById("newUser").addEventListener("click", function() {
        //     userModal.open(initModalEvents, "New", function() {
        //         document.getElementById("addUser").hidden = false;
        //         document.getElementById("updateUser").hidden = true;
        //     });
        // });
    }
    var initTableEvents = function() {
        var userEdit = document.getElementsByClassName("editUser");
        for (var i = 0; i < userEdit.length; i++) {
            userEdit[i].addEventListener("click", function() {
                var userID = this.getAttribute("data-userid");
                userModal.open(initModalEvents, "Edit", function() {
                    document.getElementById("addUser").hidden = true;
                    document.getElementById("updateUser").hidden = false;
                    document.getElementById("updateUser").setAttribute("data-userid", userID);
                });
                var objectUser = JSON.parse(localStorage.getItem(userID));
                document.getElementById("FirstNameI").value = objectUser.FirstName;
                document.getElementById("LastNameI").value = objectUser.LastName;
                document.getElementById("AgeI").value = objectUser.Age;
                document.getElementById("PhoneI").value = objectUser.Phone;
                document.getElementById("EmailI").value = objectUser.Email;
                document.getElementById("GenderI").value = objectUser.Gender;
            });
        };
        var userDelete = document.getElementsByClassName("deleteUser");
        for (var i = 0; i < userDelete.length; i++) {
            userDelete[i].addEventListener("click", function() {
                document.getElementById("usersTable").deleteRow(this.parentNode.parentNode.rowIndex);
                localStorage.removeItem(this.getAttribute("data-userid"));
            });
        };
    }
    var initModalEvents = function() {
        document.getElementById("addUser").addEventListener("click", function() {
            if (userModal.validate()) {
                var userKey = Math.floor(Math.random() * 100).toString();
                var isDuplicate = Object.keys(localStorage).includes(userKey);
                if (isDuplicate) {
                    return generateUserId(Object.keys(localStorage));
                } else {
                    var userData = userModal.read(userKey);
                    localStorage.setItem(userKey, JSON.stringify(userData));
                    usersTable.createTable(initTableEvents);
                    userModal.close();
                }
            }
        });
        document.getElementById("updateUser").addEventListener("click", function() {
            var userID = this.getAttribute("data-userid");
            if (userModal.validate()) {
                var objectUser = userModal.read(userID);
                localStorage.setItem(userID, JSON.stringify(objectUser));
                usersTable.createTable(initTableEvents);
                userModal.close();
            };
        });
        document.getElementById("formReset").addEventListener("click", function() {
            document.getElementById("userForm").reset();
            document.querySelector(".validationWarning").innerHTML = "";
        });
        var modalClose = document.getElementsByClassName("modal-close");
        for (var i = 0; i < modalClose.length; i++) {
            modalClose[i].addEventListener("click", function() {
                userModal.close();
            })
        }
    }
    initEvents();
    var userModal = new UsersModal();
}());