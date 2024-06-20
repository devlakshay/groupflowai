import "dotenv/config";
import express from "express";
import validator from "validator";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
async function query(data) {
  const response = await fetch(
    "http://localhost:3000/api/v1/prediction/eb8b6732-ce95-410a-a490-e712a43f6e44",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

// query({ question: "Hey, how are you?" }).then((response) => {
//   console.log(response);
// });

app.post("/api/chatbot", (req, res) => {
  const { text } = req.body;
  let response;
  query({ question: text }).then((response) => {
    let { text } = response;
    res.json({ text });
  });
});
// Define your API endpoint for processing text data
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
