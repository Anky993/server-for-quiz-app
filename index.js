const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const { MongoClient, ObjectID } = require('mongodb');
const temp = require('./routes.js/temp')
const config = require('./config/config')
const app = express();

app.use(cors());
app.use(express.json())

const monogconfig = config.DATABASE_CONFIG.url;

MongoClient.connect(monogconfig, { useUnifiedTopology: true })
    .then(db => {
        connection = db;
        console.log("connected");
    })
    .catch(err => console.error(err.stack))


app.get('/test', (req, res) => {
    res.json('I am working fine')
})

app.use('/api/temp', temp)


const PORT = process.env.PORT || config.PORT
app.listen(PORT, () => console.log(`Application running on PORT ${PORT} `))