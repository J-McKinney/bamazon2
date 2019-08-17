// var Table = require("cli-table");

// var table = new Table({
//     chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
//            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
//            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
//            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
//   });

//   table.push(
//       ['foo', 'bar', 'baz']
//     , ['frob', 'bar', 'quuz']
//   );

//   console.log(table.toString());
// Outputs:
//
//╔══════╤═════╤══════╗
//║ foo  │ bar │ baz  ║
//╟──────┼─────┼──────╢
//║ frob │ bar │ quuz ║
//╚══════╧═════╧═══ ═ ══╝

var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");
require('dotenv').config();
var myPassword = process.env.PASSWORD;
var table = new Table({
    chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
        , 'right': '║', 'right-mid': '╢', 'middle': '│'
    }
});

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

function productDisplay() {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error;
        console.log("\t|,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,|");
        console.log("\t|_______________Manager-Account-Information_______________|")
        console.log("\t|,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,.~''~.,|");
        for (var i = 0; i < response.length; i++) {
              console.log("\nID#: " + response[i].item_id + " || " + "Product: " + response[i].product_name + " || " + "Department: " + response[i].department_name + " || " + "Price: " + response[i].price + " || " + "Quantity: " + response[i].stock_quantity);
        }
    });
};

productDisplay();

  // node bamazonSupervisor.js