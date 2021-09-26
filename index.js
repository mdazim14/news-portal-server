const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const fileUpload = require('express-fileUpload');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwkyk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority` ;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('newsImages'));
app.use(fileUpload());

const port = 5000;


app.get('/', (req, res) =>{
    res.send("Node ami chalu mal");
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const newsCollection = client.db("newsPortal").collection("news");
 
    app.post('/addNews', (req, res) =>{
      // console.log("res", req.body);
        const news = req.body;
        console.log(news);
        newsCollection.insertOne(news)
        .then(result =>{
            res.send(result.insertedCount > 0);
        })
    })

    app.get('/getNews', (req, res) => {
        newsCollection.find()
          .toArray((err, review) => {
            res.send(review)
            // console.log('From database', News);
          })
      })










});


app.listen(process.env.PORT || port)