var express = require('express')
var axios = require('axios')
var cors = require('cors')
var app = express()
app.use(cors())
const port = 5000

app.get('/search', (req, res) => {

	let url = `https://www.googleapis.com/youtube/v3/search?key=${secrets.API_KEY}&type=video&part=snippet&maxResults=9&q=`

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

app.listen(port, () => {
  	console.log(`listening at http://localhost:${port}`)
})