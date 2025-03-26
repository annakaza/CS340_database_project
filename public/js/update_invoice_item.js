// Citation for the following code:
// Date: 02/28/2025
// Adapted from Node.JS starter guide
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


// Get the objects we need to modify
let updateInvoiceItemForm = document.getElementById('update-invoice-item-form-ajax');

// Modify the objects we need
updateInvoiceItemForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInvoiceItem = document.getElementById("selected-invoice-item");
    let inputOrderQuantity = document.getElementById("input-order-quantity-update");

    // Get the values from the form fields
    let invoiceItemValue = inputInvoiceItem.value;
    let orderQuantityValue = inputOrderQuantity.value;

    // Put our data we want to send in a javascript object
    let data = {
        invoiceItemID: invoiceItemValue,
        orderQuantity: orderQuantityValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-invoice-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // update selected row with new data
            updateRow(xhttp.response, invoiceItemValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


function updateRow(data, invoiceItemID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("invoice-items-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == invoiceItemID) {

            // Get the location of the row where we found the matching invoice item ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of order quantity
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign order quantity to our value we updated to
            td.innerHTML = parsedData[0].orderQuantity;

    }
}}
