const express = require('express');
const cors = require('cors');
const app = express();

// dotenv config require;
require('dotenv').config();


const port = process.env.PORT || 5000;

// middleware;
app.use(cors());
app.use(express.json());

// mongodb uri and  server api start
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0y4d7qh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    const usersCollection = client.db('jobSeekers').collection('jobSeekerCollection');

    // user post API  is here;
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user)
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get('/sik1359', async (req, res) => {

      const cursor = usersCollection.find({});
      const allJobSeeker = await cursor.toArray();
      res.send(allJobSeeker)
    })



  
  }
  finally {

  }
}
run().catch(console.log('run function in catch'))


// basic server req, res, app.listen;

app.get('/', (req, res) => {
  res.send('server is Running')
})

app.listen(port, () => console.log(`server is Running on Port ${port}`))