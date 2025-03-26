// Citation for the following code:
// Date: 02/28/2025
// Adapted from Node.JS starter guide
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


// Get the objects we need to modify
let updateEmployeeForm = document.getElementById('update-employee-form-ajax');

// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("selected-name");
    let inputRole = document.getElementById("input-role-id-update");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let roleValue = inputRole.value;

    if (roleValue == "") 
    {
        roleValue = null;
    }

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        roleID: roleValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // update selected row with new data
            updateRow(xhttp.response, nameValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


function updateRow(data, employeeID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("employees-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == employeeID) {

            // Get the location of the row where we found the matching employee ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of role value
            let td = updateRowIndex.getElementsByTagName("td")[8];

            // Reassign role to our value we updated to
            if (parsedData[0]) {                        // check if a role was selected
                td.innerHTML = parsedData[0].name;
            } else {
                td.innerHTML = "";                      // display empty field if input was NULL
            }
       }
    }
}
