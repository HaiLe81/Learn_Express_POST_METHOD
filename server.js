// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

var listTodo = [
  { title: "Đi chợ" },
  { title: "Nấu cơm" },
  { title: "Rửa bát" },
  { title: "Học code tại codersX" },
  { title: "Ngắm gái xinh Huflit" }
]

app.set('view engine', 'pug')
app.set('views', './views')

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.pug
app.get("/", (request, response) => {
  response.render("index.pug");
});

app.get("/todos", (request, response) => {
  response.render('todos.pug', {
    todos: listTodo
  })
});

app.get("/todos/search", (request, response) => {
  var valueSearch = '';
  var q = request.query.q;
  valueSearch = q;
  var matchedTodos = listTodo.filter(item => {
    return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  response.render('todos.pug', {
    todos: matchedTodos,
    value: valueSearch
  })
});

app.get("/todos/create", (request, response) => {
  response.render('create.pug')
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

app.post("/todos/create", (req, res) => {
  listTodo.push({
    title: req.body.todo
  })
  res.redirect('/todos')
  console.log('response.body', req.body.todo)
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
