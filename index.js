// REMEMBER to turn off server (localhost:3000) BEFORE running the test
//------ only applies to Sarah. (maybe)

const express = require("express");

const app = express();

const csrf = require("csurf");

const csrfProtection = csrf({cookie: true})

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { users }); // SAME AS ----- users: users
  // 2nd "users" is the one in the pug file (index.pug)
  // res.send("Hello World!");
});


app.get("/create", (req, res) => {

  res.render("form");
});

// const port = process.env.PORT || 3000; // process.env.PORT ---- not introduced yet.
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
