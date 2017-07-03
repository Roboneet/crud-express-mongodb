const express = require('express');
const bodyParser = require('body-parser')
const app = express();


app.listen(3000, function(){
	console.log("listening on port 3000")
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.post('/new', (req, res) => {
	console.log('your fav cartoon is :')
})