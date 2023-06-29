import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
const App = () => {
  const genrateCode = () => {
    const code = `
      const express = require('express');
      const mongodb = require('mongodb');
      const cors = require('cors');
      const NodeCache = require('node-cache');
      const myCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
      const MongoClient = mongodb.MongoClient;
      const app = express();
      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      const mongoUri = "${MongodbData.url}";
      const dbName = "${MongodbData.database}";
      const collectionName = "${MongodbData.collection}";
      // Add your routes here
      // Example route: GET all documents from the collection
      app.get('/${MongodbData.collection}', async (req, res) => {
        const cachedData = myCache.get('${MongodbData.collection}');
        if (cachedData) {
          console.log("Serving data from cache");
          res.status(200).json({ data: cachedData });
        } else {
          MongoClient.connect(mongoUri)
            .then(async (client) => {
              const db = client.db(dbName);
              const collection = db.collection(collectionName);
              const data = await collection.find({}).toArray();
              myCache.set('${MongodbData.collection}', data);
              console.log("Data cached for future requests");
              res.status(200).json({ data });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: err });
            });
        }
      });
      // POST method to insert a new document into the collection
app.post("/post", async (req, res) => {
  const doc = req.body;
  try {
    const client = await MongoClient.connect(mongouri);
    const db = client.db(dbName);
    // COLLECTION CONNECTION
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(doc);
    console.log(result.acknowledged);
    if (result.acknowledged) {
      console.log("Inserted document:", result);
      res.status(200).send({Message:"Data Insetered successfully"});
    } else {
      console.log("No document inserted");
      res.status(200).send(false);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});
// PUT method to update an existing document by ID
app.put("/put/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new mongodb.ObjectId(id) };
  const update = { $set: req.body };
  MongoClient.connect(mongouri)
    .then(async (client) => {
      // DATABASE CONNECTION
      const db = client.db(dbName);
      // COLLECTION CONNECTION
      const collection = db.collection(collectionName);
      let result = await collection.findOneAndUpdate(query, update, {
        returnOriginal: false,
      });
      if (!result.value) {
        res.sendStatus(404);
      } else {
        res.json(result.value);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});
// DELETE method to remove a document by ID
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: mongodb.ObjectId(id) };
  MongoClient.connect(mongouri)
    .then(async (client) => {
      // DATABASE CONNECTION
      const db = client.db(dbName);
      // COLLECTION CONNECTION
      const collection = db.collection(collectionName);
      let result = await collection.findOneAndDelete(query);
      if (!result.value) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});
      // Start the server
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log('Server running on port:', port);
      });
    `;
    return code;
  };
  const [Response, setResponse] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Copycode, setCopycode] = useState(false);
  const [MongodbData, setMongodbData] = useState({
    url: "",
    database: "",
    collection: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMongodbData({ ...MongodbData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(MongodbData);
    const response = genrateCode();
    setLoading(true);
    setResponse(response);
  };
  const handleCopyCode = () => {
    setCopycode(true);
    navigator.clipboard.writeText(Response);
  };
  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-5 w-[98vw] m-3 rounded-xl bg-blue-950 text-white">
        <span className="text-5xl">Express Builder App</span>
        <form
          className="flex flex-col max-w-2xl gap-5 p-2 text-black"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="url"
            className="border border-black rounded-lg p-1"
            placeholder="URL"
            onChange={handleChange}
          />
          <input
            type="text"
            name="database"
            className="border border-black rounded-lg p-1"
            placeholder="Database"
            onChange={handleChange}
          />
          <input
            type="text"
            name="collection"
            className="border border-black rounded-lg p-1"
            placeholder="Collection"
            onChange={handleChange}
          />
          <button className="bg-orange-600 rounded-xl font-bold h-[30px]">
            {" "}
            Send
          </button>
        </form>
      </div>
      {Loading && (
        <div className="bg-black text-white m-3 ">
          <pre>
            <code>
              <div className="text-right">
                <button onClick={handleCopyCode}
                className="bg-red-500 w-16 m-3 rounded-lg"
                style={{backgroundColor:Copycode?"green":"black"}}
                >Copy</button>
              </div>
              <SyntaxHighlighter
                language="javascript"
                style={darcula}
              >
                {Response}
              </SyntaxHighlighter>
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};
export default App;
