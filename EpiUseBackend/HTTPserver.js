const http = require('http');
require("dotenv").config();
const PORT = process.env.PORT || 5001;
const DB_STRING = process.env.DATABASE_URL;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({message: "We did it"}));
    res.end();
});

server.listen(PORT, ()=> {
    console.log(`Server started on port: ${PORT}`);
})