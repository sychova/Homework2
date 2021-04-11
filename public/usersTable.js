var UsersTable = function(tableId, headers) {
    this.tableId = tableId;
    this.headers = headers;
    this.getUsers = function() {
        fetch("/getUsers")
            .then(function(res) {
                if (res.ok) {
                    console.log("OK");
                    let json = res.json();
                    console.log(json);
                }
            });
    };



    // this.getUsers = function () {
    // 	var keys = Object.keys(localStorage);
    // 	var usersList = [];
    // 	for (i of keys) {
    // 		var objectUser = JSON.parse(localStorage.getItem(i));
    // 		usersList.push(objectUser);
    // 	}
    // 	return usersList;
    // };



    this.createTable = function(onInitialized) {
        var headers = this.getHeaders(this.headers);
        var rows = this.getRows();
        var table = `
		<table class="table">
		<thead class="thead-dark">${headers}</thead>
		<tbody>${rows}</tbody>
		</table>
		`
        var tableDiv = document.getElementById("usersTable");
        tableDiv.innerHTML = table;
        if (onInitialized) {
            onInitialized();
        }
    }
    this.getHeaders = function(tableHeaders) {
        var headers = "<tr>";
        for (i = 0; i < tableHeaders.length; i++) {
            headers += `<th>${tableHeaders[i]}</th>`;
            if (tableHeaders[i] == "Management") {
                tableHeaders.colSpan = "2";
            }
        }
        headers += "</tr>"
        return headers;
    }
    this.getRows = function() {
        var usersList = this.getUsers();
        var rows = "";
        for (i = 0; i < usersList.length; i++) {
            rows += `
			<tr>
				<td>${usersList[i].FirstName}</td>
				<td>${usersList[i].LastName}</td>
				<td>${usersList[i].Age}</td>
				<td>${usersList[i].Phone}</td>
				<td>${usersList[i].Email}</td>
				<td>${usersList[i].Gender}</td>
				<td>
					<button class="editUser btn btn-primary" data-userid="${usersList[i].Id}">Edit</button>
					<button class="deleteUser btn btn-danger" data-userid="${usersList[i].Id}">Delete</button>
				</td>
			</tr>`
        }
        return rows;
    }
}