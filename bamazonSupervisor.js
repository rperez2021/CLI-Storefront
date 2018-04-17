'use strict';
var util = require("util");
var cTable = require('console.table');
var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

var supervisor_options = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View Product Sales by Department', 'Create New Department', 'Exit'],
        filter: function (val) {
            return val.toLowerCase().split(' ').join('_');
        }
    },
]

var exit_bamazon = [
    {
        type: 'confirm',
        name: 'exit_bamazon',
        message: 'Would you like to exit Bamazon?',
        default: false,
    }
]

var new_department_values = [
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
        name: 'over_head_costs',
        message: 'insert overhead costs',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value)) && (value < 100000000);
            return valid || 'Please enter a valid number';
        }
    }
]

connection.connect();

function supervisor_prompt() {
    inquirer.prompt(supervisor_options).then(answers => {
        if (answers.options === 'view_product_sales_by_department') {
            view_product_sales()
        } else if (answers.options === 'create_new_department') {
            create_new_department()
        } else if (answers.options === 'exit') {
            exit()
        }
    });
}

function view_product_sales() {
    connection.query('SELECT departments.department_id, departments.department_name, ' + 
    'departments.over_head_costs, products.product_sales FROM products INNER JOIN ' + 
    'departments ON departments.department_id=products.item_id', function (error, results, fields) {
        if (error) throw error;
        // Added a For Each Loop to calc. profit and add it to the object so it displays on ctable
        results.forEach(element => {
            var totalprofit = element.product_sales - element.over_head_costs;
            element.total_profit = totalprofit
            return results
        })
        console.log("Here are the sales by department")
        console.log("==================================================================================================")
        console.table(results)
        supervisor_prompt()
    });
    
}

function create_new_department() {
    inquirer.prompt(new_department_values).then(answers => {
        connection.query(`INSERT INTO departments (department_name, over_head_costs)` +
            ` VALUES ('${answers.department_name}', '${answers.over_head_costs}')`, function (error, results, fields) {
                if (error) throw error;
                console.log('Department has been added')
                supervisor_prompt()
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
            supervisor_prompt()
        }
    })
}

supervisor_prompt()
