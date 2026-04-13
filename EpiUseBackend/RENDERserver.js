
let express = require('express');
let cors = require('cors');
require("dotenv").config();
const pg = require('pg');
const PORT = process.env.PORT || 5001;
const app = express();
const connString = "postgresql://epiuse_user:9MoGP7MSSUlYp5i8maskboHActBX67GZ@dpg-d7dak00sfn5c7387i7ng-a.oregon-postgres.render.com/epiuseassessmentdb";//process.env.DATABASE_URL;
app.use(cors());
app.use(express.json());

/*
PGHOST=cluster0.5vo8nws.mongodb.net
PGUSER=epiuse_user
PGPASSWORD=Epi98050451
PGDATABASE=epipuse_db_user
PGPORT=5432
*/

const pool = new pg.Pool({
    connString,
    keepAlive: true,
    query_timeout: 3000000,
    ssl: true,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

const client = new pg.Client({
    connString,
    keepAlive: true,
    query_timeout: 3000000,
    ssl: true,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    /*host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    keepAlive: true,*/
});

//export default pool;


app.get("/health", async (req, res) => {
    var INT = 2;
    try{
        /*const result = await pool.query('SELECT NOW()');
        res.json({Status: 'ok', time: result.rows[0].now});*/
        INT = INT + 1;
        await pool.connect();
        INT = INT + 1;
        var result = await pool.query('SELECT NOW()');
        INT = INT + 1;
        await pool.end();
        INT = INT + 1;
        res.json({Status: 'ok', time: "result.rows[0].now"});
        INT = INT + 1;
    } catch (err){
        res.status(500).json({error: err, int: INT})

    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    //console.log(`DB STRING: ${DB_STRING} `)
})