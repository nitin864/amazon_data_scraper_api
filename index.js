const express = require('express');
const request =  require('request-promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to Amazon Scraper API")
});

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));