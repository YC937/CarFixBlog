const { User } = require('../models');

const userData =
[
  {
    "username": "leonis",
    "password": "admin12345"
  },
  {
    "username": "saladtini",
    "password": "password12345"
  },
  {
    "username": "zaconium",
    "password": "zacPW1234"
  },
  {
    "username": "amiChopsticks",
    "password": "password12345"
  },
  {
    "username": "DallioHax",
    "password": "dHaxer9519"
  }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;