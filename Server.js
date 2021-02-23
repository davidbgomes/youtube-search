require('dotenv').config()
var express = require('express')
var axios = require('axios')
var cors = require('cors')
var app = express()
app.use(cors())

app.get('/search', (req, res) => {

	let url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&type=video&part=snippet&maxResults=9&q=`

	console.log("params",req.query.searchText)

	axios.get(`${url}${req.query.searchText}`)
	.then(function (response) {
		// handle success
		console.log(response.data.items);
		res.send(response.data.items)
	})
	.catch(function (error) {
		// handle error
		console.log(error);
		res.end()
	})

  	//res.send('Hello World!')
})

app.listen(process.env.PORT || 5000, () => {
  	console.log(`listening at http://localhost:${port}`)
})