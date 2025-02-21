require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5050
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())

const uri = "";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const db = client.db('Task-management')
        const userCollection = db.collection('users')
        const taskCollection = db.collection('allTask')

        //-------------------------Manage User--------------------
        app.post('/user', async (req, res) => {
            const data = req.body
            const email = data.email

            const isexist = await userCollection.findOne({ email })
            if (isexist) return res.status(404).send({ message: 'User Alreasy stroed in db' })
            const result = await userCollection.insertOne(data)
            res.send(result)
        })

        //----------------------------Mange Task------------------------------------  

        app.post('/task', async (req, res) => {
            const data = req.body
            const result = await taskCollection.insertOne(data)
            res.send(result)
        })

        app.get('/task/:email', async (req, res) => {
            const email = req.params.email
            const result = await taskCollection.find({ email }).toArray()
            res.send(result)

        })

        app.patch('/task/update/:id', async (req, res) => {
            const id = req.params.id
            const data = req.body
            console.log(data);
            const query = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    date: data.date,
                    description: data.description,
                    email: data.email,
                    title: data.title

                }

            }
            const result = await taskCollection.updateOne(query, updateDoc)
            res.send(result)
        })

        app.patch('/update-category/:id', async (req, res) => {
            const id = req.params.id
            const data = req.body
       
            const query = { _id: new ObjectId(id) }
            const updateDoc = {
                $set: {
                    status: data.category
                }
            }
            const result = await taskCollection.updateOne(query, updateDoc)
            res.send(result)
        })
        app.delete('/delete-task/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await taskCollection.deleteOne(query)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send('Task Management server is running')
})

app.listen(port, () => {
    console.log("server running on", port);
})