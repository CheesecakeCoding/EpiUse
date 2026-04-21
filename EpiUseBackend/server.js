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

app.post("/hierarchy", async (req, res) => {
  try {
    var { username, companyID } = req.body;
    if (!canViewHierarchy()) {
      res.status(201).json({
        message: `User ${username} does not have access`,
        data: [],
        error: true,
      });
    }
    companyID = await createCompanyID(username);
    var qry = `WITH RECURSIVE cte AS
      (
        SELECT employeeID, name, 1 as LEVEL, department, role, concat(name, " ", surname) as PATH FROM employees WHERE managerID IS NULL and companyID = '${companyID}'
        UNION ALL
        SELECT c.employeeID, c.name, cte.LEVEL + 1 as LEVEL, c.department, c.role, concat(cte.PATH, " -> ",c.name, " ", c.surname) FROM employees c JOIN cte
        ON cte.employeeID=c.managerID 
      )
      SELECT name, level, department, role, PATH FROM cte order by department, level asc;`;
    //console.log(qry);
    var result = await pool.query(qry);

    console.log(JSON.stringify(result[0]));
    res.status(200).json({
      message: `Query executed successfully`,
      data: result[0],
      error: false,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, path: "/hierarchy" });
  }
});

app.post("/employeeTable", async (req, res) => {
  try {
    ////console.log(req.body);
    var { username, companyID } = req.body;
    if (!canViewHierarchy()) {
      res.status(201).json({
        message: `User ${username} does not have access`,
        data: [],
        error: true,
      });
    }
    companyID = createCompanyID(username);
    var qry = `
      select * from employees where companyID = '${companyID}'`;
    ////console.log(qry);
    var result = await pool.query(qry);
    res.status(200).json({
      message: `Query executed successfully`,
      data: result[0],
      qry: { qry },
    });
  } catch (err) {
    res.status(500).json({ error: err.message, path: "/employeeTable" });
  }
});

app.post("/employee/create", async (req, res) => {
  try {
    //////console.log(req.body);
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
    companyID = await createCompanyID(companyID);
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
    var existingUser = await getEmployeeInformation(username, companyID);
    // ////console.log(`${JSON.stringify(existingUser[0])}`);
    // ////console.log(`${existingUser == undefined || existingUser == ""}`);
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
    ////console.log(qry);
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
      employeeID,
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
    var managered = true;
    if (
      managerID === undefined ||
      managerID === "" ||
      managerID === null ||
      managerID === "null"
    ) {
      managered = false;
      managerMsg = "No manager to assign";
      managerID = null;
    }
    if (!isValidManager(employeeID, managerID)) {
      managerID = null;
      managered = false;
      managerMsg = "No manager assigend (Invalid manager)";
    }
    var existingUser = await getEmployeeInformation(username);
    if (existingUser.length == 0) {
      res.status(200).json({
        managered: managered,
        message: `Username ('${username}') could not be found to update`,
        updated: false,
        managerMsg: "",
      });
      return;
    }
    var qry = `UPDATE employees SET 
        name = '${firstname}',
        surname = '${surname}',
        salary = ${salary},
        role = '${role}',
        managerID = '${managerID}',
        department = '${department}'
      WHERE email = '${username}'
      limit 1;`;
    ////console.log(qry);
    var ret = await pool.query(qry);

    res.status(201).json({
      message: `Updated employee successfully`,
      updated: true,
      managerMSG: `${managerMsg}`,
      managered: managered,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      path: "/employee/update",
      updated: false,
      managerMsg: "",
      managered: false,
    });
  }
});

app.post("/employee/delete", async (req, res) => {
  try {
    var { username, employeeID } = req.body;
    var qry = `DELETE FROM employees where email = '${username}' and employeeID = '${employeeID}' limit 1`;
    //console.log(qry);
    var ret = pool.query(qry);
    res.status(201).json({
      message: `Deleted employee successfully`,
      deleted: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "/employee/delete", deleted: false });
  }
});

