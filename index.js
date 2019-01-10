require('dotenv').config();

const express = require('express');
const vehicleFinder = require('./server/vehicleFinder');

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));
app.use('/api/nearest', function (req, res, next) {
    vehicleFinder.findNearest().then(vehiclesData => {
        res.status(200).send(vehiclesData);
        next();
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))