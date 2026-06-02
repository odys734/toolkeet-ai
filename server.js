const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {

try {

const response = await fetch(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    method: "POST",

    headers: {
      "Authorization":
        `Bearer ${process.env.OPENROUTER_API_KEY}`,

      "HTTP-Referer":
        "https://toolkeet.local",

      "X-Title":
        "ToolKeet",

      "Content-Type":
        "application/json"
    },

    body: JSON.stringify({

      model:
        "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "user",
          content: req.body.message
        }
      ]

    })
  }
);

const data = await response.json();

console.log(data);

if(data.error){

  return res.status(500).json({
    reply: data.error.message
  });
}

res.json({
  reply:
  data.choices[0].message.content
});

} catch (error) {

console.log(error);

res.status(500).json({
  reply: "Server Error"
});

}
});

app.listen(3000, () => {
console.log("ToolKeet AI Running");
});
