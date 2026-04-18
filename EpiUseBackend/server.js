require("dotenv").config();
const { Sequelize, DataTypes, Model } = require("sequelize");
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
//const mysql = require("mysql2");
//const db_url = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_PRIVATE_DOMAIN}:3306/${process.env.MYSQL_DATABASE}`;
//const connection = mysql.createConnection(db_url);

/*{
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
} */

app.use(bodyParser.json());
app.use(cors());

app.get("/TableCheck", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var ret = await sequelize.getQueryInterface().showAllTables();
    console.log(JSON.stringify(ret));
    res.status(200).json(ret);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/DropTables", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var [result, metadata] = await sequelize.query(` 
          DROP TABLE IF EXISTS public.login_table;
          DROP TABLE IF EXISTS public.employees;
          DROP TABLE IF EXISTS public.roles;
          DROP TABLE IF EXISTS public.companies;
        `);
    console.log(result);

    res.json({ Status: "ok", res: `deleted tables successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
app.post("/createUser", async (req, res) => {
  //console.log("Ëntry for createUser");
  try {
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.name;

    var existingUser = await getUserInformation(username);
    // console.log("CreateUser after getuserinformation");
   
    //console.log(JSON.stringify(existingUser));
    if (
      existingUser.length != 0 &&
      !(existingUser[0].username === "null") &&
      !(existingUser[0].username === null)
    ) {
      res.status(200).json({
        message: `Account already associated with '${username}'`,
        registered: false,
      });
      return;
    }
    password = getHashAndSalt(username, password);
    var result = await login_table
      .create({
        username: username,
        password: password,
        firstname: firstname,
      })
      .then(
        res
          .status(201)
          .json({ message: `Added user successfully`, registered: true }),
      );
  } catch (err) {
    res.status(500).json({ message: err.message, registered: false });
  }
});*/

app.post("/login", async (req, res) => {
  res.status(200).json({});
  return;
  //console.log(`Entry for login`);
  var token = createToken();
  //xxx Check token and return if mismatch
  try {
    var { username, password } = req.body;

    password = getHashAndSalt(username, password);
    var result = await getUserInformation(username);
    //console.log(`login res: ${JSON.stringify(result)}`);
    if (result.hasOwnProperty("error")) {
      res.status(500).json({
        message: `Failed login: error with db`,
        login: false,
        error: result.error,
      });
      return;
    }
    if (result.length == 0) {
      res
        .status(404)
        .json({ message: `Failed login: username not found`, login: false });
      return;
    }
    if (String(result[0].password) === String(password)) {
      res.status(200).json({
        message: `Login Successful`,
        login: true,
      });
      return;
    }
    res.status(200).json({
      message: `Failed login: username and password mismatch`,
      login: false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, login: false, path: "login" });
  }
});

app.post("/company/create", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var { username, companyName } = req.body;
    var cmpID = createCompanyID(username, companyName);
    var result = await companies
      .create({
        username: username,
        companyName: companyName,
        companyID: cmpID,
      })
      .then(
        res.status(201).json({
          message: `Added company successfully`,
          created: true,
        }),
      );
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "company/create", created: false });
  }
});

app.post("/employee/create", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var {
      username,
      firstname,
      surname,
      id,
      salary,
      role,
      managerID,
      department,
      companyID,
    } = req.body;
    var managerMsg = "Assigned Manager successfully";

    if (
      managerID === undefined ||
      managerID === "" ||
      managerID === null ||
      managerID === "null"
    ) {
      managerMsg = "No manager to assign";
      if (isValidManager(username, managerID)) {
        managerID = null;
        managerMsg = "No manager assigend (Invalid manager)";
      }
    }
    var existingUser = await getEmployeeInformation(username);
    if (existingUser.length != 0) {
      res.status(200).json({
        message: `Username ('${username}') assigned to existing employee`,
        created: false,
      });
      return;
    }
    var employeeID = createEmployeeID(username, companyID);
    var result = await employees
      .create({
        username: username,
        firstname: firstname,
        surname: surname,
        id: id,
        salary: salary,
        role: role,
        managerID: managerID,
        department: department,
        companyID: companyID,
        employeeID: employeeID,
      })
      .then(
        res.status(201).json({
          message: `Added employee successfully`,
          created: true,
          managerMSG: `${managerMsg}`,
        }),
      );
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "employee/create", created: false });
  }
});

app.post("/employee/update", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var {
      username,
      firstname,
      surname,
      id,
      salary,
      role,
      managerID,
      department,
    } = req.body;
    var managerMsg = "Assigned Manager successfully";

    if (
      managerID === undefined ||
      managerID === "" ||
      managerID === null ||
      managerID === "null"
    ) {
      managerMsg = "No manager to assign";
      if (isValidManager(username, managerID)) {
        managerID = null;
        managerMsg = "No manager assigend (Invalid manager)";
      }
    }
    var existingUser = await getEmployeeInformation(username);
    if (existingUser.length == 0) {
      res.status(200).json({
        message: `Username ('${username}') could not be found to update`,
        updated: false,
      });
      return;
    }
    existingUser.firstname = firstname;
    existingUser.surname = surname;
    existingUser.birthdate = birthdate;
    existingUser.salary = salary;
    existingUser.role = role;
    existingUser.managerID = managerID;
    existingUser.department = department;
    await existingUser.save();
    res.status(201).json({
      message: `Updated employee successfully`,
      created: true,
      managerMSG: `${managerMsg}`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "/employee/update", created: false });
  }
});

