var UsersTable = function() {
    this.getUsers = function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/users", true);
        // xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function() {
            document.getElementById("users").innerHTML = this.responseText;
            initTableEvents();
        }
        xhr.send();
    }
}