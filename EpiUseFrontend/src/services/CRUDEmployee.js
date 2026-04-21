import { post, get } from "../adapters/api.js";

export const createEmployee = async function (formdata) {
  if (formdata != undefined) {
    var username = formdata.get("username");
    var firstname = formdata.get("firstname");
    var surname = formdata.get("surname");
    var birthdate = formdata.get("birthdate");
    var salar = formdata.get("salary");
    var role = formdata.get("role");
    var managerID = formdata.get("managerID");
    var department = formdata.get("department");
    var companyID = formdata.get("companyID");
    var BODY = {
      username: `${username}`,
      firstname: `${firstname}`,
      surname: `${surname}`,
      birthdate: `${birthdate}`,
      salary: salar,
      role: `${role}`,
      managerID: `${managerID}`,
      department: `${department}`,
      companyID: `${companyID}`,
    };
    var data = await post("employee/create", BODY);
    //console.log(data);
    return data;
  }
};

export const updateEmployees = async function (formdata) {
  if (formdata != undefined) {
    var username = formdata.get("username");
    var firstname = formdata.get("firstname");
    var surname = formdata.get("surname");
    var birthdate = formdata.get("birthdate");
    var salar = formdata.get("salary");
    var role = formdata.get("role");
    var managerID = formdata.get("managerID");
    var department = formdata.get("department");
    var employeeID = formdata.get("employeeID");
    var BODY = {
      username: `${username}`,
      firstname: `${firstname}`,
      surname: `${surname}`,
      birthdate: `${birthdate}`,
      salary: salar,
      role: `${role}`,
      managerID: `${managerID}`,
      department: `${department}`,
      employeeID: `${employeeID}`,
    };
    var data = await post("employee/update", BODY);
    return data;
  }
};

export const deleteEmployees = async function (formdata) {
  if (formdata != undefined) {
    var employeeID = formdata.get("employeeID");
    var username = formdata.get("username");

    var BODY = {
      employeeID: `${employeeID}`,
      username: `${username}`,
    };
    console.log(JSON.stringify(BODY));
    var data = await post("employee/delete", BODY);
    return data;
  }
};

export const getEmployees = async function (username, companyID) {
  var BODY = {
    username: `${username}`,
    companyID: `${companyID}`,
  };
  var data = await post("employeeTable", BODY);
  //console.log(data);
  return data;
};

export const getHierarchy = async function (username, companyID) {
  var BODY = {
    username: `${username}`,
    companyID: `${companyID}`,
  };
  var data = await post("hierarchy", BODY);
  //console.log(data);
  return data;
};
