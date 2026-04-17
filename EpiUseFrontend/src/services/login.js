import { api } from "../adapters/api";

export const login = async function (formdata) {
  if (formdata != undefined) {
    var username = formdata.get("LoginUsername");
    var password = formdata.get("LoginPassword");
    console.log(`name: ${username}`);
    console.log(`password: ${password}`);
    console.log(`all: ${formdata}`);
    var BODY = { username: `${username}`, password: `${password}` };
    var ret = await api
      .post("login", BODY)
      .then((response) => response.json())
      .then((data) => console.log(data));

    console.log(ret);
  }
};

export const login_ = (formdata) => {
  var username = formdata.get("LoginUsername");
  var password = formdata.get("LoginPassword");

  var BODY = { username: `${username}`, password: `${password}` };
  var data = api.post("login", BODY);
  //.then((data) => console.log(data));
  //console.log(data);
};

/*function login(formdata) {
  const username = formdata.get("loginUsername");
  const password = formdata.get("loginPassword");
}*/
