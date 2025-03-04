require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.render('./main.ejs');
});

routes.post('/', (req, res) => {

    req.session.mail = {
        para : req.body.para ,
        assunto : req.body.assunto ,
        texto : req.body.texto
    }


    res.redirect('/send')
});

routes.get('/send', (req, res) => {
    const ob = req.session.mail;

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
        from: 'noreplynodemailertest041@gmail.com',
        to: ob.para,
        subject: ob.assunto,
        text: ob.texto
    }

    transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            console.log( err )
        } else {
            console.log("email enviado!")
            res.redirect('/')
        }
    })
});

module.exports = routes;