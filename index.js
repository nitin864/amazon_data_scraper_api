const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = "a20101d025ebf1c476913224606d49b8";
const baseUrl = "http://api.scraperapi.com";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scraper API");
});

// GET Product Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  
  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "productId is required",
    });
  }

  try {
    const amazonUrl = `https://www.amazon.in/dp/${productId}`;
    
    // Correct ScraperAPI URL format
    const scraperUrl = `${baseUrl}?api_key=${apiKey}&url=${encodeURIComponent(amazonUrl)}&render=true`;
    
    const response = await axios.get(scraperUrl);

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});

// Fixed console.log syntax
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});