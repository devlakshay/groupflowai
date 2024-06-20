import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// LAKSHYA
// async function query(data) {
// //   const response = await fetch(
// //       "http://localhost:3000/api/v1/prediction/238fc4d5-1bea-4835-ae61-d09ff458242a",
// //       {
// //           method: "POST",
// //           headers: {
// //               "Content-Type": "application/json"
// //           },
// //           body: JSON.stringify(data)
// //       }
// //   );
// //   const result = await response.json();
// //   return result;
// // }

// YASH
async function query(data) {
  const response = await fetch(
    "http://localhost:3000/api/v1/prediction/eb8b6732-ce95-410a-a490-e712a43f6e44", // ADD your own flowise or other relevant chatbot API KEY for conversation.
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

app.post("/api/chatbot", (req, res) => {
  const { text } = req.body;
  query({ question: text }).then((response) => {
    let { text } = response;
    res.json({ text });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
