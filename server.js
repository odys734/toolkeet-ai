const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("ToolKeet AI Backend Running 🚀");
});

app.post("/chat", async(req,res)=>{

  const msg = req.body.message;

  try{

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method:"POST",
        headers:{
          "Authorization":"Bearer " + process.env.OPENROUTER_API_KEY,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          model:"openai/gpt-3.5-turbo",
          messages:[
            {
              role:"user",
              content:msg
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.json({
      reply:data.choices?.[0]?.message?.content || "No response"
    });

  }catch(err){

    console.log(err);

    res.json({
      reply:"Server Error"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log("ToolKeet AI Running 🚀");
});
