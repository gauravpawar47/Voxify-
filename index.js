const express = require("express");
const path = require("path");
const port = 3000;
const app = express();
const OpenAI = require("openai");
const messages = [];

const openai = new OpenAI({
  apiKey: "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",
});

async function main(input) {
  messages.push({ role: "user", content: input });

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  // console.log(completion.choices);
  return completion.choices[0]?.message?.content;
}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// Render HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api", async function (req, res, next) {
  console.log(req.body);
  const mes = await main(req.body.input);
  res.json({ success: true, message: mes });
});

app.listen(port, () => {
  console.log("Running...");
});
