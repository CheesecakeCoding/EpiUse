require("dotenv").config();
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/createTable", async (req, res) => {
    try{
        var [result, metadata] = await sequelize.query(` 
            create table login_table( 
                username VARCHAR (150), 
                pass VARCHAR(255), 
                company VARCHAR(255),
                name VARCHAR(50),
                surname VARCHAR (60)
            );
        `);
        res.json({Status: 'ok', res: `${result}`});
    } catch (err) {
        res.status(500).json({error: err});
    }
});

app.get("/insertTable", async (req, res) => {
    try{
        var [result, metadata] = await sequelize.query(` 
            insert into login_table (username, pass, company, name, surname)
            values ('mynhardt1234@gmail.com', '123', 'CompanyName', 'Kevin', 'Mynhardt');
        `);
        res.json({Status: 'ok', res: `${result}`});
        //console.log(result);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

app.get("/TableCheck", async (req, res) => {
    try{
        var [result, metadata] = await sequelize.query(` 
            select * from login_table;
        `);
        console.log(result);

        res.json({Status: 'ok', res: `${result[0].username}`});
    } catch (err) {
        res.status(500).json({error: err});
    }
});

app.post("/create-post", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});