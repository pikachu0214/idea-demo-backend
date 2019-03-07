//Calls express
const express = require("express");

//references app to express callback
const app = express();

//Calls fs
const fs = require("fs");

//Parses json body when call
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

//references categories.json to filePath
const filePath = __dirname + "/" + "categories.json";

//Calls object to json file
const jsonfile = require("jsonfile");

//Get list of categories from categories.json file as json using fs.readFile
app.get("/test/category/all", function(req, res) {
  fs.readFile(filePath, "utf8", function(err, data) {
    // console.log(data);   // ZZZZZ
    res.end(data);
  });
});

//get list of categories as string from server using jsonfile.readFile
app.get("/category/all", (req, res) => {
  jsonfile.readFile(filePath, (err, obj) => {
    res.send(JSON.stringify(obj));
  });
});

//get list of categories as string from server
app.get("/category/all/text", (req, res) => {
  jsonfile.readFile(filePath).then(obj =>
    jsonfile.writeFile(filePath, obj).then(() => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Writing JSON to server file system OK.");
    })
  );
});

//get list of categories as string from server using jsonfile.readFile
app.get("/category/:id", (req, res) => {
    jsonfile.readFile(filePath) 
        .then(obj => {
            res.send(JSON.stringify(req.obj.params))
        })
});

app.post("/addCategory", (req, res) => {
  jsonfile.readFile(filePath);
  let addCategory = [];
  const newCategory = [
    {
      id: req.body.id,
      name: req.body.name,
      points: req.body.points
    }
  ];
  addCategory = [...newCategory];
  res.send(addCategory);
});

//app is set to server 3001
const server = app.listen(3001, function() {
  "use strict";
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
