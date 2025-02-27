require('dotenv').config()
const express = require('express');
const session = require('express-session');
const app = express();
const routes = require('./routes');
const port = 3000;

app.use(session({
    secret: 'meu segredo',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));

app.set('views', './src/view')
app.set('view engine', 'ejs')

app.use(routes);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log(process.env.TESTE)
})