import { post, get } from "../adapters/api.js";

export const login = async function (formdata) {
  if (formdata != undefined) {
    var username = formdata.get("LoginUsername");
    var password = formdata.get("LoginPassword");
    /*console.log(`name: ${username}`);
    console.log(`password: ${password}`);
    console.log(`all: ${formdata}`);*/
    var BODY = { username: `${username}`, password: `${password}` };
    var data = await post("login", BODY);
    //console.log(data);
    return data;
  }
};
