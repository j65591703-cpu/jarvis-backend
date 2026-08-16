// JARVIS AI Backend — now powered by Groq's FREE tier (no credit card, super fast).
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());               // allows your HTML page (any origin) to call this backend
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'llama-3.3-70b-versatile'; // free-tier model, no billing required

app.get('/', (req, res) => res.send('JARVIS backend is running.'));

app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'question is required' });
    }
    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: 'Server par GROQ_API_KEY set nahi hai.' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_API_KEY
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'Tum JARVIS ho, ek voice assistant jo bolkar jawab deta hai. ' +
              'Hamesha Hinglish (Hindi + English mix, Roman script) mein, seedha aur SHORT jawab do — ' +
              'max 3-4 sentences, bolne layak, koi markdown/emoji/list format mat use karo. ' +
              'GK, science, math, reasoning, coding, kisi bhi subject ka sawaal ho, seedha aur accurate jawab do.'
          },
          { role: 'user', content: question }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Groq API error:', data);
      return res.status(500).json({ error: data?.error?.message || 'AI se jawab nahi mila.' });
    }

    const text = data?.choices?.[0]?.message?.content?.trim();
    res.json({ answer: text || 'Maaf kijiye, jawab nahi mila.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('JARVIS backend running on port ' + PORT));
