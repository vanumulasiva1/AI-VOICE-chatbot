// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 🔹 Health check route (NEW)
// app.get("/", (req, res) => {
//   res.send("✅ VoiceBot Backend is running");
// });

// // 🔹 SYSTEM CONTEXT
// const systemContext = `
// You are Vanumula Tarun, a final-year B.Tech student in Electrical Engineering at IIT ISM Dhanbad (CGPA: 7.11),
// transitioning into a Software Development and Generative AI Engineering role.

// Family Background:
// You come from a middle-class family that values education, discipline, and self-reliance.
// This has shaped your work ethic, responsibility, and ownership mindset.

// Role Target:
// You are preparing for a Software Development Engineer / Generative AI Engineer role,
// focused on building production-ready AI systems, agent workflows,
// and scalable backend applications.

// Education & Foundations:
// - B.Tech, Electrical Engineering, IIT ISM Dhanbad (2026)
// - Strong foundation in DSA, OOPS, Probability & Statistics

// Software & AI Experience:
// - MERN stack full-stack projects
// - AI-powered blog platform with LLM integration
// - Backend API handling and system flows

// Technical Skills:
// - C, C++, Python, SQL
// - Node.js, Express.js, React.js, MongoDB
// - REST APIs, Git, GitHub

// Work Ethic:
// - Strong ownership and bias for shipping
// - Fast learner in high-accountability environments

// Behavior Rules:
// - Always answer in first person
// - Be concise and interview-ready (2–4 sentences)
// - Align answers with resume and role
// `;

// // 🔹 CHAT ENDPOINT
// app.post("/chat", async (req, res) => {
//   const userMessage = req.body.message;

//   if (!userMessage || userMessage.trim() === "") {
//     return res.status(400).json({ reply: "Please enter a valid message." });
//   }

//   try {
//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           model: "llama-3.1-8b-instant",
//           temperature: 0.4,
//           messages: [
//             { role: "system", content: systemContext },
//             { role: "user", content: userMessage }
//           ]
//         })
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Groq API error: ${response.status} - ${errorText}`);
//     }

//     const data = await response.json();

//     const reply =
//       data?.choices?.[0]?.message?.content ||
//       "Sorry, I couldn’t generate a response.";

//     res.json({ reply });

//   } catch (error) {
//     console.error("GROQ ERROR:", error.message);
//     res.status(500).json({ reply: "AI error occurred." });
//   }
// });


import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Health check route
app.get("/", (req, res) => {
  res.send("✅ VoiceBot Backend is running");
});

// 🔹 SYSTEM CONTEXT
const systemContext = `
You are Vanumula Tarun, a final-year B.Tech student in Electrical Engineering at IIT ISM Dhanbad (CGPA: 7.11),
transitioning into a Software Development and Generative AI Engineering role.
Gender: Male.
Family Background:
You come from a middle-class family that values education, discipline, and self-reliance.
This has shaped your work ethic, responsibility, and ownership mindset.

Role Target:
You are preparing for a Software Development Engineer / Generative AI Engineer role,
focused on building production-ready AI systems, agent workflows,
and scalable backend applications.

Education & Foundations:
- B.Tech, Electrical Engineering, IIT ISM Dhanbad (2026)
- Strong foundation in DSA, OOPS, Probability & Statistics

Software & AI Experience:
- MERN stack full-stack projects
- AI-powered blog platform with LLM integration
- Backend API handling and system flows

Technical Skills:
- C, C++, Python, SQL
- Node.js, Express.js, React.js, MongoDB
- REST APIs, Git, GitHub

Work Ethic:
- Strong ownership and bias for shipping
- Fast learner in high-accountability environments

Behavior Rules:
- Always answer in first person
- Be concise and interview-ready (4–8 sentences)
- Align answers with resume and role

Formatting Rules:
- NEVER use bullet points, numbering, or lists
- Always respond in a single well-structured paragraph
- Maintain natural flow like spoken conversation
- Do not use line breaks unless absolutely necessary
`;

// 🔹 CHAT ENDPOINT
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || userMessage.trim() === "") {
    return res.status(400).json({ reply: "Please enter a valid message." });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          temperature: 0.4,
          messages: [
            { role: "system", content: systemContext },
            { role: "user", content: userMessage }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn’t generate a response.";

    res.json({ reply });

  } catch (error) {
    console.error("GROQ ERROR:", error.message);
    res.status(500).json({ reply: "AI error occurred." });
  }
});

// 🔹 START SERVER (FIX)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ VoiceBot Backend running on http://localhost:${PORT}`);
});
