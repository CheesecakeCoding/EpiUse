import { post } from "../adapters/api.js";

export const register = async function (formdata) {
  if (formdata != undefined) {
    var username = formdata.get("RegisterUsername");
    var password = formdata.get("RegisterPassword");
    var firstname = formdata.get("RegisterName");
    var lastname = formdata.get("RegisterSurname");
    var BODY = {
      username: `${username}`,
      password: `${password}`,
      firstname: `${firstname}`,
      lastname: `${lastname}`,
    };
    var data = await post("createUser", BODY);
    return data;
  }
};
