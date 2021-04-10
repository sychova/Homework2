(function() var button = document.getElementById("newUser"); button.addEventListener("click", function(e) {
        console.log("I clicked the button");
        fetch("/clicked", { method: POST })
            .then(function(response) {
                if (response.ok) {
                    console.log("CLick was recorded!");
                    return;
                }
            });
    });