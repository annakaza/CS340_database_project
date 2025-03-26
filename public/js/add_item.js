// Citation for the following code:
// Date: 02/28/2025
// Adapted from Node.JS starter guide
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addItemForm = document.getElementById('add-item-form-ajax');

// Modify the objects we need
addItemForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputPrice = document.getElementById("input-price");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let priceValue = inputPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        price: priceValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another addition
            inputName.value = '';
            inputPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from Items
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("items-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.itemID;
    idCell.style.textAlign = "right";          // right-align the new ID to match others
    nameCell.innerText = newRow.name;
    priceCell.innerText = newRow.price;
    priceCell.style.textAlign = "right";          // right-align the price to match others

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.classList.add("delete-button"); // match style to other delete buttons
    deleteCell.onclick = function(){
        deleteItem(newRow.itemID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.itemID);

    // Add the row to the table
    currentTable.appendChild(row);

}