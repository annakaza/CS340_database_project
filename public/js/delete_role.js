// Citation for the following code:
// Date: 02/28/2025
// Adapted from Node.JS starter guide
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


function deleteRole(roleID) {
    // Put our data we want to send in a javascript object
    let data = {
        roleID: roleID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-role-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // delete selected row from the table
            deleteRow(roleID);
        }
        else if (xhttp.readyState == 4 && xhttp.status !=204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(roleID) {

    let table = document.getElementById("role-table");
    for (let i = 0, row; row = table.rows[i]; i++)  {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == roleID) {
            table.deleteRow(i);
            break;
        }
    }
}