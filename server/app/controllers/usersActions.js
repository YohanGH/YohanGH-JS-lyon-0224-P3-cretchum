// Import access to database tables
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.users.readAll();

    // Respond with the users in JSON format
    res.status(200).json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const users = await tables.users.read(req.params.id);

      // Réponse avec les données de l'utilisateur
  
// Permet l'envoi de cookies
    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the users in JSON format
    if (users == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the user data from the request body and params
  const users = { ...req.body, id: req.params.id };

  try {
    // Update the user in the database
    await tables.users.update(users);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const user = req.body;
  try {
    // Hachage password
    // Set the number of rounds to generate the salt used in the hash
    const saltRounds = 10;

    // Hide user password with bcrypt and number of saltRounds
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    // Replace plaintext password with hashed password
    user.password = hashedPassword;

    // Insert the user into the database
    const insertId = await tables.users.create(user);

    delete req.body.password;

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });

  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the user from the database

    await tables.users.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const checkLog = async (req, res, next) => {
  // Retrieve user email and password from HTTP request body
  const { mail, password } = req.body;
  try {
    // Retrieve user information from the database according to email address
    const user = await tables.users.login(mail);

    // Check that the user exists and that the password is correct
    if (user && await bcrypt.compare(password, user.password)) {
      let hasAnimals = true;
      if (user.users_id === null) {
        hasAnimals = false;
      }

      // Generate JWT token
      const token = jwt.sign(
        { sub: user.id, hasAnimals },
        process.env.APP_SECRET,
        { expiresIn: '1h' }
      );

      // Remove password from request body
      delete req.body.password;

      // const userResponse = { id: user.id, hasAnimals };

      // Set the token in cookie
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.set('Access-Control-Allow-Credentials', 'true');
      res.cookie("cookie", token, { httpOnly: true });
      res.status(200).json();

    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
};




// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  checkLog,
};