app.post("/employee/delete", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var { username } = req.body;
    var ret = employees.destroy({ where: { username: `${username}` } });
    res.status(201).json({
      message: `Deleted employee successfully`,
      deleted: true,
      managerMSG: `${managerMsg}`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "/employee/delete", deleted: false });
  }
});

app.post("/createUser", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.name;
    var surname = req.body.surname;

    password = getHashAndSalt(username, password);
    var existingUser = await getUserInformation(username);
    // console.log("CreateUser after getuserinformation");
    /*if (existingUser.hasOwnProperty("error")) {
      throw result.error;
    }*/
    //console.log(JSON.stringify(existingUser));
    if (
      existingUser.length != 0 &&
      !(existingUser[0].username === "null") &&
      !(existingUser[0].username === null)
    ) {
      res.status(409).json({
        message: `Account already associated with '${username}'`,
        registered: false,
      });
      return;
    }
    var result = await login_table
      .create({
        username: username,
        password: password,
        firstname: firstname,
        surname: surname,
      })
      .then(
        res
          .status(201)
          .json({ message: `Added user successfully`, registered: true }),
      );
  } catch (err) {
    res.status(500).json({ message: err.message, registered: false });
  }
});

app.get("/employee/get", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var { username, companyID } = req.body;
    if (canViewEmployee(username)) {
    }
    var emp = await getEmployees(companyID);
    console.log(`emp: ${emp}`);
    //var emp = await getEmployeeInformation(username);
    res.status(201).json({
      message: `Call success`,
      employees: JSON.stringify(emp),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "/employee/get", employees: [] });
  }
});

app.post("/role/create", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var { name, company } = req.body;
    var roleID = createRoleID(username, company);
    var result = await roles
      .create({
        name: name,
        roleID: roleID,
        company: company,
      })
      .then(
        res.status(201).json({
          message: `Added role successfully`,
          created: true,
        }),
      );
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "role/create", created: false });
  }
});

app.post("/role/delete", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var { companyID, roleID } = req.body;
    var ret = roles.destroy({
      where: { companyID: companyID, roleID: roleID },
    });
    res.status(201).json({
      message: `Deleted role successfully`,
      deleted: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "/role/delete", deleted: false });
  }
});

app.get("/role/get", async (req, res) => {
  res.status(200).json({});
  return;
  try {
    var { companyID } = req.body;
    var ret = getRoles(companyID);
    res.status(201).json({
      message: `Completed role call successfully`,
      roles: ret,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "/role/get", roles: [] });
  }
});

/*Just boiler plate for an endpoint :D
app.get("/endpoint", async(req, res) => {
  try{
    
      
  } catch (err) {
    res.status(500).json({error: err.message, path: 'endpoint'});
  }
})
*/

//--- Helper funcitons
function getHashAndSalt(username, password) {
  //console.log(`Hash and Salt entry`);
  var hash_new = crypto.createHash("sha256");
  hash_new.update(`${username}${password}`);
  //console.log(`Hash and Salt exit`);
  return hash_new.digest("hex");
}

async function getUserInformation(username) {
  try {
    var result = await login_table.findAll({
      attributes: ["username", "password"],
      where: { username: `${username}` },
    });

    //console.log(`EH: ${JSON.stringify(result)}`);

    //console.log(result[0].password);

    return result;
  } catch (err) {
    return { error: err.message, path: "getUserInformation" };
  }
}

async function getEmployeeInformation(username) {
  try {
    var result = await employees.findAll({
      where: { username: `${username}` },
    });
    return result;
  } catch (err) {
    return { error: err.message, path: "getUserInformation" };
  }
}

function createToken() {
  //xxx Add session based tokens for better security
}

async function isValidManager(username, managerID) {
  var TO_RET = false;
  /*var QRY = `with EmployeeHierarchy as (
    SELECT 
  )`;*/
  var res = await employees.findAll({
    attributes: ["employeeID"],
    where: { username: `${username}` },
  });
  if (res.length > 0 && STRING(res[0].employeeID) != STRING(managerID)) {
    TO_RET = true;
  }
  return TO_RET;
}

async function createEmployeeID(username, companyID) {
  var res = await employees.findAll({
    where: { companyID: companyID },
  });
  return res.length;
}

async function createCompanyID(username, company) {
  var res = await companies.findAll({});
  return res.length;
}

async function createRoleID(username, companyID) {
  var res = await roles.findAll({ where: { companyID: companyID } });
  return res.length;
}

async function getRoles(companyID) {
  var ret = await roles.findAll({ where: { companyID: companyID } });
  return ret;
}

async function getEmployees(companyID) {
  //{ where: { companyID: companyID } }
  var ret = await employees.findAll();
  ret = await JSON.stringify(ret);
  return ret;
}

async function canViewEmployee(username) {
  //xxx STUB, come back to actually code
  return true;
}

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
});
