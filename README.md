# Natura Cafe Sales and Operations Management System

The Natura Cafe Sales and Operations Management System is a database designed for a modestly-sized, major University-adjacent cafe which processes approx. 150 daily customer transactions and typically generates approximately $450,000 in gross earnings each year. To help further this institution's growth and analytics as well as track day-to-day business such as hiring and invoicing, this database features entities to track the business's employees, their roles, frequent customers, menu items, invoices, and a M:N transaction table to facilitate the relationship between an invoice and the items on it. With this database, Natura will be better positioned to streamline their operations, optimize its menu, and scale its business effectively while maintaining high levels of customer satisfaction.


## Installation and Usage


1. Install Node Modules and Dependencies
- run ```npm install```

2. Host the site
- run ```node app.js``` to load the site at ```http://localhost:2037``` by default
- go to ```http://localhost:2037``` on your browser of choice

3. Manage data in the database
- from the site, navigate to any page using the navigation bar at the top
- use an of the variety of ADD, DELETE, and UPDATE features available to manipulate the site's data


## Citations:


1. This project is based on the CS 340 starter guide code, which we modified for our specific database design:
Curry, M and Safonte, D (February 28, 2025) Node.JS starter guide [Source code] https://github.com/osu-cs340-ecampus/nodejs-starter-app

2. In add_employee.js, add_invoice_item.js, and add_invoice.js, we adapted this Stack Overflow code to pass the user's selected text from the FK dropdown to the addRowToTable function, instead of passing the FK ID value:
Bright, S (March 11, 2025) Retrieving the text of the selected <option> in <select> element [Source code snippet] https://stackoverflow.com/questions/610336/retrieving-the-text-of-the-selected-option-in-select-element
