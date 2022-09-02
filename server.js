const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// cors is cross origin resource sharing
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

app.options("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Length, X-Requested-With"
  );
  res.send(200);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(express.static('public'));
app.use(express.static('css'));

const timeRoutes = require("./routes/time")
const nameRoutes = require('./routes/name')
const jsonRoutes = require("./routes/json");
const echoAllRoutes = require("./routes/echo-all")


app.use("/routes/time", timeRoutes)
app.use("/routes/name", nameRoutes)
app.use("/routes/json", jsonRoutes)
app.use("/routes/echo-all", echoAllRoutes)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
  // __dirname stands for directory name, it's an enviornment variable in node and it will provide the directory name, so depending on which file you put it in, you could have a different response.
});
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/views/form.html");
});

app.get('/:word/echo', (req,res) => {
  res.json({ "echo": req.params.word })
})

app.all("*", (req,res) => {
  res.send("Invalid route");

})

app.listen(PORT, () => console.log(`listening on ====> ${PORT}`));
