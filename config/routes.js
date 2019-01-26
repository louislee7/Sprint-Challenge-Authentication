const axios = require('axios');
//configuring server
const bcrypt = require('bcryptjs');
const knex = require('knex');
const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

const { authenticate, generateToken } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const newUser = req.body;
  if (newUser.username && newUser.password) {
    newUser.password = bcrypt.hashSync(newUser.password, 12);
    db('users').insert(newUser)
      .then(ids => {
        const id = ids[0];
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).send("Failed to register a new user.");
      })
  } else {
    res.status(400).send("Please provide a username and a password.")
  }
}

function login(req, res) {
  // implement user login
  const creds = req.body;
  db('users').where('username', creds.username)
    .then(user => {
      // console.log(user);
      if (user.length && bcrypt.compareSync(creds.password, user[0].password)) {
        const token = generateToken(creds.username);
        res.json({ token });
      } else {
        res.status(201).send("Invalid username or password");
      }
    })
    .catch(err => {
      res.status(500).send('Failed to log in');
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
