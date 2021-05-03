(function() {
    var initEvents = function() {
        document.getElementById("newUser").addEventListener("click", function() {
            document.getElementById("modal-title").innerHTML = "New User";
            document.getElementById("addUser").hidden = false;
            document.getElementById("updateUser").hidden = true;

        });
    }
    var getUsers = function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/users", true);
        // xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function() {
            document.getElementById("users").innerHTML = this.responseText;
            initTableEvents();
        }
        xhr.send();
    }
    var initTableEvents = function() {
        var userDelete = document.getElementsByClassName("deleteUser");
        for (var i = 0; i < userDelete.length; i++) {
            userDelete[i].addEventListener("click", function() {
                console.log("clicked");
                console.log(this.getAttribute("data-userid"));
                var xhr = new XMLHttpRequest();
                xhr.open("DELETE", "/users/" + this.getAttribute("data-userid"), true);
                xhr.onload = function() {
                    getUsers();
                };
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
            userModal.reset();
        });
        document.getElementById("addUser").addEventListener("click", function() {
            var userID = Math.floor(Math.random() * 100).toString();
            var objectUser = userModal.read();
            objectUser.Id = userID;
            var data = JSON.stringify(objectUser);
            console.log(data);
            console.log(objectUser);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/users", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function() {
                getUsers();
                userModal.reset();
            };
            xhr.send(data);
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
                xhr.onload = function() {
                    getUsers();
                    userModal.reset();
                };
                xhr.send(data);
            };
        });

        var formReset = document.querySelectorAll("[class*='close']");
        for (var i = 0; i < formReset.length; i++) {
            formReset[i].addEventListener("click", function() {
                userModal.reset();
            });
        };
    }
    initEvents();
    initTableEvents();
    initModalEvents();
    var userModal = new UsersModal();
    userModal;
}());