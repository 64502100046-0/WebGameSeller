
const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");

const mongoose = require('mongoose')

const app = express();
const port = 3000;

const uri = "mongodb://myUserAdmin:myUserAdmin@localhost:27017/?authMechanism=DEFAULT";


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/index.ejs", (req, res) => {
  res.render("index.ejs");
});

app.post("/admin", (req, res) => {
  res.render("admin.ejs");
});

//add game
app.post('/game/create', async(req, res) => {
  const game = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db("GameSeller").collection("game").insertOne({
    id: parseInt(game.id),
    coverimage: game.coverimage,
    gname: game.gname,
    price: game.price,
    amount: game.amount
  });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "game with ID = "+game.id+" is created",
    "game": game
  });
})


//show all game
app.get('/game', async(req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const game = await client.db('GameSeller').collection('game').find({}).toArray();
  await client.close();
  res.status(200).send(game);
})

//search game with id
app.get('/game/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(uri);
  await client.connect();
  const game = await client.db('GameSeller').collection('game').findOne({"id": id});
  await client.close();
  res.status(200).send({
    "status": "ok",
    "game": game
  });
})

//edit game
app.put('/game/update', async(req, res) => {
  const game = req.body;
  const id = parseInt(game.id);
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('GameSeller').collection('game').updateOne({'id': id}, {"$set": {
    id: parseInt(game.id),
    coverimage: game.coverimage,
    gname: game.gname,
    price: game.price,
    amount: game.amount
  }});
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "game with ID = "+id+" is updated",
    "game": game
  });
})

//delete game
app.delete('/game/delete', async(req, res) => {
  const id = parseInt(req.body.id);
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('GameSeller').collection('game').deleteOne({'id': id});
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "game with ID = "+id+" is deleted"
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

