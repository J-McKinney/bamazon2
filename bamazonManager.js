var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");
require('dotenv').config();
var myPassword = process.env.PASSWORD;

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: myPassword,
    database: "bamazon2db"
});

connection.connect(function (error) {
    if (error) throw error;
    productDisplay();
})

function managerPrompt() {
    inquirer.prompt([{
        type: "list",
        name: "todos",
        message: "What course of action would you like to take?",
        choices: ["Display Products", "Display Low Inventory", "Add to Inventory", "Add a New Product/s", "Quit All"]
    }]).then(function (answer) {
        switch (answer.todos) {
            case "Display Products": productDisplay();
                break;
            case "Display Low Inventory": lowInventory();
                break;
            case "Add to Inventory": addInventory();
                break;
            case "Add a New Product/s": addProduct();
                break;
            case "Quit All": console.log("Good-Bye...");
        }
    });
};

function productDisplay() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        console.log("\t╔═════════════════════════════════════════════════════════╗");
        console.log("\t║,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,║");
        console.log("\t║---------------Manager Account Information---------------║");
        console.log("\t║,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,║");
        console.log("\t╚═════════════════════════════════════════════════════════╝\n");
        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Quantity"],
            colWidths: [10, 30, 30, 30, 30]
        });
        for (var i = 0; i < response.length; i++) {
            displayTable.push(
                [response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        managerPrompt();
    });
};

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5 ORDER BY stock_quantity DESC", (error, response) => {
        if (response.length > 0) {
            console.log("\t╔═════════════════════════════════════════════════════════╗");
            console.log("\t║-------------------Low Inventory Items-------------------║");
            console.log("\t╚═════════════════════════════════════════════════════════╝\n");
            var lowTable = new Table({
                head: ["Item ID", "Product Name", "Price", "Stock Quantity"],
                colWidths: [10, 30, 30, 30]
            });
            for (var i = 0; i < response.length; i++) {
                lowTable.push([response[i].item_id, response[i].product_name, response[i].price, response[i].stock_quantity]);
            }
            console.log(lowTable.toString());
        } else {
            console.log("\t╔═════════════════════════════════════════════════════════╗");
            console.log("\t║------------No Low Inventory Items to Display------------║");
            console.log("\t╚═════════════════════════════════════════════════════════╝\n");
        }
        productDisplay();
    });
};

function addInventory() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Please enter the item ID number you would like to stock inventory on to."
        }, {
            name: "addStock",
            type: "input",
            message: "How much stock would you like to add to this item?"
        }
    ]).then(function (addedInventory) {
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: addedInventory.addStock
        }, {
            item_id: addedInventory.item_id
        }], function (error, response) {
        });
        productDisplay();
    });
};

function addProduct() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter the item name of the new product."
        }, {
            name: "department",
            type: "input",
            message: "Please enter which department name of which the new product belongs."
        }, {
            name: "price",
            type: "input",
            message: "Please enter the price of the new product (0.00)."
        }, {
            name: "stock",
            type: "input",
            message: "Please enter the stock quantity of the new product."
        }
    ]).then(function (res) {
        var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('"+res.name+"', '"+res.department+"', "+res.price+", "+res.stock+")";
        console.log(sql);
        connection.query(sql, function (error, response) {
            if (error) throw error;
            console.log("item added")
        });
        productDisplay();
    });
};

// node bamazonManager.js