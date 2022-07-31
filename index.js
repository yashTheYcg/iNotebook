const express = require("express");
const connectToMongo = require('./db');
var cors = require('cors');
const dotenv = require('dotenv')

dotenv.config({ path: __dirname + '/config.env' });
const app = express();
const port = process.env.PORT || 8080;
connectToMongo();

app.use(cors());
app.use(express.json());

// Available Routes
app.use(require('./routes/auth'))
app.use(require('./routes/notes'))


// steps for heroku
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
})