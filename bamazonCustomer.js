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
    database: "bamazondb"
});

function productDisplay() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        console.log("\nThis is Bamazon!");
        console.log("----------------");
        console.log("Here is what we have to offer...");
        console.log("\n--------------------------------");
        for (var i = 0; i < response.length; i++) {
            console.log("ID#: " + response[i].item_id + " || " + "Product: " + response[i].product_name + " || " + "Department: " + response[i].department_name + " || " + "Price: " + response[i].price + " || " + "Quantity: " + response[i].stock_quantity);
            console.log("\n--------------------------------------------------------------------------------------------");
        }
        startPrompt();
    });
};

function startPrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Would You Like To Buy Something?",
        default: true
    }]).then(function (user) {
        if (user.confirm === true) {
            pickID();
        } else {
            console.log("\nIf you change your mind, you know where to find us, ;)");
        }
    });
};

function pickID() {
    inquirer.prompt([{
        name: "inputID",
        type: "input",
        message: "Enter the Item ID Number of the item you want to purchase.",
        filter: Number
    }, {
        name: "inputQty",
        type: "input",
        message: "How many of these would you like to buy?",
        filter: Number

    }]).then(function (userPurchase) {
        connection.query("SELECT * FROM products WHERE item_id = ?", userPurchase.inputID, function (error, response) {
            for (var i = 0; i < response.length; i++) {
                if (userPurchase.inputQty > response[i].stock_quantity) {
                    console.log("\n-----------------------------------------------------------------------------------");
                    console.log("\nSorry, we do not have enough of that item, try again later...");
                    console.log("\n-----------------------------------------------------------------------------------");
                    restart();
                } else {
                    console.log("\n------------------------------------------------------------------------------------");
                    console.log("\nAwesome, we have just what you're looking for!");
                    console.log("\n-----------------------------------------------------------------------------------");
                    // var updateStock = JSON.stringify(response[i].stock_quantity - userPurchase.inputQty);
                    // var purchaseID = JSON.stringify(userPurchase.inputID);
                    confirmPurchase();
                }
            }
        })
    });
};

function confirmPurchase(updateStock, purchaseID) {
    inquirer.prompt([{
        name: "confirmBuy",
        type: "confirm",
        message: "Are you happy with this purchase and the amount?",
        default: true
    }]).then(function (userConfirm) {
        if (userConfirm.confirmBuy === true) {
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: updateStock
            }, {
                item_id: purchaseID
            }], function (error, response) { });
            console.log("\n-------------------------------------------------------------------------------------");
            console.log("\nThank you for shopping with us, you order will be shipped soon!");
            console.log("\n-------------------------------------------------------------------------------------");
        } else {
            console.log("\n-------------------------------------------------------------------------------------");
            console.log("\nThank you, come back soon...");
            console.log("\n-------------------------------------------------------------------------------------");
        }
        restart();
    });
};

function restart() {
    inquirer.prompt([{
        name: "restart",
        type: "confirm",
        message: "\nWould you like to look over our merchandise again?"
    }]).then(function (answer) {
        if (answer.restart) {
            productDisplay();
        } else {
            console.log("\n=====================================");
            console.log("\nThanks, hope to see you again soon...");
            console.log("\n=====================================");
        }
    });
};

productDisplay();


// node bamazonCustomer.js   ,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,