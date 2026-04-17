const basePath = "http://localhost:5000";

const api = {
  get: (endpoint, body) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "GET",
      body: body && JSON.stringify(body),
    }).then((data) => data.json()),
  post: (endpoint, body) => {
    fetch(`${basePath}/${endpoint}`, {
      method: "POST",
      body: body && JSON.stringify(body),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  },
  put: (endpoint, body) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "PUT",
      body: body && JSON.stringify(body),
    }),
  delete: (endpoint, body) =>
    fetch(`${basePath}/${endpoint}`, {
      method: "DELETE",
      body: body && JSON.stringify(body),
    }),
};

export { api };
