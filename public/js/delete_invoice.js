// Citation for the following code:
// Date: 02/28/2025
// Adapted from Node.JS starter guide
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


function deleteInvoice(invoiceID) {
    // Put our data we want to send in a javascript object
    let data = {
        invoiceID: invoiceID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // delete selected row from the table
            deleteRow(invoiceID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        } 
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(invoiceID) {

    let table = document.getElementById("invoices-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == invoiceID) {
            table.deleteRow(i);
            break;
        }
    }
}