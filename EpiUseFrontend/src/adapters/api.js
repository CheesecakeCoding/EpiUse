//const basePath = "http://localhost:5000";

const basePath = "https://epiuse-production.up.railway.app";

const HEADER = { "Content-Type": "application/json" };

export async function get(endpoint, body) {
  var response = await fetch(`${basePath}/${endpoint}`, {
    method: "GET",
    body: body && JSON.stringify(body),
    headers: new Headers(HEADER),
  });
  var body = await response.json();
  return body;
}

export async function post(endpoint, body) {
  var response = await fetch(`${basePath}/${endpoint}`, {
    method: "POST",
    body: body && JSON.stringify(body),
    headers: new Headers(HEADER),
  });
  var body = await response.json();
  return body;
}

export async function put(endpoint, body) {
  var response = fetch(`${basePath}/${endpoint}`, {
    method: "PUT",
    body: body && JSON.stringify(body),
    headers: new Headers(HEADER),
  });
  var body = await response.json();
  return body;
}

export async function deleteReq(endpoint, body) {
  var response = fetch(`${basePath}/${endpoint}`, {
    method: "DELETE",
    body: body && JSON.stringify(body),
    headers: new Headers(HEADER),
  });
  var body = await response.json();
  return body;
}

/*.then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });*/