app.post("/createUser", async (req, res) => {
  try {
    ////console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.name;
    var surname = req.body.surname;
    var qry = "";
    var existingUser = await getUserInformation(username);
    var ret = [{ username: "", password: "", firstname: "", surname: "" }];
    //////console.log(`before if `);
    //////console.log(`existingUser: ${existingUser}`);
    //////console.log(`len: ${JSON.stringify(existingUser)}`);
    //////console.log(`username: ${existingUser.username}`);
    if (!(existingUser.username === null)) {
      ////console.log(`in if`);
      res.status(409).json({
        message: `Account already associated with '${username}'`,
        registered: false,
      });
      return;
    }
    password = getHashAndSalt(username, password);
    var compID = await createCompanyID(username);
    qry = `INSERT INTO login_table(username, password, firstname, surname, companyID) VALUES ('${username}','${password}','${firstname}', '${surname}', '${compID}');`;

    ret = await pool.query(qry);

    //console.log(ret[0]);
    ////console.log(`createUser ${JSON.stringify(ret[0])}`);
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
  ////console.log(`Entry for login`);

  var token = createToken();
  //xxx Check token and return if mismatch
  try {
    var { username, password } = req.body;
    //console.log(req.body);
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
    //console.log(``);
    if (result.username == null) {
      res
        .status(404)
        .json({ message: `Failed login: username not found`, login: false });
      return;
    }
    var hash_new = crypto.createHash("sha256");
    hash_new.update(`${username}`);
    hash_new = hash_new.digest("hex");
    if (String(result.password) === String(password)) {
      res.status(200).json({
        message: `Login Successful`,
        login: true,
        data: result,
        sha: hash_new,
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
    //console.log(`emp: ${emp}`);
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
    var ret = await getRoles(companyID);
    res.status(201).json({
      message: `Completed role call successfully`,
      roles: ret[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, path: "/role/get", roles: [] });
  }
});

//--- Helper funcitons
function getHashAndSalt(username, password) {
  ////console.log(`Hash and Salt entry`);
  var hash_new = crypto.createHash("sha256");
  hash_new.update(`${username}${password}`);
  ////console.log(`Hash and Salt exit`);
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
  ////console.log(`username: ${username}`);
  try {
    var qry = `SELECT * from login_table where username='${username}';`;
    ////console.log(qry);
    var resp = await pool.query(qry);
    resp = resp[0];
    ////console.log(`res: '${JSON.stringify(resp[0])}'`);
    ////console.log(`resp: ${Object.getOwnPropertyNames(resp)}`);
    ////console.log(`resp: ${JSON.stringify(resp)}`);
    ////console.log(`resp: ${resp._results}`);
    ////console.log("getUserInformation before if");
    if (resp === undefined || resp == "") {
      ////console.log("getUserInformation if");
      resp = res;
    }
    ////console.log(`getUserInformation '${resp}'`);
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
    //console.log(`getEmployeeInformation ${JSON.stringify(res[0])}`);
    return res[0];
  } catch (err) {
    return { error: err.message, path: "getUserInformation" };
  }
}

function createToken() {
  //xxx Add session based tokens for better security
}

async function isValidManager(employeeID, managerID) {
  var TO_RET = false;
  console.log(
    `employeeID: ${employeeID} \n managerID: ${managerID} \n ${employeeID != managerID}`,
  );
  if (employeeID != managerID) {
    TO_RET = true;
  }

  return TO_RET;
}

async function createEmployeeID(username, companyID) {
  var first = getSubString(username);
  var res = await pool.query(
    `SELECT count(*) as num from employees where employeeID like '${first}%'`,
  );
  var number = 1;
  if (res.length > 0) {
    number = res.length + 1;
  }
  var str = `${first}${number}`;

  str = pad(str);
  return str;
}

function getSubString(the_string) {
  if (the_string.length >= 4) {
    return the_string.substring(0, 4);
  } else {
    return pad(the_string, 4);
  }
}

function pad(the_string, count) {
  the_string = `0${the_string}`;
  if (the_string.length < count) {
    the_string = pad(the_string, count);
  }
  return the_string;
}

async function createCompanyID(username, company) {
  //var code = String.replace(username, " ");
  code = getSubString(username);
  code = pad(code, 4);
  var res = await pool.query(
    `SELECT * from employees where companyID like '${code}%'`,
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

  //console.log(tables);
}
async function createLoginTable() {
  try {
    pool.query(` 
      CREATE TABLE IF NOT EXISTS login_table (
        username VARCHAR(150) PRIMARY KEY,
        password VARCHAR(64) not null,
        companyID VARCHAR(9) not null,
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
          companyID VARCHAR(9) not null,
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
       roleID INT AUTO_INCREMENT,
        role VARCHAR(50) not null,
        companyID VARCHAR(9) not null,
        PRIMARY KEY(roleID)
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

function canViewHierarchy(username) {
  //xxx Stub
  return true;
}

try {
  app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
  //dropAllTables();
  createTables();
} catch (err) {
  console.log(err.message);
}
