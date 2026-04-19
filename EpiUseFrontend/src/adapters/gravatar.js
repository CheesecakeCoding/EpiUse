const basePath = "https://api.gravatar.com/v3/profiles/";
/*const HEADER = {
  Authorization: `Bearer ${process.env.API_KEY}`,
};*/

export async function getGravatar(identifier, body) {
  try {
    var response = await fetch(`${basePath}/${identifier}`, {
      method: "get",
      body: body && JSON.stringify(body),
      //headers: new Headers(HEADER),
    });
    console.log(JSON.stringify(response));

    //res.json(response.data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
