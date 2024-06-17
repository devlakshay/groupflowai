import "dotenv/config";
import express from "express";
import validator from "validator";
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Define your API endpoint for processing text data
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
