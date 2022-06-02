const express = require('express')
const bodyParser= require('body-parser')
const MongoVar = require('mongodb').MongoClient
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

MongoVar.connect('mongodb+srv://user1:yeet@cluster0.cuqip.mongodb.net/?retryWrites=true&w=majority', (err, client) => {
    
    if (err) return console.error(err)
    console.log('Connected to Database')

    const db = client.db('Cluster0')
    const quotesCollection = db.collection('quotes')

    app.listen(3000, () => {
        console.log('listening on 3000')
    })
    
    app.get('/', async(req, res) => {

        try {
            const results = await db.collection('quotes').find().toArray()
            console.log(results)
            res.render('index.ejs', {quotes: results})
         } catch(error){
            console.error(error)
        }
        
    })
    
    app.post('/quotes', async(req, res) => {

        try {
            let result = await quotesCollection.insertOne(req.body)
            console.log(result)
            res.redirect('/')
        } catch(error){
            console.error(error)
        }
        
    })

    app.put('/quotes', async(req, res) => {
        try{
            const result = await quotesCollection.findOneAndUpdate(
                { name: 'Yoda' },
                {
                  $set: {
                    name: req.body.name,
                    quote: req.body.quote
                  }
                },
                {
                  upsert: true
                })
            console.log(result)
            res.json('Success')
            
        }
        catch(error){
            console.error(error)
        }
    })

    app.delete('/quotes', async(req, res) => {
        try {
            const result = await quotesCollection.deleteOne(
                { name: req.body.name },
            )
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json('Deleted Darth Vadar\'s quote')
        } catch(error){
            console.error(error)
        }
    })

})

