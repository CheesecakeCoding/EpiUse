require("dotenv").config();
const { Sequelize, DataTypes, Model } = require("sequelize");
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
app.use(bodyParser.urlencoded());
app.use(cors());

class login_table extends Model {}
login_table.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    company: DataTypes.STRING,
    firstname: DataTypes.STRING,
    surname: DataTypes.STRING,
  },
  { sequelize, modelName: "login_table" },
);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    //login_.sync();\
    sequelize
      .getQueryInterface()
      .showAllSchemas()
      .then((tableObj) => {
        console.log("// Tables in database", "==========================");
        console.log(tableObj);
      })
      .catch((err) => {
        console.log("showAllSchemas ERROR", err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

//sequelize.model.login_table;

/*
app.get("/", (req, res) => {
  res.send("Hello World!");
});
*/

//xxx
//xxx Staging endpoint - remove for final deployment
app.get("/createTables", async (req, res) => {
  try {
    var [result, metadata] = await sequelize.query(` 
            create table login_table (
              username VARCHAR(150) PRIMARY KEY,
              password VARCHAR(255) not null,
              company VARCHAR(255),
              name VARCHAR(50) not null,
              surname VARCHAR(60) not null
            );
         
        `);
    res.json({ Status: "ok", message: `Successfully created tables` });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/insertTable", async (req, res) => {
  try {
    var [result, metadata] = await sequelize.query(` 
            insert into login_table (username, pass, company, firstname, surname)
            values ('mynhardt1234@gmail.com', '123', 'CompanyName', 'Kevin', 'Mynhardt');
        `);
    res.json({ Status: "ok", res: `${result}` });
    //console.log(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/TableCheck", async (req, res) => {
  try {
    var [result, metadata] = await sequelize.query(` 
            select * from login_table
        `);
    console.log(result);

    res.status(200).json({ res: `${result[0].username}` });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/DropTables", async (req, res) => {
  try {
    var [result, metadata] = await sequelize.query(` 
          DROP TABLE IF EXISTS public.login_tables;
          DROP TABLE IF EXISTS public.login_table;
        `);
    console.log(result);

    res.status(200).json({ message: `Succesfully dropped all tables` });
  } catch (err) {
    res.status(500).json({ error: err });
  }
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
  try {
    var { username, password, name, surname } = req.body;
    password = getHashAndSalt(username, password);
    var existingUser = await getUserInformation(username);
    if (existingUser.length != 0) {
      res.status(409).json({
        message: `Account using the email specified already exists`,
        login: false,
      });
      return;
    }
    var result = await login_table
      .create({
        username: `${username}`,
        password: `${password}`,
        firstname: `${name}`,
        surname: `${surname}`,
      })
      .then(
        res
          .status(201)
          .json({ message: `Added user successfully`, login: true }),
      );
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/login", async (req, res) => {
  var token = createToken();
  try {
    var { username, password } = req.body;

    password = getHashAndSalt(username, password);
    var result = await getUserInformation(username);
    console.log(`val: ${JSON.stringify(result)}`);
    if (result.hasOwnProperty("err")) {
      res.status(500).json({
        message: `Failed login: error with db`,
        login: false,
        err: result.err,
      });
      return;
    }
    if (result.length == 0) {
      res
        .status(404)
        .json({ message: `Failed login: username not found`, login: false });
      return;
    }
    console.log(`Return val: ${result[0].password}`);
    if (result[0].password != password) {
      res.status(200).json({
        message: `Failed login: username and password mismatch`,
        login: false,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err, path: "login" });
  }
});

/*
Just boiler plate for an endpoint :D
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
  try {
    var result = await login_table.findAll({
      where: { username: `${username}` },
    });
    //console.log(`length: ${result.length}`);
    //result = JSON.stringify(result);
    return JSON.stringify(result);
  } catch (err) {
    return { error: err, path: "getUserInformation" };
  }
}

function createToken() {
  //xxx Add session based tokens for better security
}

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
});
