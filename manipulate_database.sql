-- Project: Natura Cafe Sales and Operations Database Management System
-- Database Manipulation queries

-- Below are the sample data manipulation queries for the Natura Sales and Operations Management System,
-- which reflect the operations implemented in the server-side code

--
-- CUSTOMERS Queries
--

-- Get all customers for READ capabilities on the Customers page
SELECT * FROM Customers;

-- Add a new customer to the customer table.
INSERT INTO Customers (name, email)
VALUES (
    :nameInput,
    :emailInput
);

-- Delete a customer from the customer table.
DELETE FROM Customers WHERE customerID = :customerID_selected_from_table;


--
-- EMPLOYEES Queries
--

-- Get all employees and display them on the employees table; use inner join to display the role name on the table rather than the ID number
SELECT Employees.employeeID, Employees.name, Employees.address, Employees.phone, Employees.email, Employees.dateOfBirth, Employees.hireDate, Employees.payRate, Roles.name FROM Employees
INNER JOIN Roles
ON Employees.roleID = Roles.roleID;

-- Populate a Roles dropdown menu used to add/update employees; names are used for the actual dropdown and ID used for the value returned from the form.
SELECT roleID, name from Roles;

-- Add a new employee to the employees table
INSERT INTO Employees (name, address, phone, email, dateOfBirth, hireDate, payRate, roleID)
VALUES (
    :nameInput,
    :addressInput,
    :phoneInput,
    :emailInput,
    :dateOfBirthInput,
    :hireDateInput,
    :payRateInput,
    :roleID_from_dropdown_Input
);

-- Get a single employee's data for the Update form 
SELECT Employees.employeeID, Employees.name, Employees.address, Employees.phone, Employees.email, Employees.dateOfBirth, Employees.hireDate, Employees.payRate, Roles.name FROM Employees
INNER JOIN Roles
ON Employees.roleID = Roles.roleID
WHERE employeeID = :employeeID_selected_from_table;

-- Update an employee's data based on submission of the Update Employee form 
UPDATE Employees SET roleID = roleID_from_dropdown_Input WHERE employeeID= :employeeID_from_update_form;

-- Get select Employees for a search function on the page which uses a text input
SELECT * FROM Employees WHERE name = :approxNameInput;

-- Populate an Employees dropdown menu (for Update form)
SELECT employeeID, name FROM Employees;

-- Delete an employee from the employee table
DELETE FROM Employees WHERE employeeID = :employeeID_selected_from_table;


--
-- ROLES Queries
--

-- Get all roles and display them on the Roles table
SELECT * FROM Roles;

-- Add a new role to the Role table
INSERT INTO Roles (name)
VALUES (
    :nameInput
);

-- Delete a role from the Role table
DELETE FROM Roles WHERE roleID = :roleID_selected_from_table;


--
-- ITEMS Queries
--

-- Get all items to display them on the Items table
SELECT * FROM Items;

-- Add a new item to the Items table
INSERT INTO Items (name, price)
VALUES (
    :nameInput,
    :priceInput
);

-- Delete an item from the Items table
DELETE FROM Items WHERE itemID = :itemID_selected_from_table;

-- Gets all of the information to display a single Item from the Items table for a search feature using a text input field
SELECT * FROM Items WHERE itemName = :approxItemName;


--
-- INVOICES Queries
--

-- Get all invoices to display on the Invoices table; use inner joins to display customer and employee names rather than their IDs for the sake of readability
SELECT Invoices.invoiceID, Customers.name, Employees.name, Invoices.saleDate, Invoices.netTotal, Invoices.salesTax, Invoices.saleTotal FROM Invoices
INNER JOIN Customers
ON Invoices.customerID = Customers.customerID
INNER JOIN Employees
ON Invoices.employeeID = Employees.employeeID;

-- Populate a Customers dropdown menu (for Add form)
SELECT customerID, name from Customers;

-- Populate an Employees dropdown menu (for Add form)
SELECT employeeID, name from Employees;

-- Add a new invoice
INSERT INTO Invoices (customerID, employeeID, saleDate, netTotal, salesTax, saleTotal)
VALUES (
    :customerID_from_dropdown_Input,
    :employeeIDInput_from_dropdown_Input,
    :saleDateInput,
    :netTotalInput,
    :salesTaxInput,
    :saleTotalInput
);

-- Delete an invoice
DELETE FROM Invoices WHERE invoiceID = :invoiceID_selected_from_table;


--
-- INVOICEITEMS Queries
--

-- Get all invoice items and the item name (instead of ID) and invoice date (instead of ID)
SELECT InvoiceItems.invoiceItemID, Items.name, Invoices.saleDate, InvoiceItems.orderQuantity
    FROM InvoiceItems
        INNER JOIN Items 
        ON InvoiceItems.itemID = Items.itemID
        INNER JOIN Invoices 
        ON InvoiceItems.invoiceID = Invoices.invoiceID;

-- Populate an Items dropdown menu (for Add and Update forms)
SELECT itemID, name FROM Items;

-- Populate an Invoices dropdown menu (for Add and Update forms)
SELECT invoiceID, saleDate FROM Invoices;

-- Add a new invoice item to the InvoiceItems table
INSERT INTO InvoiceItems (itemID, invoiceID, orderQuantity)
VALUES (
    :itemID_from_dropdown_Input,
    :invoiceID_from_dropdown_Input,
    :orderQuantityInput
);

-- Get a single invoice item's data for the Update form 
SELECT InvoiceItems.invoiceItemID, Items.name, Invoices.saleDate, InvoiceItems.orderQuantity
    FROM InvoiceItems
        INNER JOIN Items 
        ON InvoiceItems.itemID = Items.itemID
        INNER JOIN Invoices 
        ON InvoiceItems.invoiceID = Invoices.invoiceID
    WHERE invoiceItemID = :invoiceItemID_selected_from_table;

-- Update an invoice item's data based on submission of the Update Invoice Item form
UPDATE InvoiceItems
    SET orderQuantity = :orderQuantityInput 
    WHERE invoiceItemID = :invoiceItemID_from_update_form;

-- Delete an invoice item from the InvoiceItems table
DELETE FROM InvoiceItems WHERE invoiceItemID = :invoiceItemID_selected_from_table;
