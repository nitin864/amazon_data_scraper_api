const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = process.env.SCRAPER_API_KEY || "a20101d025ebf1c47691322460xxxxx";
const baseUrl = "http://api.scraperapi.com";

app.use(express.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scraper API");
});

app.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const amazonUrl = `https://www.amazon.in/dp/${productId}`;
    const scraperUrl = `${baseUrl}?api_key=${apiKey}&url=${encodeURIComponent(
      amazonUrl
    )}&render=true`;

    const { data: html } = await axios.get(scraperUrl);
    const $ = cheerio.load(html);

    const title = $("#productTitle").text().trim() || null;
    const price = $(".a-price-whole").first().text().trim() || null;
    const rating = $("span.a-icon-alt").first().text().trim() || null;
    let availability = "Unknown";
    const availabilityText = $("#availability span").text().trim();
    if (availabilityText) availability = availabilityText;
        const images = [];
    $("#altImages img").each((_, el) => {
      const img = $(el).attr("src");
      if (img && !img.includes("sprite")) {
        images.push(img.replace("_SS40_", "_SL1500_"));
      }
    });

    res.json({
      success: true,
      product: {
        productId,
        title,
        price,
        rating,
        availability,
        images
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to scrape product",
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
