
const { MongoClient, ServerApiVersion } = require('mongodb');
let express = require('express');
let cors = require('cors');
require("dotenv").config();
const pg = require('pg');
const PORT = process.env.PORT || 5001;
const app = express();
const URI  =  process.env.DATABASE_URL;
//const DB_STRING = process.env.DATABASE_URL;
app.use(cors());
app.use(express.json());

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
//await client.connect();

app.get("/health", async (req, res) => {
    var INT = 2;
    //console.log(req);
    try{
        await client.connect();
        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        var THE_RES = await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        res.json({Status: 'ok', time: `${THE_RES}`});
        await client.close();

    } catch (err){
        res.status(500).json({error: err.message, int: INT})

    }
});

app.get("/createStagingData", async (req, res) => {
    try{
        await client.connect();
        let dbo = client.db("EpiUSEAssessment");
        dbo.createCollection("customers", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            res.status(500).json({msg: "Collection created!"})
            client.close();
        });
        /*let myobj = [
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"},
            { name: "", surname: "", birthdate: new Date("1990-01-01"), employeeID: 1, salary: 1, role: "", managerID: "", department: "", company: "TestCompany"}
        ];*/
        //await client.close();

    } catch (err){
        res.status(500).json({error: err.message, int: 1})
    }
});

app.get("/read", async (req, res) => {
    var INT = 2;
    console.log(req);
    try{
        await client.connect();
        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        var THE_RES = await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        res.json({Status: 'ok', time: `${THE_RES}`});
        await client.close();

    } catch (err){
        res.status(500).json({error: err.message, int: INT})

    }
});

app.get("/update", async (req, res) => {
    var INT = 2;
    console.log(req);
    try{
        await client.connect();
        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        var THE_RES = await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        res.json({Status: 'ok', time: `${THE_RES}`});
        await client.close();

    } catch (err){
        res.status(500).json({error: err.message, int: INT})

    }
});

app.get("/delete", async (req, res) => {
    var INT = 2;
    console.log(req);
    try{
        await client.connect();
        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        var THE_RES = await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        res.json({Status: 'ok', time: `${THE_RES}`});
        await client.close();

    } catch (err){
        res.status(500).json({error: err.message, int: INT})

    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    /*console.log(`DB STRINGS MATCHING: ${DB_STRING == URI} `)
    console.log(`URI: ${URI} `)
    console.log(`DB_STRING: ${DB_STRING} `)*/
})