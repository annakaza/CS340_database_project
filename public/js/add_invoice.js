// Citation for the following code (excluding lines 33-34):
// Date: 02/28/2025
// Adapted from Node.JS starter guide
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addInvoiceForm = document.getElementById('add-invoices-form-ajax');

// Modify the objects we need
addInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSaleDate = document.getElementById("input-saledate");
    let inputNetTotal = document.getElementById("input-net-total");
    let inputEmployeeID = document.getElementById("input-employee-id");
    let inputCustomerID = document.getElementById("input-customer-id");

    // Get the values from the form fields
    let saleDateValue = inputSaleDate.value;
    let netTotalValue = inputNetTotal.value;
    let salesTaxValue = String(parseInt(netTotalValue) * .06)
    let saleTotalValue = String(parseInt(netTotalValue) + parseInt(salesTaxValue))
    let employeeIDValue = inputEmployeeID.value;
    let customerIDValue = inputCustomerID.value;

    // Citation for lines 33-34:
    // Date: 03/11/2025
    // Adapted from Stack Overflow answer to "Retrieving the text of the selected <option> in <select> element"
    // https://stackoverflow.com/questions/610336/retrieving-the-text-of-the-selected-option-in-select-element
    let employeeName = inputEmployeeID.options[inputEmployeeID.selectedIndex].text;   // Get the selected employee name from the dropdown
    let customerName = inputCustomerID.options[inputCustomerID.selectedIndex].text;   // Get the selected customer name from the dropdown
    if (employeeName == "Select an Employee") {
        employeeName = ""
    }
    if (customerName == "Select a Customer") {
        customerName = ""
    }

    // Put our data we want to send in a javascript object
    let data = {
        saleDate: saleDateValue,
        netTotal: netTotalValue,
        salesTax: salesTaxValue,
        saleTotal: saleTotalValue,
        employeeID: employeeIDValue,
        customerID: customerIDValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Reload the page for the invoice sale date to display in the correct format
            location.reload();  // this approach was suggested by our peer reviewer Gordon Grey
            
            // we could not implement an addRowToTable function for this case, because it converted
            // the datetime to a wrong format and timezone, different from what was entered by the user
            // and added to the database, so we decided to refresh the page after a new entry is added,
            // to ensure all sale dates are displayed correctly
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
})