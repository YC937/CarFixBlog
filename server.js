const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const multer = require('multer');
const upload = multer({ dest: 'images/' });
const Image = require('./models/images');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })

};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.post('/profile', upload.single('image'), async (req, res) => {
  try {
    console.log('here is req.body', req.body);
    // console.log(req.file);

    const image = await Image.create(req.file);

    res.status(200).json(image);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }

});

app.get('/images/:id', async( req, res) => {
  try {
    const dbImageData = await Image.findOne({
      where: { id: req.params.id},
    });
    const imagePath = path.join(__dirname, 'images', dbImageData.filename);
    console.log(imagePath);
    res.sendFile(imagePath);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening: http://127.0.0.1:' + PORT));
});