// we will place configuration and connection to database here
const Pool = require("pg").Pool;
const pool = new Pool({
user:"postgres",
password: "114645",
host: "localhost",
port : 5432,
database: "" ,

})


module.exports = pool