'use strict';
var util = require('util')
var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

var manager_options = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
        filter: function (val) {
            return val.toLowerCase().split(' ').join('_');
        }
    },
]

var new_product_values = [
    {
        type: 'input',
        name: 'product_name',
        message: 'insert product name',
        validate: function (value) {
            var valid = util.isString(value)
            return valid || "Please enter a string"
        },
        filter: function (val) {
            return val.charAt(0).toUpperCase() + val.slice(1)
        }
    },
    {
        type: 'input',
        name: 'department_name',
        message: 'insert department name',
        validate: function (value) {
            var valid = util.isString(value)
            return valid || "Please enter a string"
        },
        filter: function (val) {
            return val.charAt(0).toUpperCase() + val.slice(1)
        }
    },
    {
        type: 'input',
        name: 'price',
        message: 'insert price',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value)) && (value < 100000000);
            return valid || 'Please enter a valid number';
        }
    },
    {
        type: 'input',
        name: 'stock_quantity',
        message: 'insert stock quantity',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value)) && (value < 100000000);
            return valid || 'Please enter a valid number';
        }
    }
]

var exit_bamazon = [
    {
        type: 'confirm',
        name: 'exit_bamazon',
        message: 'Would you like to exit Bamazon?',
        default: false,
    }
]

var restock = [
    {
        type: 'input',
        name: 'item_id',
        message: "Please select the item ID",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value)) && (value < 11);
            return valid || 'Please enter a valid number';
        }
    },
    {
        type: 'input',
        name: 'quantity',
        message: "Please select the quantity you want",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        }
    }]

connection.connect();

function manager_prompt() {
    inquirer.prompt(manager_options).then(answers => {
        if (answers.options === 'view_products_for_sale') {
            view_products()
        } else if (answers.options === 'view_low_inventory') {
            view_low_inventory()
        } else if (answers.options === 'add_to_inventory') {
            add_to_inventory()
        } else if (answers.options === 'add_new_product') {
            add_new_product()
        } else if (answers.options === 'exit') {
            exit()
        }


    });
}

function view_products() {
    connection.query('SELECT * FROM product_view', function (error, results, fields) {
        if (error) throw error;
        console.log("//////////////////////////////////////////////////////////////////////////////////////////////////")
        console.log("Welcome to Bamazon! Please select your items")
        console.log("==================================================================================================")
        results.forEach(element => {
            console.log("ID: " + element.item_id + "  ||" + "Name: " + element.product_name +
                "||" + "Department: " + element.department_name + "||" + "Price: " + element.price +
                "||" + "QTY: " + element.stock_quantity)
            console.log("==================================================================================================")
        });
        manager_prompt()
    });
};

function view_low_inventory() {
    connection.query('SELECT * FROM product_view WHERE stock_quantity < 5', function (error, results, fields) {
        if (error) throw error;
        console.log("//////////////////////////////////////////////////////////////////////////////////////////////////")
        console.log("Here are the low inventory items")
        console.log("==================================================================================================")
        results.forEach(element => {
            console.log("ID: " + element.item_id + "  ||" + "Name: " + element.product_name +
                "||" + "Department: " + element.department_name + "||" + "Price: " + element.price +
                "||" + "QTY: " + element.stock_quantity)
            console.log("==================================================================================================")
        });
        manager_prompt()
    });
}

function add_to_inventory() {
    inquirer.prompt(restock).then(answers => {
        var restock_item = parseInt(answers.item_id)
        var restock_quantity = parseInt(answers.quantity)
        connection.query('SELECT * FROM product_view WHERE item_id = ' + restock_item, function (error, results, fields) {
            if (error) throw error;
            var new_stock = results[0].stock_quantity + restock_quantity
            connection.query('UPDATE product_view SET stock_quantity =' + new_stock + ' WHERE item_id =' + restock_item, function (error, results, fields) {
                if (error) throw error;
                console.log('Item has been restocked')
                manager_prompt()
            });
        });
    });
}

function add_new_product() {
    inquirer.prompt(new_product_values).then(answers => {
        connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity)` +
            ` VALUES ('${answers.product_name}', '${answers.department_name}', '${answers.price}', '${answers.stock_quantity}')`, function (error, results, fields) {
                if (error) throw error;
                console.log('Item has been added')
                manager_prompt()
            });
    });
}

function exit() {
    inquirer.prompt(exit_bamazon).then(answers => {
        if (answers.exit_bamazon === true) {
            connection.end(function (err) {
                //connection ends
            })
            process.exitCode = 1;
        } else {
            manager_prompt()
        }
    })
}

manager_prompt()

