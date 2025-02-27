const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.render('./main.ejs');
});

routes.post('/', (req, res) => {
    req.session.name = req.body.name; //coloco o body.name em uma sessao 
    res.redirect('/admin')
});

routes.get('/admin', (req, res) => {
    const name = req.session.name
    res.render('./admin.ejs', { name });
})

module.exports = routes;