// REMEMBER to turn off server (localhost:3000) BEFORE running the test
//------ only applies to Sarah. (maybe)
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const express = require("express");

const csrfProtection = csrf({cookie: true});

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.set("view engine", "pug");

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

//increment the id
function incrementId(usersArray) {
  let highest = 1;
  for (user in usersArray) {
    if (user.id > highest) {
      highest = user.id;
    }
  }
}

//HOME
app.get("/", (req, res) => {
  res.render("index", { users }); // SAME AS ----- users: users
  // 2nd "users" is the one in the pug file (index.pug)
  // res.send("Hello World!");
});

//CREATE FORM
app.get("/create", csrfProtection, (req, res) => {
  const errors = [];

  res.render("form", { errors: errors, csrfToken: req.csrfToken()});
});

//SUBMIT FORM
app.post("/create", csrfProtection, (req, res) => {
  const errors = [];
  const {
    firstName,
    lastName,
    password,
    confirmedPassword,
    age,
    email
  } = req.body;



  if (!firstName) {
    errors.push("Please provide a first name.");
  }
  if (!lastName) {
    errors.push("Please provide a last name.");
  }
  if (!email) {
    errors.push("Please provide an email.");
  }
  if (!password) {
    errors.push("Please provide a password.");
  } else if(password !== confirmedPassword) {
    errors.push("The provided values for the password and password confirmation fields did not match.")
  }
  if (!errors.length) {
    const newUser = {id: incrementId(), firstName, lastName, age, email}
    users.push(newUser);
  }

    res.render("form", { errors: errors, csrfToken: req.csrfToken(), firstName, lastName, age, email});

})

// const port = process.env.PORT || 3000; // process.env.PORT ---- not introduced yet.
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
