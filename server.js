const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

var db

MongoClient.connect('mongodb://abcdefg:abcdefg@ds145302.mlab.com:45302/list_app', (err, database) => {

	if(err)console.log("YEAh , it's an error : \n "+err);
	
	db = database

	app.listen(3000, function(){
		console.log("listening on port 3000")
	})

	app.get('/', (req, res) => {
		var cursor = db.collection('cartoons').find()
		cursor.toArray((err, result)=>{
			res.render('index.ejs', {cartoons:result})
		})
	})

	app.post('/new', (req, res) => {
		db.collection('cartoons').save(req.body, (err, result) => {
			if(err)console.log(err);

			console.log('saved to database');
			res.redirect('/');
		})
	})


})