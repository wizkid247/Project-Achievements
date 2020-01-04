const express = require('express');
const app = express();
const port= 3000;
//Import
const yellRoute = require('./yellock');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/yellock',yellRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));