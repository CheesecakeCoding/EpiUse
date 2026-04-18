require("dotenv").config();
const { Sequelize, DataTypes, Model } = require("sequelize");
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const user_json = {
  name: "kevin",
  password: "83353fc5a8fdb345a327b9cd55d88302fc7daec0026bc432025e0eef6944e7de",
  unhashedpass: "123",
};

app.use(bodyParser.json());
app.use(cors());

//xxx Staging endpoint - remove for final deployment

app.get("/createTables", async (req, res) => {});

app.get("/insertTable", async (req, res) => {
  /*try {
    var [result, metadata] = await sequelize.query(` 
            insert into login_table (username, pass, company, firstname, surname)
            values ('mynhardt1234@gmail.com', '123', 'CompanyName', 'Kevin', 'Mynhardt');
        `);
    res.json({ Status: "ok", res: `${result}` });
    //console.log(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }*/
});

app.get("/TableCheck", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/DropTables", async (req, res) => {
  /*try {
    var [result, metadata] = await sequelize.query(` 
          DROP TABLE IF EXISTS public.login_tables;
          DROP TABLE IF EXISTS public.login_table;
        `);
    console.log(result);

    res.status(200).json({ message: `Succesfully dropped all tables` });
  } catch (err) {
    res.status(500).json({ error: err });
  }*/
});

/*app.post("/create-post", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await post.create({ title, content });
    res.json(newPost);
  } catch (err) {
    console.log(err);
  }
});

app.get("/get-posts", async (req, res) => {
  try {
    const allPosts = await post.findAll();
    res.json(allPosts);
  } catch (err) {
    console.log(err);
  }
});*/

app.post("/createUser", async (req, res) => {
  /*console.log("Ëntry for createUser");
  try {
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.name;
    var surname = req.body.surname;
    password = getHashAndSalt(username, password);
    console.log("CreateUser after gethashandsalt");
    var existingUser = await getUserInformation(username);
    console.log("CreateUser after getuserinformation");
    if (existingUser.hasOwnProperty("error")) {
      throw result.error;
    }
    //console.log(`existingUser: ${JSON.stringify(existingUser)}`);
    if (existingUser.length != 0) {
      res.status(409).json({
        message: `Account using the email specified already exists`,
        login: false,
      });
      return;
    }
    var result = await login_table
      .create({
        username: username,
        password: password,
        firstname: firstname,
        surname: surname,
      })
      .then(
        res
          .status(201)
          .json({ message: `Added user successfully`, login: true }),
      );
  } catch (err) {
    res.status(500).json({ error: err });
  }*/
});

app.post("/login", async (req, res) => {
  console.log(`REQ: ${req}`);
  var { username, password } = req.body;
  password = getHashAndSalt(username, password);
  console.log(`Password: ${password}`);

  try {
    //xxx change to db
    var result = user_json;
    console.log(`res: [${res}]`);
    if (result.hasOwnProperty("error")) {
      res.status(500).json({
        message: `Failed login: error with db`,
        login: false,
        error: result.error,
      });
      return;
    }
    //xxx Can remove 'or' when I've got db connected
    if (result.length == 0 || result.name != username) {
      res
        .status(404)
        .json({ message: `Failed login: username not found`, login: false });
      return;
    }
    if (result.hasOwnProperty("password") && result.password == password) {
      res.status(200).json({
        message: `Login Successful`,
        login: true,
      });
      return;
    }
    res.status(200).json({
      message: `Failed login: username and password mismatch`,
      login: false,
    });
  } catch (err) {
    res.status(500).json({ error: err, path: "login" });
  }
});

app.get("/employee/create", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ error: err, path: "/employee/create" });
  }
});

app.get("/employee/update", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ error: err, path: "/employee/update" });
  }
});

app.get("/employee/delete", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ error: err, path: "/employee/create" });
  }
});

/*Just boiler plate for an endpoint :D
app.get("/endpoint", async(req, res) => {
  try{
    
      
  } catch (err) {
    res.status(500).json({error: err, path: 'endpoint'});
  }
})
*/

app.get("/checkdb", async (req, res) => {});

function getHashAndSalt(username, password) {
  var hash_new = crypto.createHash("sha256");
  hash_new.update(`${username}${password}`);
  return hash_new.digest("hex");
}

async function getUserInformation(username) {
  return user_json;
}

function createToken() {
  //xxx Add session based tokens for better security
}

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
});
