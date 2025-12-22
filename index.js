require('dotenv').config();
const express = require('express');
const axios = require('axios');
const PORT = process.env.PORT || 5000;
const app = express();
 

const apiKey = process.env.SCRAPER_API_KEY || "a20101d025ebf1c47691322460xxxxx";
const baseUrl = "http://api.scraperapi.com";
 

app.use(express.json());
app.set('json spaces', 2);

// Get API key from environment variable
const DEFAULT_API_KEY = process.env.SCRAPER_API_KEY;

const returnScraperApiUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Amazon Scraper API!');
});

// Get product details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const api_key = req.query.api_key || DEFAULT_API_KEY;

  try {
    const url = `${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product details',
      error: error.message
    });
  }
});

// Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const api_key = req.query.api_key || DEFAULT_API_KEY;

  try {
    const url = `${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product reviews',
      error: error.message
    });
  }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const api_key = req.query.api_key || DEFAULT_API_KEY;

  try {
    const url = `${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product offers',
      error: error.message
    });
  }
});

// Get search results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const api_key = req.query.api_key || DEFAULT_API_KEY;

  try {
    const url = `${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch search results',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
