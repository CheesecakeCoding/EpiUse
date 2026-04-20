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

export const getEmployees = async function (username) {
  var BODY = {
    username: `${username}`,
  };
  var data = await post("employeeTable", BODY);
  //console.log(data);
  return data;
};
