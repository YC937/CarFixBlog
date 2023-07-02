const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const multer = require('multer');
const upload = multer({ dest: 'images/' });
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.post('/profile', upload.single('image'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening: http://127.0.0.1:' + PORT));
});