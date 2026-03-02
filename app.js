import express from "express";

const app = express();

app.use(express.json());

app.post("/chat", async (req, res) => {

 try {

  const message = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {

   method: "POST",

   headers: {

    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,

    "Content-Type": "application/json"

   },

   body: JSON.stringify({

    model: "gpt-4o-mini",

    messages: [

     {
      role: "system",
      content: "You are WiseMan, a wise Roblox NPC. Speak short and wise."
     },

     {
      role: "user",
      content: message
     }

    ]

   })

  });

  const data = await response.json();

  res.send(data.choices[0].message.content);

 } catch (err) {

  res.send("WiseMan is silent...");

 }

});

app.listen(3000);
