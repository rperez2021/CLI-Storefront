'use strict';
var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

connection.connect();

connection.query('SELECT * FROM product_view', function (error, results, fields) {
    if (error) throw error;

    console.log("Welcome to Bamazon! Please select your items")
    console.log("==================================================================================================")
    results.forEach(element => {
        console.log("ID: " + element.item_id + "  ||" + "Name: " + element.product_name +
            "||" + "Department: " + element.department_name + "||" + "Price: " + element.price +
            "||" + "QTY: " + element.stock_quantity)
        console.log("==================================================================================================")
    });
});

var questions = [
    {
        type: 'input',
        name: 'item id',
        message: "Please select the item ID",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
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

    inquirer.prompt(questions).then(answers => {
        console.log('\nOrder receipt:');
        console.log(JSON.stringify(answers, null, '  '));
      });
