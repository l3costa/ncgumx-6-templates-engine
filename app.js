const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const engine = require('express-handlebars');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    const url = req.url;
    res.status(404).render('404', { pageTitle: '404', urlRequested: url });
});

app.listen(3000);
