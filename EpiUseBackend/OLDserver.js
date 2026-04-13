let express = require('express');
let cors = require('cors');
let pg = require('pg');
const {Pool} = pg;
const app = express();
const port = process.env.PORT || 5001;
const db = process.env.DATABASE_URL;
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.get("/health", async (req, res) => {

    try{
        const result = await pool.query('SELECT NOW();');
        res.json({Status: 'ok', time: result.rows[0].now});
    } catch (err){
        res.status(500).json({error: err.message})
    }
});


app.listen(port, () => {
    console.log('Server is running on http://localhost:'+port);
})