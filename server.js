const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./config/connection");


// Main menu function
function start() {

    // Prompt user to choose an option
    inquirer.prompt({

      name: "mainMenu",
      type: "list",
      message: "MAIN MENU",
      choices: [
        "View all employees",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "View all roles",
        "Add role",
        "Remove role",
        "View all departments",
        "Add department",
        "Remove department",
        "Exit"
      ]
    }).then(function(answer) {

      switch(answer.mainMenu) {

        case 'View all employees':
          viewAllEmp();
          break;

        case 'Add employee':
          addEmp();
          break;

        case 'Remove employee':
          removeEmp();
          break;

        case 'Update employee role':
          updateEmpRole();
          break;

        case 'View all roles':
          viewAllRoles();
          break;

        case 'Add role':
          addRole();
          break;

        case 'Remove role':
          removeRole();
          break;

        case 'View all departments':
          viewAllDept();
          break;

        case 'Add department':
          addDept();
          break;

        case 'Remove department':
          removeDept();
          break;

        case 'Exit':
          connection.end();
          break;
      }
  });
};

function viewAllEmp() {
  var viewAllEmpQuery = "SELECT * FROM employees"

  connection.query(viewAllEmpQuery, function (err, res) {
      if (err) throw err;
      console.log(res.length + " employees found!");
      console.table(res);
      start();
  });
};

function addEmp() {
  var rolesArray = [];
  var addEmpQuery = "SELECT * FROM roles";

  connection.query(addEmpQuery, function (err, res) {
    for (var i =0; i < res.length; i++) {
      rolesArray.push(res[i].title);
    };
  
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },

      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
      },

      {
        name: "role",
        type: "list",
        choices: rolesArray,
        message: "What is the role of the employee?"
      }
    ]).then(function (answer) {
      var addEmpQuery2 = "INSERT INTO employees SET ?"; 
      connection.query(addEmpQuery2,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: null,
          manager_id: null
        },
        function(err, answer) {
          if (err) throw err;
          console.table(answer);
        }
      );
    });
  });
  start();
};

function removeEmp() {
  var employeesArray = [];
  var employeesQuery =  "SELECT employees.first_name, employees.last_name FROM employees";

  connection.query(employeesQuery, function (err, res) {
    for (var i = 0; i< res.length; i++) {
      employeesArray.push(res[i].first_name + " " + res[i].last_name);
    }
    inquirer.prompt([
      {
        name: "removeEmployee",
        type: "list",
        choices: employeesArray,
        message: "Which employee would you like to remove"
      },
    ]).then(function (res) {
      var employeesQuery2 = "DELETE FROM employees WHERE CONCAT(first_name, ' ', last_name) = '${res.removeEmployee}'";
      connection.query(employeesQuery2, function (err, res) {
        if (err) throw err;
        console.log("Employee has been removed from the system.");
      });
    });
  });
  start();
};

function updateEmpRole() {
  var employeesArray = [];
  var rolesArray = [];
  var updateEmpRoleQuery = "SELECT first_name, last_name FROM employees; SELECT title FROM roles";

  connection.query(updateEmpRoleQuery, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      employeesArray.push(res[i].first_name + " " + res[i].last_name);
    };

    for (var i = 0; i < res.length; i++) {
      rolesArray.push(res[i].title);
    };

    inquirer.prompt([
      {
        name: "employee",
        type: "list",
        choices: employeesArray,
        message: "Select the employee whose role you want to update."
      },

      {
        name: "newRole",
        type: "list",
        choices: rolesArray
      }
    ]).then(function (answer) {
      var updateEmpRoleQuery2 = 
      "UPDATE employees SET role_id = (SELECT id FROM roles WHERE title = ?) WHERE id = (SELECT id FROM(SELECT id FROM employees WHERE CONCAT(first_name, ' ',last_name) = ?))";

      connection.query(updateEmpRoleQuery2, [answer.newRole, answer.employee], function (err, res) {
        if (err) throw err;
      });
    });
  });
  start();
};

function viewAllRoles() {
  var viewAllRolesQuery = "SELECT * From roles";
  
  connection.query(viewAllRolesQuery, function (err, res) {
    if (err) throw err;
    console.log(" ");
    console.table("All the roles: ", res);
  });
  start();
};

function addRole() {
  var addRoleQuery = "SELECT * FROM departments";

  connection.query(addRoleQuery, function (err, res) {
    var deptArray = [];
    for (var i = 0; i < res.length; i++) {
      deptArray.push(res[i].name);
    };

    inquirer.prompt([
      {
        name: "newTitle",
        type: "input",
        message: "Enter the title of the new role: "
      },

      {
        name: "newSalary",
        type: "input",
        message: "Enter the salary of the new title: "
      },

      {
        name: "deptList",
        type: "list",
        choices: deptArray,
        message: "Select the department for the new title:"
      }
    ]).then(function (answer) {
      var addRoleQuery2 = "INSERT INTO roles SET ?";

      connection.query(addRoleQuery2, {title: answer.newTitle, salary: answer.newSalary, department_id: answer.deptList}, function (err, res) {
        if (err) throw err;
        console.table(res)
      });
    });
  });
  start();
};

function removeRole() {
  var removeRoleQuery = "SELECT * FROM roles";

  connection.query(removeRoleQuery, function (err, res) {
    var rolesArray = [];
    for (var i = 0; i < res.length; i++) {
      rolesArray.push(res[i].title);
    };

    inquirer.prompt([
      {
        name: "removeRole",
        type: "list",
        choices: rolesArray,
        message: "Select the role you would like to remove: "
      }
    ]).then(function (answer) {
      var removeRoleQuery2 = "DELETE FROM roles WHERE ?";

      connection.query(removeRoleQuery2, {title: answer.removeRole});
    });
  });
  start();
};

function viewAllDept() {
  var viewAllDeptQuery = "SELECT * FROM departments";

  connection.query(viewAllDeptQuery, function (err, res) {
    if (err) throw err;
    console.table("All the departments: ", res);
  });
  start();
};

function addDept() {
  inquirer.prompt([
    {
      name: "addDept",
      type: "list",
      message: "Enter the name of the department you'd like to add."
    }
  ]).then(function (answer) {
    var addDeptQuery = "INSERT INTO departments SET ?";
    var addDeptQuery2 = "SELECT * FROM departments";

    connection.query(addDeptQuery, {name: answer.addDept});
    connection.query(addDeptQuery2, function (err, res) {
      if (err) throw err;
      console.table("All the departments: ", res);
    });
  });
  start();
};

function removeDept() {
  var removeDeptQuery = "SELECT * FROM departments";

  connection.query(removeDeptQuery, function (err, res) {
    var deptArray = [];
    for (var i = 0; i < res.length; i++) {
      deptArray.push(res[i].name);
    }

    inquirer.prompt([
      {
        name: "dept",
        type: "list",
        choices: deptArray,
        message: "Select the department you want to remove: "
      }
    ]).then(function (answer) {
      var removeDeptQuery2 = "DELETE FROM departments WHERE ?";

      connection.query(removeDeptQuery2, {name: answer.dept});
    });
  });
  start();
};


start();