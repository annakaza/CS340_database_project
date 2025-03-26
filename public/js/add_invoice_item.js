// Citation for the following code (excluding lines 29-30):
// Date: 02/28/2025
// Adapted from Node.JS starter guide
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addInvoiceItemForm = document.getElementById('add-invoice-item-form-ajax');

// Modify the objects we need
addInvoiceItemForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputItemID = document.getElementById("input-item-id");
    let inputInvoiceID = document.getElementById("input-invoice-id");
    let inputOrderQuantity = document.getElementById("input-order-quantity");

    // Get the values from the form fields
    let itemIDValue = inputItemID.value;
    let invoiceIDValue = inputInvoiceID.value;
    let orderQuantityValue = inputOrderQuantity.value;
    
    // Citation for lines 29-30:
    // Date: 03/11/2025
    // Adapted from Stack Overflow answer to "Retrieving the text of the selected <option> in <select> element"
    // https://stackoverflow.com/questions/610336/retrieving-the-text-of-the-selected-option-in-select-element
    let itemName = inputItemID.options[inputItemID.selectedIndex].text;               // Get the selected item name from the dropdown
    let invoiceSaleDate = inputInvoiceID.options[inputInvoiceID.selectedIndex].text;  // Get the selected invoice sale date from the dropdown

    // Put our data we want to send in a javascript object
    let data = {
        itemID: itemIDValue,
        invoiceID: invoiceIDValue,
        orderQuantity: orderQuantityValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response, itemName, invoiceSaleDate);

            // Clear the input fields for another addition
            inputItemID.value = '';
            inputInvoiceID.value = '';
            inputOrderQuantity.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from InvoiceItems
addRowToTable = (data, itemName, invoiceSaleDate) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("invoice-items-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let itemCell = document.createElement("TD");
    let invoiceCell = document.createElement("TD");
    let orderQuantityCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceItemID;
    idCell.style.textAlign = "right";          // right-align the new ID to match others
    itemCell.innerText = itemName;              // display item name instead of item ID
    invoiceCell.innerText = invoiceSaleDate;    // display invoice sale date instead of invoice ID
    orderQuantityCell.innerText = newRow.orderQuantity;          
    orderQuantityCell.style.textAlign = "right";          // right-align the new ID to match others

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.classList.add("delete-button"); // match style to other delete buttons
    deleteCell.onclick = function(){
        deleteInvoiceItem(newRow.invoiceItemID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(itemCell);
    row.appendChild(invoiceCell);
    row.appendChild(orderQuantityCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.invoiceItemID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (invoice item, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("selected-invoice-item");
    let option = document.createElement("option");
    option.text = itemName + " / " + invoiceSaleDate;
    option.value = newRow.invoiceItemID;
    selectMenu.add(option);
}