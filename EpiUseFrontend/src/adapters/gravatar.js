const basePath = "https://api.gravatar.com/v3/profiles";
const HEADER = {
  Authorization: `Bearer 8579:gk-Mrq49flw4yZ7ToXB0HOJul-txYdbW0ituXjn74BIYCPjMGEu6BSZHdsWXMkeV`,
};

export async function getGravatar(identifier, body) {
  try {
    //console.log(`${basePath}/${identifier}`);
    var response = await fetch(`${basePath}/${identifier}`, {
      method: "get",
      body: body && JSON.stringify(body),
      headers: new Headers(HEADER),
    });

    //console.log(`${response.data}`);
    //console.log(JSON.stringify(response));
    response = await response.json();
    //console.log(`${JSON.stringify(response)}`);
    return response.avatar_url;
    //res.json(response.data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
