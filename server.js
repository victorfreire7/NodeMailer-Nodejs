require('dotenv').config()
const express = require('express');
const session = require('express-session');
const nodemailer = require('nodemailer');
const app = express();
const routes = require('./routes');
const port = 3000;

app.use(session({
    secret: 'meu segredo',
    resave: false,
    saveUninitialized: true
}));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
});

const mailOptions = {
    from: 'vhugo.freire159@gmail.com',
    to: 'vhugo.freire159@gmail.com',
    subject: 'Projeto nodemailer',
    text: 'olá, to usando nodemailer'
}

transporter.sendMail(mailOptions, function(err, data) {
    if(err) {
        console.log( err )
    } else {
        console.log("email enviado!")
    }
})

app.use(express.urlencoded({ extended: true }));

app.set('views', './src/view')
app.set('view engine', 'ejs')

app.use(routes);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})