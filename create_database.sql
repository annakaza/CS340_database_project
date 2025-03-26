-- Project: Natura Cafe Sales and Operations Database Management System
-- Database Definition Queries

-- Below are the data definition queries for the Natura Sales and Operations Management System which
-- describes the structure the following entities: Customers, Employees, Items, Invoices, InvoiceItems,
-- and Roles. Also included at the bottom of the file are cascade features to define the
-- actions taken upon deletion of an entry on any of these particular tables.

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `cs340_kazaa`
--

-- Disable commits and foreign key checks to ensure that loading sample data will go smoothly
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- --------------------------------------------------------

-- Table structure for `Customers` table
CREATE OR REPLACE TABLE `Customers` (
  `customerID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Sample data for `Customers` table. Includes at least one Customer with a NULL email value for demonstration purposes.
INSERT INTO `Customers` (`customerID`, `name`, `email`) VALUES
(1, 'Clair Hugo', 'c_hugo@gmail.com'),
(2, 'Dylan Warren', 'warren47@hotmail.com'),
(3, 'Zoya Rollins', 'zoyarollins@yahoo.com'),
(4, 'Sebastian Pham', NULL),
(5, 'Darcey Savage', 'darsavage@gmail.com');

-- --------------------------------------------------------

-- Table structure for `Employees` table
CREATE OR REPLACE TABLE `Employees` (
  `employeeID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `hireDate` date NOT NULL,
  `payRate` decimal(4,2) NOT NULL,
  `roleID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Sample data for `Employees` table. Has at least one Employee with a NULL role ID value for demonstration purposes.
INSERT INTO `Employees` (`employeeID`, `name`, `address`, `phone`, `email`, `dateOfBirth`, `hireDate`, `payRate`, `roleID`) VALUES
(1, 'David Martinez', '789 Oak St, Orlando, FL', '321-555-9012', 'david.martinez@natura.com', '1988-11-03', '2021-05-20', 25.00, 1),
(2, 'Emily Carter', '101 Maple St, Orlando, FL', '321-555-3456', 'emily.carter@natura.com', '1992-07-14', '2022-10-30', 24.00, 1),
(3, 'James Rodriguez', '22 Pine St, Orlando, FL', '407-555-7890', 'james.rodriguez@natura.com', '1998-03-18', '2023-06-05', 17.00, NULL),
(4, 'Sarah Johnson', '456 Elm St, Orlando, FL', '407-555-5678', 'sarah.johnson@natura.com', '1995-09-25', '2023-01-10', 18.00, 2),
(5, 'Michael Lee', '123 Main St, Orlando, FL', '407-555-1234', 'michael.lee@natura.com', '1986-05-12', '2022-08-15', 16.00, 3);

-- --------------------------------------------------------

-- Table structure for `InvoiceItems` table
CREATE OR REPLACE TABLE `InvoiceItems` (
  `invoiceItemID` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  `invoiceID` int(11) NOT NULL,
  `orderQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Sample data for `InvoiceItems` table
INSERT INTO `InvoiceItems` (`invoiceItemID`, `itemID`, `invoiceID`, `orderQuantity`) VALUES
(1, 2, 1, 1),
(2, 4, 1, 1),
(3, 4, 2, 1),
(4, 5, 2, 1),
(5, 2, 3, 1),
(6, 3, 3, 1),
(7, 5, 4, 1),
(8, 1, 4, 1),
(9, 5, 5, 2),
(10, 4, 5, 2);

-- --------------------------------------------------------

-- Table structure for `Invoices` table
CREATE OR REPLACE TABLE `Invoices` (
  `invoiceID` int(11) NOT NULL,
  `saleDate` datetime NOT NULL,
  `netTotal` decimal(6,2) NOT NULL,
  `salesTax` decimal(6,2) NOT NULL,
  `saleTotal` decimal(6,2) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Sample data for `Invoices` table. Has at least one invoice with a NULL employee ID and one with a NULL customer ID for demonstration purposes.
INSERT INTO `Invoices` (`invoiceID`, `saleDate`, `netTotal`, `salesTax`, `saleTotal`, `employeeID`, `customerID`) VALUES
(1, '2023-08-01 08:30:20', 9.00, 0.54, 9.54, NULL, 1),
(2, '2023-08-01 10:45:07', 6.50, 0.39, 6.89, 4, 3),
(3, '2023-08-02 09:10:03', 8.00, 0.48, 8.48, 3, NULL),
(4, '2023-08-02 14:45:57', 3.50, 0.21, 3.71, 2, 2),
(5, '2023-08-02 17:20:31', 13.00, 0.78, 13.78, 3, 3);

-- --------------------------------------------------------

-- Table structure for `Items` table
CREATE OR REPLACE TABLE `Items` (
  `itemID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Sample data for `Items` table
INSERT INTO `Items` (`itemID`, `name`, `price`) VALUES
(1, 'Parisian Blend', 2.00),
(2, 'Cappuccino', 4.00),
(3, 'Cafe Au Lait', 4.00),
(4, 'Latte', 5.00),
(5, 'Earl Grey Tea', 1.50);

-- --------------------------------------------------------

-- Table structure for `Roles` table
CREATE OR REPLACE TABLE `Roles` (
  `roleID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Sample data for `Roles` table
INSERT INTO `Roles` (`roleID`, `name`) VALUES
(2, 'Barista'),
(3, 'Custodian'),
(1, 'Manager');

-- --------------------------------------------------------

-- Indexes for table `Customers`
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customerID`),
  ADD UNIQUE KEY `customerID_UNIQUE` (`customerID`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

-- Indexes for table `Employees`
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`employeeID`),
  ADD UNIQUE KEY `employeeID_UNIQUE` (`employeeID`),
  ADD UNIQUE KEY `phone_UNIQUE` (`phone`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `fk_Employees_Roles1_idx` (`roleID`);

-- Indexes for table `InvoiceItems`
ALTER TABLE `InvoiceItems`
  ADD PRIMARY KEY (`invoiceItemID`),
  ADD UNIQUE KEY `invoiceItemID_UNIQUE` (`invoiceItemID`),
  ADD KEY `fk_Items_has_Invoices_Invoices1_idx` (`invoiceID`),
  ADD KEY `fk_Items_has_Invoices_Items1_idx` (`itemID`);

-- Indexes for table `Invoices`
ALTER TABLE `Invoices`
  ADD PRIMARY KEY (`invoiceID`),
  ADD UNIQUE KEY `invoiceID_UNIQUE` (`invoiceID`),
  ADD KEY `fk_Invoices_Employees1_idx` (`employeeID`),
  ADD KEY `fk_Invoices_Customers1_idx` (`customerID`);

-- Indexes for table `Items`
ALTER TABLE `Items`
  ADD PRIMARY KEY (`itemID`),
  ADD UNIQUE KEY `itemName_UNIQUE` (`name`),
  ADD UNIQUE KEY `itemID_UNIQUE` (`itemID`);

-- Indexes for table `Roles`
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`roleID`),
  ADD UNIQUE KEY `roleID_UNIQUE` (`roleID`),
  ADD UNIQUE KEY `roleName_UNIQUE` (`name`);

-- --------------------------------------------------------

-- AUTO_INCREMENT for table `Customers`
ALTER TABLE `Customers`
  MODIFY `customerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

-- AUTO_INCREMENT for table `Employees`
ALTER TABLE `Employees`
  MODIFY `employeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

-- AUTO_INCREMENT for table `InvoiceItems`
ALTER TABLE `InvoiceItems`
  MODIFY `invoiceItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

-- AUTO_INCREMENT for table `Invoices`
ALTER TABLE `Invoices`
  MODIFY `invoiceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

-- AUTO_INCREMENT for table `Items`
ALTER TABLE `Items`
  MODIFY `itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

-- AUTO_INCREMENT for table `Roles`
ALTER TABLE `Roles`
  MODIFY `roleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- --------------------------------------------------------

-- Constraints for table `Employees`.
-- When a role is deleted, associated employees will have their role ID set to NULL.
ALTER TABLE `Employees`
  ADD CONSTRAINT `fk_Employees_Roles1` FOREIGN KEY (`roleID`) REFERENCES `Roles` (`roleID`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- Constraints for table `InvoiceItems`.
-- When an invoice is deleted, associated invoice items will also be deleted.
-- When an item is deleted, associated invoice items will also be deleted.
ALTER TABLE `InvoiceItems`
  ADD CONSTRAINT `fk_Items_has_Invoices_Invoices1` FOREIGN KEY (`invoiceID`) REFERENCES `Invoices` (`invoiceID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Items_has_Invoices_Items1` FOREIGN KEY (`itemID`) REFERENCES `Items` (`itemID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- Constraints for table `Invoices`.
-- When a customer is deleted, associated invoices will have their customer ID set to NULL.
-- When an employee is deleted, associated invoices will have their employee ID set to NULL.
ALTER TABLE `Invoices`
  ADD CONSTRAINT `fk_Invoices_Customers1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Invoices_Employees1` FOREIGN KEY (`employeeID`) REFERENCES `Employees` (`employeeID`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- --------------------------------------------------------

-- Re-enable commits and foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
