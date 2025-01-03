const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.get("/api/virtualCurrency", async (req, res) => {
  const pair = req.query.pair || "btc_jpy";
  const response = await axios.get(
    `https://coincheck.com/api/virtualCurrency?pair=${pair}`
  );
  res.json(response.data);
});
