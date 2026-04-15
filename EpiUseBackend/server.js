require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
const crypto = require("crypto");
const hash = crypto.createHash("sha256");
/*var bodyParser = require('body-parser');
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));*/
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const raw = require('body-parser/raw')
const app = express();
//app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(cors());

//app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 3000;

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  //logging: (err) => {console.log(err)},
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//   model schema
const post = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

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
              pass VARCHAR(255) not null,
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
            insert into login_table (username, pass, company, name, surname)
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
            select * from login_table;
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
            DO $$ 
            DECLARE 
                r RECORD;
            BEGIN 
                FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
                    EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
                END LOOP; 
            END $$;
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
    password = getHashAndSalt(password, name, surname);
    //xxx Do exsitance check
    /*var [count, rows] = await sequelize.findAndCountAll({where: {username}});
      if (result.row[0].username != username)*/
    var [result, metadata] = await sequelize
      .query(
        ` 
          insert into login_table (username, pass, name, surname)
          values (:user, :pass, :n, :s);
      `,
        {
          replacements: {
            user: username,
            pass: password,
            n: name,
            s: surname,
          },
          type: sequelize.QueryTypes.INSERT,
        },
      )
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
  try {
    var { username, password } = req.body;
    password = getHashAndSalt(username, password);
    //xxx --where username = ${username}
    var result = await sequelize.query(` 
      select password, company from login_table 
    `);
    //xxx Do check for username existence
    if (result.length == 0) {
      res
        .status(200)
        .json({ message: `Failed login: username not found`, login: false });
    }
    if (result[0].password != password) {
      res
        .status(200)
        .json({
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
  hash.update(`${username}${password}${username}`);
  return hash.digest("hex");
}

function getUserInformation(username) {
  try {
    var result = sequelize.query(` 
      select * from login_table where username = ${username};
    `);
    return result[0];
  } catch (err) {
    res.status(500).json({ error: err, path: "login" });
  }
}

function createToken() {
  //xxx Add session based tokens for better security
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
