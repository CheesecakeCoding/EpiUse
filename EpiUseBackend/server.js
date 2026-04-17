require("dotenv").config();
const { Sequelize, DataTypes, Model } = require("sequelize");
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

/*mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err.message));*/
//const mysql = require("mysql");
const sequelize = new Sequelize(process.env.DB_URL, {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
/*const con = mysql.createConnection({
  host: process.env.SQLHOST,
  user: process.env.SQLUSER,
  password: process.env.SQLPASS,
  port: process.env.SQLPORT,
});*/

app.use(bodyParser.json());
app.use(cors());

class login_table extends Model {}
login_table.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: DataTypes.STRING,
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { sequelize, modelName: "login_table", freezeTableName: true },
);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    //login_.sync();\
    sequelize
      .getQueryInterface()
      .showAllSchemas()
      .then(() => {
        login_table.sync();
      })
      .catch((err) => {
        console.log("showAllSchemas ERROR", err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

sequelize.model.login_table;

/*
app.get("/", (req, res) => {
  res.send("Hello World!");
});
*/

//xxx
//xxx Staging endpoint - remove for final deployment
app.get("/createTables", async (req, res) => {
  /*try {
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
  }*/
});

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
  try {
    var [result, metadata] = await sequelize.query(` 
          DROP TABLE IF EXISTS public.login_tables;
          DROP TABLE IF EXISTS public.login_table;
        `);
    console.log(result);

    res.status(200).json({ message: `Succesfully dropped all tables` });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  console.log("Ëntry for createUser");
  try {
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.name;
    var surname = req.body.surname;

    password = getHashAndSalt(username, password);
    var existingUser = await getUserInformation(username);
    // console.log("CreateUser after getuserinformation");
    /*if (existingUser.hasOwnProperty("error")) {
      throw result.error;
    }*/
    //console.log(JSON.stringify(existingUser));
    if (
      existingUser.length != 0 &&
      !(existingUser[0].username === "null") &&
      !(existingUser[0].username === null)
    ) {
      res.status(409).json({
        message: `Account already associated with '${username}'`,
        registered: false,
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
          .json({ message: `Added user successfully`, registered: true }),
      );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  //console.log(`Entry for login`);
  var token = createToken();
  //xxx Check token and return if mismatch
  try {
    var { username, password } = req.body;

    password = getHashAndSalt(username, password);
    var result = await getUserInformation(username);
    if (result.hasOwnProperty("error")) {
      res.status(500).json({
        message: `Failed login: error with db`,
        login: false,
        error: result.error,
      });
      return;
    }
    if (result.length == 0) {
      res
        .status(404)
        .json({ message: `Failed login: username not found`, login: false });
      return;
    }
    if (String(result[0].password) === String(password)) {
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
    res.status(500).json({ error: err.message, path: "login" });
  }
});

/*Just boiler plate for an endpoint :D
app.get("/endpoint", async(req, res) => {
  try{
    
      
  } catch (err) {
    res.status(500).json({error: err.message, path: 'endpoint'});
  }
})
*/

app.get("/checkdb", async (req, res) => {
  var resp = getUserInformation("");
  res.status(200).json({
    message: `DB CHECK`,
    res: { resp },
  });
});

function getHashAndSalt(username, password) {
  //console.log(`Hash and Salt entry`);
  var hash_new = crypto.createHash("sha256");
  hash_new.update(`${username}${password}`);
  //console.log(`Hash and Salt exit`);
  return hash_new.digest("hex");
}

async function getUserInformation(username) {
  try {
    var result = await login_table.findAll({
      attributes: ["username", "password"],
      where: { username: `${username}` },
    });

    //console.log(`EH: ${JSON.stringify(result)}`);

    //console.log(result[0].password);

    return result;
  } catch (err) {
    return { error: err.message, path: "getUserInformation" };
  }
}

function createToken() {
  //xxx Add session based tokens for better security
}

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
});
