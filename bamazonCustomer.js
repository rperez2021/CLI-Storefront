'use strict';
var util = require("util");
// Did not implement use of cTable due to an error with it misfiring.
var cTable = require('console.table');
var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon_db'
});

var questions = [
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
    }];

var order_again = [
    {
        type: 'confirm',
        name: 'order_again',
        message: 'Would you like to place another order?',
        default: false,
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

connection.connect();


function initial_query() {
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        console.log(" ")
        console.log("//////////////////////////////////////////////////////////////////////////////////////////////////")
        console.log("Welcome to Bamazon! Please select your items")
        console.log("==================================================================================================")
        console.table(results)
        
        /* Ended Up not Needing this when I started using cTable
        results.forEach(element => {
            console.log("ID: " + element.item_id + "  ||" + "Name: " + element.product_name +
                "||" + "Department: " + element.department_name + "||" + "Price: " + element.price +
                "||" + "QTY: " + element.stock_quantity)
            console.log("==================================================================================================")
        });
        */
    });
    customer_prompt()

};

function customer_prompt() {
    inquirer.prompt(questions).then(answers => {
        var order_item = parseInt(answers.item_id)
        var order_quantity = parseInt(answers.quantity)
        console.log('\nYou Purchased: ' + order_quantity + ' of ' + order_item );
        connection.query('SELECT * FROM products WHERE item_id = ' + order_item, function (error, results, fields) {
            if (error) throw error;
            else if (results[0].stock_quantity - order_quantity < 0) {
                console.log("Not enough quantity in stock")
                customer_prompt()
            } else {
                //Update DB with stock Change
                var new_stock = results[0].stock_quantity - order_quantity
                var sale_total = results[0].price * order_quantity
                connection.query('UPDATE products SET stock_quantity =' + new_stock + ', product_sales=' + sale_total + ' WHERE item_id =' + order_item, function (error, results, fields) {
                    console.log('Thank you for your order')
                    another_order()
                });
            };
        });
    });
}

function another_order() {
    inquirer.prompt(order_again).then(answers => {
        if (answers.order_again === true) {
            initial_query()
        } else {
            console.log("Thank you for shopping with us!")
            exit()
        }
    })
}

function exit() {
    inquirer.prompt(exit_bamazon).then(answers => {
        if (answers.exit_bamazon === true) {
            connection.end(function (err) {
                //connection ends
            })
            process.exitCode = 1;
        } else {
            initial_query()
        }
    })
}

initial_query()
