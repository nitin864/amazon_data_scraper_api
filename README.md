# Amazon Data Scraper API

# 🛒 Amazon Scraper API (Node.js)

A powerful and production-ready **Amazon Scraper API** built using **Node.js, Express, Axios, and ScraperAPI**.  
This API allows you to fetch **product details, reviews, offers, and search results** from Amazon India with clean JSON responses.

>  This project is intended for **educational and research purposes only**.  
> Always follow Amazon’s Terms of Service and ScraperAPI usage policies.

---

##  Features

-  Fetch Amazon **product details**
-  Get **product reviews**
-  Fetch **offer listings**
-  Search Amazon products
-  Uses **ScraperAPI** to bypass bot protection
-  Environment-based API key support
-  JSON responses
-  Ready for production & deployment
-  Supports `autoparse=true` (ScraperAPI)
-  Can be extended with `render=true + cheerio`

---

##  Tech Stack

- **Node.js**
- **Express.js**
- **Axios**
- **ScraperAPI**
- **dotenv**

---

 
---

##  Environment Variables

Create a `.env` file in the root directory:

```env
SCRAPER_API_KEY=your_scraperapi_key_here
PORT=3000```

## INstalltion
```git clone https://github.com/your-username/amazon-scraper-api.git
cd amazon-scraper-api
npm install

 Run the Server
node index.js


Server will start at:
http://localhost:3000

 API Endpoints
🏠 Health Check
GET /


Response

Welcome to Amazon Scraper API 🚀

📦 Get Product Details
GET /products/:productId


Example

GET /products/B08N5WRWNW


Response

{
  "success": true,
  "data": {
    "title": "Apple 2020 MacBook Pro",
    "price": "₹1,29,900",
    "rating": "4.6 out of 5 stars"
  }
}

⭐ Get Product Reviews
GET /products/:productId/reviews


Example

GET /products/B08N5WRWNW/reviews

💰 Get Product Offers
GET /products/:productId/offers


Example

GET /products/B08N5WRWNW/offers

🔍 Search Products
GET /search/:query


Example

GET /search/macbook

⚙️ How It Works

This API uses ScraperAPI with:

autoparse=true



