const express = require('express')

const app = express()

// Get request to homepage
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000, function () {
    console.log('Server started on port 3000...');
})