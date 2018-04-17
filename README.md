# CLI-Storefront
Command Line Storefront with Different User Access Apps built with MySQL and Node.js

## App Modules
``` 
node bamazonCustomer.js
node bamazonManager.js
node bamazonSupervisor.js
```


### Customer Module (bamazonCustomer.js)
This module allows the user to select an item from an inventory list displayed on the console through the use of inquirer.js by inputting an item id number and an order quantity.

The inventory database is updated and the user has the option of placing an additional order or exiting the system which closes the connection to the DB and closes the app. 

### Manager Module (bamazonManager.js)
This module allows gives access to the user to four functions:

 * View Products for Sale
 * View Low Inventory Products
 * Replenish the Inventory
 * Add a New Product

### Supervisor Module (bamazonSupervisor.js)
This module allows gives the user access to view product sales data and to create new departments. 

## Demo Video

## NPM Modules
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [MySQL](https://www.npmjs.com/package/mysql)
* [Console Table](https://www.npmjs.com/package/console.table)

:beer: