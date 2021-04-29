(function() {
    var initEvents = function() {
        document.getElementById("newUser").addEventListener("click", function() {
            document.getElementById("modal-title").innerHTML = "New User";
            document.getElementById("addUser").hidden = false;
            document.getElementById("updateUser").hidden = true;
        });
    }
    var initTableEvents = function() {
        var userDelete = document.getElementsByClassName("deleteUser");
        for (var i = 0; i < userDelete.length; i++) {
            userDelete[i].addEventListener("click", function() {
                var xhr = new XMLHttpRequest();
                xhr.open("DELETE", "/users/" + this.getAttribute("data-userid"), true);
                xhr.send();
            });
        };
        var userEdit = document.getElementsByClassName("editUser");
        for (var i = 0; i < userEdit.length; i++) {
            userEdit[i].addEventListener("click", function() {
                var userID = this.getAttribute("data-userid");
                document.getElementById("modal-title").innerHTML = "Edit User";
                document.getElementById("addUser").hidden = true;
                document.getElementById("updateUser").hidden = false;
                document.getElementById("updateUser").setAttribute("data-userid", userID);
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `/users/${this.getAttribute("data-userid")}`, true);
                xhr.onload = function() {
                    if (this.status == 200) {
                        var userObject = JSON.parse(this.responseText)
                        document.getElementById("FirstNameI").value = userObject.FirstName;
                        document.getElementById("LastNameI").value = userObject.LastName;
                        document.getElementById("AgeI").value = userObject.Age
                        document.getElementById("PhoneI").value = userObject.Phone;
                        document.getElementById("EmailI").value = userObject.Email;
                        document.getElementById("GenderI").value = userObject.Gender;
                    }
                }
                xhr.send();
            });
        }
    }
    var initModalEvents = function() {
        document.getElementById("formReset").addEventListener("click", function() {
            document.getElementById("userForm").reset();
            document.querySelector(".validationWarning").innerHTML = "";
        });
        // document.getElementById("addUser").addEventListener("click", function() {
        //     if (userModal.validate()) {
        //         var userKey = Math.floor(Math.random() * 100).toString();
        //         var isDuplicate = Object.keys(localStorage).includes(userKey);
        //         if (isDuplicate) {
        //             return generateUserId(Object.keys(localStorage));
        //         } else {
        //             var userData = userModal.read(userKey);
        //             localStorage.setItem(userKey, JSON.stringify(userData));
        //             usersTable.createTable(initTableEvents);
        //             userModal.close();
        //         }
        //     }
        // });

        document.getElementById("addUser").addEventListener("click", function() {
            if (userModal.validate()) {
                var xhr1 = new XMLHttpRequest();
                xhr1.open("GET", "/users", true);
                xhr1.onload = function() {
                    console.log(this.responseText);
                }
                xhr1.send();


                // finalArray = result.recordset.map(function(obj) {
                //     return obj.UserID;
                // });



                // var userID = Math.floor(Math.random() * 100).toString();
                // // var isDuplicate = this.responseText.includes(userID);
                // var objectUser = userModal.read();
                // objectUser.Id = userID;
                // var data = JSON.stringify(objectUser);
                // console.log(data);
                // console.log(objectUser);
                // var xhr = new XMLHttpRequest();
                // xhr.open("POST", "/users", true);
                // xhr.setRequestHeader("Content-Type", "application/json");
                // xhr.send(data);
            };
        });

        document.getElementById("updateUser").addEventListener("click", function() {
            var userID = this.getAttribute("data-userid");
            if (userModal.validate()) {
                var objectUser = userModal.read(userID);
                var data = JSON.stringify(objectUser);
                console.log(data);
                console.log(objectUser);
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/users/" + this.getAttribute("data-userid"), true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(data);
            };
        });
    }
    initEvents();
    initTableEvents();
    initModalEvents();
    var userModal = new UsersModal();
    userModal;
}());