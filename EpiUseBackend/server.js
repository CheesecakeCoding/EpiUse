require("dotenv").config();
//require("dotenv").config({ path: ".env.new" });
const { Sequelize, DataTypes, Model } = require("sequelize");
const crypto = require("crypto");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    insecureAuth: true,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

module.exports = pool;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/createTables", async (req, res) => {
  try {
    await createTables();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/employee/create", async (req, res) => {
  try {
    //console.log(req.body);
    var {
      username,
      firstname,
      surname,
      birthdate,
      salary,
      role,
      managerID,
      department,
      companyID,
    } = req.body;
    var managerMsg = "Assigned Manager successfully";

    if (
      !(
        managerID === undefined ||
        managerID === "" ||
        managerID === null ||
        managerID === "null"
      )
    ) {
      managerMsg = "No manager to assign";
      if (isValidManager(username, managerID)) {
        managerID = null;
        managerMsg = "No manager assigend (Invalid manager)";
      }
    }
    var existingUser = await getEmployeeInformation(username);
    console.log(`${JSON.stringify(existingUser[0])}`);
    console.log(`${existingUser == undefined || existingUser == ""}`);
    if (!(existingUser == "")) {
      res.status(200).json({
        message: `Username ('${username}') alreaddy an employee at ${companyID}`,
        updated: false,
      });
      return;
    }
    var employeeID = await createEmployeeID(firstname, companyID);
    var qry = `
      INSERT INTO employees (name, surname, alias, birthdate, employeeID, salary,role, managerID, department, companyID, email, isActive, startDate, terminationDate) 
      VALUES  ('${firstname}', '${surname}', null ,'${birthdate}', '${employeeID}',${salary}, '${role}', null, '${department}', '${companyID}', '${username}', false, now(), null)
    `;
    console.log(qry);
    var ret = await pool.query(qry);

    res.status(201).json({
      message: `Created employee successfully`,
      created: true,
      managerMSG: `${managerMsg}`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "/employee/create", created: false });
  }
});

