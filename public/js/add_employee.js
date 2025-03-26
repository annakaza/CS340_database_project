// Citation for the following code (excluding line 40):
// Date: 02/28/2025
// Adapted from Node.JS starter guide
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


// Get the objects we need to modify
let addEmployeeForm = document.getElementById('add-employee-form-ajax');

// Modify the objects we need
addEmployeeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputAddress = document.getElementById("input-address");
    let inputPhone = document.getElementById("input-phone");
    let inputEmail = document.getElementById("input-email");
    let inputBirthDate = document.getElementById("input-birth-date");
    let inputStartDate = document.getElementById("input-start-date");
    let inputPayRate = document.getElementById("input-pay-rate");
    let inputRoleID = document.getElementById("input-role-id");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let addressValue = inputAddress.value;
    let phoneValue = inputPhone.value;
    let emailValue = inputEmail.value;
    let birthDateValue = inputBirthDate.value;
    let startDateValue = inputStartDate.value;
    let payRateValue = inputPayRate.value;
    let roleIDValue = inputRoleID.value;

    // Citation for line 40:
    // Date: 03/11/2025
    // Adapted from Stack Overflow answer to "Retrieving the text of the selected <option> in <select> element"
    // https://stackoverflow.com/questions/610336/retrieving-the-text-of-the-selected-option-in-select-element
    let roleName = inputRoleID.options[inputRoleID.selectedIndex].text;    // Get the selected role name from the dropdown

    if (roleIDValue == "") 
        {
            roleIDValue = null;
            roleName = "";
        }

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        address: addressValue,
        phone: phoneValue,
        email: emailValue,
        dateOfBirth: birthDateValue,
        hireDate: startDateValue,
        payRate: payRateValue,
        roleID: roleIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response, roleName);

            // Clear the input fields for another addition
            inputName.value = '';
            inputAddress.value = '';
            inputPhone.value = '';
            inputEmail.value = '';
            inputBirthDate.value = '';
            inputStartDate.value = '';
            inputPayRate.value = '';
            inputRoleID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from Employees
addRowToTable = (data, roleName) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("employees-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 10 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let dateOfBirthCell = document.createElement("TD");
    let hireDateCell = document.createElement("TD");
    let payRateCell = document.createElement("TD");
    let roleCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.employeeID;
    idCell.style.textAlign = "right";          // right-align the new ID to match others
    nameCell.innerText = newRow.name;
    addressCell.innerText = newRow.address;
    phoneCell.innerText = newRow.phone;
    emailCell.innerText = newRow.email;
    dateOfBirthCell.innerText = newRow.dateOfBirth;
    hireDateCell.innerText = newRow.hireDate;
    payRateCell.innerText = newRow.payRate;
    payRateCell.style.textAlign = "right";          // right-align the new pay rate to match others
    roleCell.innerText = roleName;           // display role name instead of role ID

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.classList.add("delete-button"); // match style to other delete buttons
    deleteCell.onclick = function(){
        deleteEmployee(newRow.employeeID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(addressCell);
    row.appendChild(phoneCell);
    row.appendChild(emailCell);
    row.appendChild(dateOfBirthCell);
    row.appendChild(hireDateCell);
    row.appendChild(payRateCell);
    row.appendChild(roleCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.employeeID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("selected-name");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.employeeID;
    selectMenu.add(option);
}