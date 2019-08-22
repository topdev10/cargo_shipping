const express = require('express')
      ,app = express()
      ,dotenv = require('dotenv');

// Define the dotenv package
dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(process.env.PORT||8000, () => {
    console.log('Example app listening on port 8000!')
});