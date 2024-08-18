const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.get("/api/ticker", async (req, res) => {
  const pair = req.query.pair || "btc_jpy";

  try {
    const response = await axios.get(
      `https://coincheck.com/api/ticker?pair=${pair}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
