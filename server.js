const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

// configuring the app
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

var db

// setting up the database
MongoClient.connect('mongodb://abcdefg:abcdefg@ds145302.mlab.com:45302/list_app', (err, database) => {

	if(err)console.log("YEAh , it's an error : \n "+err);
	
	db = database

	app.listen(3000, function(){
		console.log("listening on port 3000")
	})

	// home page view
	app.get('/', (req, res) => {
		var cursor = db.collection('cartoons').find()
		cursor.toArray((err, result)=>{
			res.render('index.ejs', {cartoons:result})
		})
	})

	//create a new item
	app.post('/cartoons', (req, res) => {
		db.collection('cartoons').save(req.body, (err, result) => {
			if(err)console.log(err);

			console.log('saved to database');
			res.redirect('/');
		})
	})


	//update items
	app.put('/cartoons', (req, res)=>{
		db.collection('cartoons').findOneAndUpdate({
			name: 'phineas and ferb'
		},{
			$set: {
				name: req.body.name,
				description: req.body.description
			}
		},{
			sort: {_id:-1},
			upsert: true
		},(err, result)=>{
			if(err) return res.send(err)
			res.send(result)
		})
	})

	app.delete('/cartoons', (req, res)=>{
		db.collection('cartoons').findOneAndDelete({
			name: req.body.name
		},(err, result)=>{
			if(err) return req.send(500, err)
				res.send({message: 'Thats how you bust Doofenshmirtz !'})
		})
	})
})