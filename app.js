const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000
const { resolve } = require('path');


app.set('views', resolve('./views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render("home");

})

app.get('/registro',(req,res)=>{
    res.render("registro");

})
app.get('/login',(req,res)=>{
    res.render("login");

})


app.listen(3000,function(){
    console.log('Ok');
})

