const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./router/commonRouter")

const app = express();
const contextPath = '/api';

app.use(express.json());
app.use(contextPath + '/public', express.static('public'));
app.use(contextPath, routes);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Database Connection is ready.');
        app.listen(process.env.PORT, () => {
            console.log(`server is running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
