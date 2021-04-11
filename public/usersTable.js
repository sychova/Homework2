var UsersTable = function(tableId) {
    this.tableId = tableId;
    this.headers = headers;
    this.getUsers = function() {
        fetch("/getUsers", { method: "GET" })
            .then(function(res) {
                if (res.ok) {
                    console.log("OK");
                    return;
                }
            });





        // var keys = Object.keys(localStorage);
        // var usersList = [];
        // for (i of keys) {
        //     var objectUser = JSON.parse(localStorage.getItem(i));
        //     usersList.push(objectUser);
        // }
        // return usersList;



        //     fetch('/clicked', {method: 'POST'})
        //     .then(function(response) {
        //       if(response.ok) {
        //         console.log('click was recorded');
        //         return;
        //       }
        //       throw new Error('Request failed.');
        //     })
        //     .catch(function(error) {
        //       console.log(error);
        //     });
        // });


        //         fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(res => res.json())
        //     .then(json => {
        //         console.log("First user in the array:");
        //         console.log(json[0]);
        //         console.log("Name of the first user in the array:");
        //         console.log(json[0].name);
        // })






    };
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





        // var initialElement = document.getElementById("usersTable");
        // var usersTable = document.createElement("table");
        // usersTable.classList.add("table");
        // usersTable.id = "usersTable";
        // initialElement.parentNode.replaceChild(usersTable, initialElement);
        // usersTable.appendChild(headers);
        // usersTable.appendChild(rows);
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