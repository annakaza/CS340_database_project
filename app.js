// Citation for the following code:
// Date: 02/28/2025
// Adapted from Node.JS starter guide
// https://github.com/osu-cs340-ecampus/nodejs-starter-app


/*
    SETUP
*/
var express = require('express');
var app     = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 2037;

// Database
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');


/*
    ROUTES
*/
// HOME PAGE
app.get('/', (req, res) => {
    res.render('index');
});


// CUSTOMERS PAGE
app.get('/customers', function(req, res)
    {  
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name === undefined)
        {
            query1 = `SELECT * FROM Customers;`;
        }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Customers
            WHERE name LIKE "${req.query.name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        

            return res.render('customers', {data: rows});
        })
    })

// Add Customer
app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    if (data.email == null)
    {
        data.email = 'NULL'
    } else {
        data.email = `'${data.email}'`
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (name, email)
     VALUES ('${data.name}', ${data.email})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Delete Customer
app.delete('/delete-customer-ajax', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.customerID);
    let deleteCustomers= `DELETE FROM Customers WHERE customerID = ?`;

          // Run the query
          db.pool.query(deleteCustomers, [customerID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
  })});
        
  
// EMPLOYEES PAGE
app.get('/employees', function(req, res)
    {  
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name === undefined)
        {
            query1 = `SELECT employeeID, name, address, phone, email,
            DATE_FORMAT(dateOfBirth, '%m/%d/%Y') AS dateOfBirth,
            DATE_FORMAT(hireDate, '%m/%d/%Y') AS hireDate,
            payRate, roleID FROM Employees;`;
        }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT employeeID, name, address, phone, email,
            DATE_FORMAT(dateOfBirth, '%m/%d/%Y') AS dateOfBirth,
            DATE_FORMAT(hireDate, '%m/%d/%Y') AS hireDate,
            payRate, roleID FROM Employees
            WHERE name LIKE "${req.query.name}%"`
    }

    let query2 = "SELECT * FROM Roles;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the employees
        let employees = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the roles
            let roles = rows;

            // Construct an object for reference in the table
            let rolemap = {}
            roles.map(role => {
                let roleID = parseInt(role.roleID, 10);

                rolemap[roleID] = role["name"];
            })

            // Overwrite the roleID with the role name in the employees object
            employees = employees.map(employee => {
                return Object.assign(employee, {roleID: rolemap[employee.roleID]})
            })

            return res.render('employees', {data: employees, roles: roles});
        })
    })
                                                       });

// Add Employee
app.post('/add-employee-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let roleID = parseInt(data.roleID);
    if (isNaN(roleID))
    {
        roleID = null
    }
    let payRate = parseFloat(data.payRate);

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (name, address, phone, email, dateOfBirth, hireDate, payRate, roleID)
     VALUES ('${data.name}', '${data.address}', '${data.phone}', '${data.email}', '${data.dateOfBirth}', '${data.hireDate}', ${payRate}, ${roleID})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Employees
            query2 = `SELECT employeeID, name, address, phone, email,
            DATE_FORMAT(dateOfBirth, '%m/%d/%Y') AS dateOfBirth,
            DATE_FORMAT(hireDate, '%m/%d/%Y') AS hireDate,
            payRate, roleID FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Delete Employee
app.delete('/delete-employee-ajax', function(req,res,next){
    let data = req.body;
    let employeeID = parseInt(data.employeeID);
    let deleteEmployees= `DELETE FROM Employees WHERE employeeID = ?`;

          // Run the query
          db.pool.query(deleteEmployees, [employeeID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
  })});

// Update Employee
app.put('/put-employee-ajax', function(req,res,next){
  let data = req.body;

  let employeeID = parseInt(data.name);
//   let address = data.address;
//   let phone = data.phone;
//   let email = data.email;
//   let payRate = parseFloat(data.payRate);
  let roleID = parseInt(data.roleID);
    if (isNaN(roleID))
    {
        roleID = null    // not sure if this implementation is correct, I improvised
    }

  let queryUpdateEmployee = `UPDATE Employees SET roleID = ? WHERE employeeID = ?`;
  let selectRole = `SELECT * FROM Roles WHERE roleID = ?`

        // Run the 1st query
        db.pool.query(queryUpdateEmployee, [roleID, employeeID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the employee's
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectRole, [roleID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});


// ROLES PAGE
app.get('/roles', function(req, res)
    {
        let query1 = `SELECT * FROM Roles;`;

        db.pool.query(query1, function(error, rows, fields){
            
            return res.render('roles', {data: rows});
        })
    });

// Add Role
app.post('/add-role-ajax', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Roles (name) VALUES ('${data.name}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Roles;`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Delete Role from table
app.delete('/delete-role-ajax', function(req, res, next){
    let data = req.body;
    let roleID = parseInt(data.roleID);
    let deleteRole = `DELETE FROM Roles WHERE roleID = ?`;

    db.pool.query(deleteRole, [roleID], function(error, rows, fields){
        if (error) {

            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }
    })
});


// ITEMS PAGE
app.get('/items', function(req, res)
    {  
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name === undefined)
        {
            query1 = `SELECT * FROM Items;`;
        }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Items
            WHERE name LIKE "${req.query.name}%"`
    }

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        

            return res.render('items', {data: rows});
        })
    })

// Add Item
app.post('/add-item-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let price = parseFloat(data.price);

    // Create the query and run it on the database
    query1 = `INSERT INTO Items (name, price)
     VALUES ('${data.name}', ${data.price})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Items
            query2 = `SELECT * FROM Items;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Delete Item
app.delete('/delete-item-ajax', function(req,res,next){
    let data = req.body;
    let itemID = parseInt(data.itemID);
    let deleteItems= `DELETE FROM Items WHERE itemID = ?`;

          // Run the query
          db.pool.query(deleteItems, [itemID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
  })});


// INVOICES PAGE
app.get('/invoices', function(req, res)
    {
        let query1 = `SELECT invoiceID, DATE_FORMAT(Invoices.saleDate, '%Y-%m-%d %H:%i:%s') AS saleDate, netTotal, salesTax, saleTotal, employeeID, customerID FROM Invoices;`;

        let query2 = `SELECT * FROM Employees;`;

        let query3 = `SELECT * FROM Customers;`;

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){

            // Save the invoices
            let invoices = rows;

            // Run the 2nd query
            db.pool.query(query2, (error, rows, fields) => {

                // Save the employees
                let employees = rows;

                let employeeMap = {}
                employees.map(employee => {
                    let employeeID = parseInt(employee.employeeID, 10);

                    employeeMap[employeeID] = employee["name"];
                })

                db.pool.query(query3, (error, rows, feilds) => {

                    // Save the customers
                    let customers = rows;

                    let customerMap = {}
                    customers.map(customer => {
                        let customerID = parseInt(customer.customerID, 10);

                        customerMap[customerID] = customer["name"];
                    })

                    invoices = invoices.map(invoice => {
                        return Object.assign(invoice, {customerID: customerMap[invoice.customerID]}, {employeeID: employeeMap[invoice.employeeID]})
                    })
                    
                    return res.render('invoices', {data: invoices, employees: employees, customers: customers});
                })
            })
        })
    }
);

// Add Invoice
app.post('/add-invoice-ajax', function(req, res)
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Capture NULL values
        let customer = parseInt(data.customerID);
        if (isNaN(customer))
        {
            customer = 'NULL'
        }
        
        let netTotal = parseInt(data.netTotal);

        // Compute salesTax
        let salesTax = netTotal * .06
        
        // Compute saleTotal
        let saleTotal = netTotal + salesTax

        let employee = parseInt(data.employeeID);
        if (isNaN(employee))
            {
                employee = 'NULL'
            }

        // Create the query and run it on the database
        query1 = `INSERT INTO Invoices (saleDate, netTotal, salesTax, saleTotal, employeeID, customerID) VALUES ('${data.saleDate}', '${data.netTotal}', ${salesTax}, ${saleTotal}, ${employee}, ${customer})`;

        db.pool.query(query1, function(error, rows, fields){
            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on Invoices
                query2 = `SELECT * FROM Invoices;`;
                db.pool.query(query2, function(error, rows, fields){

                    // If there was an error on the second query, send a 400 response
                    if (error) {

                        // Log the error to the terminal so we know what went wrong, and send the visitor and HTTP response 400 indicating it was a bad request
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    }
);

// Delete Invoice
app.delete('/delete-invoice-ajax', function(req,res,next){
    let data = req.body;
    let invoiceID = parseInt(data.invoiceID);
    let deleteInvoice = `DELETE FROM Invoices WHERE invoiceID = ?`;
    let deleteInvoiceItem = `DELETE FROM InvoiceItems WHERE invoiceID = ?`;

        // Run the 1st query
        db.pool.query(deleteInvoice, [invoiceID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteInvoiceItem, [invoiceID], function(error,  rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
        })
});


// INVOICE ITEMS PAGE
app.get('/invoice_items', function(req, res)
    {
    let query1 = `SELECT * FROM InvoiceItems;`;

    let query2 = "SELECT * FROM Items;";

    let query3 = "SELECT invoiceID, DATE_FORMAT(saleDate, '%Y-%m-%d %H:%i:%s') AS saleDate FROM Invoices;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the invoice items
        let invoice_items = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the items
            let items = rows;

            // Construct an object for reference in the table
            let itemmap = {}
            items.map(item => {
                let itemID = parseInt(item.itemID, 10);

                itemmap[itemID] = item["name"];
            })

            // Run the third query
            db.pool.query(query3, (error, rows, fields) => {
            
                // Save the invoices
                let invoices = rows;

                // Construct an object for reference in the table
                let invoicemap = {}
                invoices.map(invoice => {
                    let invoiceID = parseInt(invoice.invoiceID, 10);

                    invoicemap[invoiceID] = invoice["saleDate"];
                })

                // Overwrite the itemID with the item name in the invoice items object
                invoice_items = invoice_items.map(invoice_item => {
                    return Object.assign(invoice_item, {itemID: itemmap[invoice_item.itemID]}, {invoiceID: invoicemap[invoice_item.invoiceID]})
                })

                return res.render('invoice_items', {data: invoice_items, items: items, invoices: invoices});                
            })

            
        })

        
    })
                                                       });

// Add Invoice Item
app.post('/add-invoice-item-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let itemID = parseInt(data.itemID);
    let invoiceID = parseInt(data.invoiceID);
    let orderQuantity = parseInt(data.orderQuantity);

    // Create the query and run it on the database
    query1 = `INSERT INTO InvoiceItems (itemID, invoiceID, orderQuantity)
     VALUES (${itemID}, ${invoiceID}, ${orderQuantity})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on InvoiceItems
            query2 = `SELECT * FROM InvoiceItems;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Delete Invoice Item
app.delete('/delete-invoice-item-ajax', function(req,res,next){
    let data = req.body;
    let invoiceItemID = parseInt(data.invoiceItemID);
    let deleteInvoiceItems= `DELETE FROM InvoiceItems WHERE invoiceItemID = ?`;

          // Run the query
          db.pool.query(deleteInvoiceItems, [invoiceItemID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
  })});

// Update Invoice Item
app.put('/put-invoice-item-ajax', function(req,res,next){
    let data = req.body;
  
    let invoiceItemID = parseInt(data.invoiceItemID);
    let orderQuantity = parseInt(data.orderQuantity);
  
    let queryUpdateInvoiceItem = `UPDATE InvoiceItems SET orderQuantity = ? WHERE invoiceItemID = ?`;
    let selectInvoiceItem = `SELECT * FROM InvoiceItems WHERE invoiceItemID = ?`

    // Run the 1st query
    db.pool.query(queryUpdateInvoiceItem, [orderQuantity, invoiceItemID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the employee's
        // table on the front-end
        else
        {
            // Run the second query
            db.pool.query(selectInvoiceItem, [invoiceItemID], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
})});


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});