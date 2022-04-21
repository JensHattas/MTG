import axios from "axios";

const express = require('express');
const app = express();
const ejs= require('ejs'); // EJS import
app.set('port',3000);

app.set('view engine', 'ejs'); // EJS als view engine

app.get('/',async (request:any, response:any)=>{
    response.render('index.ejs');
})



app.listen(app.get('port'), ()=>console.log( '[server] http://localhost:' + app.get('port')));