app.post("/employee/update", async (req, res) => {
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

    var ret = await pool.query(`
      UPDATE employees SET 
        firstname = '${firstname}',
        surname = '${surname}
        birthdate = '${birthdate},
        salary = '${salary},
        role = '${role},
        managerID = '${managerID}
        department = '${department}
      WHERE username = '${username}'
    `);

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
  try {
    var { username } = req.body;
    var ret = pool.query(
      `DELETE FROM employees where username = '${username}'`,
    );
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
  try {
    //console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.name;
    var surname = req.body.surname;
    var qry = "";
    var existingUser = await getUserInformation(username);
    var ret = [{ username: "", password: "", firstname: "", surname: "" }];
    //console.log(`before if `);
    //console.log(`existingUser: ${existingUser}`);
    console.log(`len: ${JSON.stringify(existingUser)}`);
    console.log(`username: ${existingUser.username}`);
    if (!(existingUser.username === null)) {
      //console.log(`in if`);
      res.status(409).json({
        message: `Account already associated with '${username}'`,
        registered: false,
      });
      return;
    }
    //console.log(`after if`);
    password = getHashAndSalt(username, password);
    qry = `INSERT INTO login_table(username, password, firstname, surname) VALUES ('${username}','${password}','${firstname}', '${surname}');`;

    //console.log(`before pool`);
    ret = await pool.query(qry);
    //console.log(ret[0]);
    //console.log(`createUser ${JSON.stringify(ret[0])}`);
    if ((ret.affectedRows = 1))
      res.status(201).json({
        message: `Added user successfully`,
        registered: true,
      });
    else {
      res.status(200).json({
        message: `Something unknown went wrong`,
        registered: false,
      });
    }

    /*.then(
        res
          .status(201)
          .json({ message: `Added user successfully`, registered: true }),
      );*/
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  //console.log(`Entry for login`);
  res.status(200).json({
    message: `Login Successful`,
    login: true,
  });
  return;

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
    if (result[0].username == null) {
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

app.get("/employee/get", async (req, res) => {
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
  try {
    var { name, company } = req.body;
    var roleID = createRoleID(username, company);
    var result = await pool.query(
      `INSERT INTO roles(name, roleID, companyID) VALUES ('${name}','${roleID}','${company}')`,
    );
    var ret = await pool.query(
      `SELECT * FROM roles where companyID = '${company}'`,
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "role/create", created: false });
  }
});

app.post("/role/delete", async (req, res) => {
  try {
    var { companyID, roleID } = req.body;
    var ret = await pool.query(
      `delete from roles where companyID = '${companyID}' and roleID = '${roleID}'`,
    );
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
  try {
    var { companyID } = req.body;
    ge;
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

//--- Helper funcitons
function getHashAndSalt(username, password) {
  //console.log(`Hash and Salt entry`);
  var hash_new = crypto.createHash("sha256");
  hash_new.update(`${username}${password}`);
  //console.log(`Hash and Salt exit`);
  return hash_new.digest("hex");
}

async function getUserInformation(username) {
  var res = [
    {
      username: null,
      passwword: "",
      company: null,
      firstname: "",
      surname: "",
    },
  ];
  //console.log(`username: ${username}`);
  try {
    var qry = `SELECT * from login_table where username='${username}';`;
    //console.log(qry);
    var resp = await pool.query(qry);
    resp = resp[0];
    //console.log(`res: '${JSON.stringify(resp[0])}'`);
    //console.log(`resp: ${Object.getOwnPropertyNames(resp)}`);
    //console.log(`resp: ${JSON.stringify(resp)}`);
    //console.log(`resp: ${resp._results}`);
    //console.log("getUserInformation before if");
    if (resp === undefined || resp == "") {
      //console.log("getUserInformation if");
      resp = res;
    }
    //console.log(`getUserInformation '${resp}'`);
    return resp[0];
  } catch (err) {
    return { error: err.message, path: "getUserInformation" };
  }
}

async function getEmployeeInformation(username) {
  try {
    var res = await pool.query(
      `SELECT * from employees where email='${username}'`,
    );
    console.log(`getEmployeeInformation ${JSON.stringify(res[0])}`);
    return res[0];
  } catch (err) {
    return { error: err.message, path: "getUserInformation" };
  }
}

function createToken() {
  //xxx Add session based tokens for better security
}

async function isValidManager(username, managerID) {
  var TO_RET = false;

  return TO_RET;
}

async function createEmployeeID(username, companyID) {
  var first = getSubString(username);
  var res = await pool.query(
    `SELECT count(*) as num from employees where employeeID like '${first}%'`,
  );
  var number = 1;
  if (res.length > 0) {
    number = res[0].num + 1;
  }
  return `${first}${pad(String(number))}`;
}

function getSubString(the_string) {
  if (the_string.length >= 4) {
    return text.substring(1, 4);
  } else {
    return pad(the_string, 4);
  }
}

function pad(the_string, count) {
  the_string = `0${the_string}`;
  if (the_string.length < count) {
    the_string = padd(the_string, count);
  }
  return the_string;
}

async function createCompanyID(username, company) {
  var code = String.replace(company, " ");
  code = pad(CommandFailedEvent, 4);
  var res = await pool.query(
    `SELECT * from companies where companyID like '${code}%'`,
  );
  return `${code}${pad(res.length, 4)}`;
}

async function createRoleID(username, companyID) {
  var res = await pool.query(
    `SELECT * from roles where companyID = '${companyID}'`,
  );
  return res.length;
}

async function getRoles(companyID) {
  var ret = await pool.query(
    `SELECT * from roles where companyID = '${companyID}'`,
  );
  return ret;
}

async function getEmployees(companyID) {
  var rowNue;
  var res = await pool.query(
    `SELECT * from employees where companyID = '${companyID}'`,
  );
  return res;
}

async function canViewEmployee(username) {
  //xxx STUB, come back to actually code
  return true;
}

async function createTables() {
  var tables = [];
  tables[0] = await createLoginTable();
  tables[1] = await createEmployeesTable();
  tables[2] = await createRolesTable();

  console.log(tables);
}
async function createLoginTable() {
  try {
    pool.query(` 
      CREATE TABLE IF NOT EXISTS login_table (
        username VARCHAR(150) PRIMARY KEY,
        password VARCHAR(64) not null,
        company VARCHAR(255),
        firstname VARCHAR(50) not null,
        surname VARCHAR(60) not null
      );
      `);
    return { created: true, message: "", table: "login_table" };
  } catch (err) {
    return { created: false, message: err.message, table: "login_table" };
  }
}

async function createEmployeesTable() {
  try {
    pool.query(` 
      CREATE TABLE IF NOT EXISTS employees (
          name VARCHAR(50) not null,
          surname VARCHAR(60) not null,
          alias VARCHAR(50),
          birthdate DATE not null,
          employeeID VARCHAR(9) not null,
          salary double CHECK (salary > 0),
          role VARCHAR(50),
          managerID VARCHAR(9),
          department VARCHAR(50),
          companyID VARCHAR(15) not null,
          email VARCHAR(150) not null,
          isActive boolean,
          startDate date not null,
          terminationDate date
        );
      `);
    return { created: true, message: "", table: "employees" };
  } catch (err) {
    return { created: false, message: err.message, table: "employees" };
  }
}

async function createRolesTable() {
  try {
    pool.query(` 
      CREATE TABLE IF NOT EXISTS roles (
        role VARCHAR(50) not null,
        company VARCHAR(60) not null,
        roleID VARCHAR(9) not null
      );
    `);
    return { created: true, message: "", table: "roles" };
  } catch (err) {
    return { created: false, message: err.message, table: "roles" };
  }
}

async function dropAllTables() {
  pool.query(` 
      DROP TABLE IF EXISTS employees;
      DROP TABLE IF EXISTS roles; `);
}

try {
  app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
  //dropAllTables();
  createTables();
} catch (err) {
  console.log(err.message);
}
