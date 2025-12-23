const express = require("express");
const client = require("prom-client");

const app = express();

const PORT = 3000;

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Health check
app.get("/health", (req, res) => {
  res.status(200).send("Ok");
});

// Main endpoint
app.get("/", (req, res) => {
  res.json({ message: "DevOps Production App Running 🚀" });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
