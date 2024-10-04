const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers')
const helpers = require('./utils/helpers')
const sequelize = require('./config/connection')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//initialize express app 
const app = express()
const PORT = process.env.PORT || 3001;
//setting up the handlebars
const hbs = exphbs.create({helpers})
//configure the session
const sess = {
    secret: process.env.SECRET_KEY,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
}
//apply session middleware to the express app
app.use(session(sess))
//setting up handlebars as the template engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
//middleware to parse incoming json and url-encoded data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')))
//apply the routes to the express app
app.use(routes)

//sync the models to the database and start the server
sequelize.sync({force: false}).then(()=> {
    app.listen(PORT, ()=> console.log(`Now listening on http://localhost:${PORT}`))
})

