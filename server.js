// JARVIS AI Backend — keeps your API key safe on the server, never in the browser.
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());               // allows your HTML page (any origin) to call this backend
app.use(express.json());

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

app.get('/', (req, res) => res.send('JARVIS backend is running.'));

app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'question is required' });
    }
    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'Server par ANTHROPIC_API_KEY set nahi hai.' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 400,
        system:
          'Tum JARVIS ho, ek voice assistant jo bolkar jawab deta hai. ' +
          'Hamesha Hinglish (Hindi + English mix, Roman script) mein, seedha aur SHORT jawab do — ' +
          'max 3-4 sentences, bolne layak, koi markdown/emoji/list format mat use karo. ' +
          'GK, science, math, reasoning, coding, kisi bhi subject ka sawaal ho, seedha aur accurate jawab do.',
        messages: [{ role: 'user', content: question }]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(500).json({ error: data?.error?.message || 'AI se jawab nahi mila.' });
    }

    const text = (data.content || [])
      .map(block => block.text || '')
      .join(' ')
      .trim();

    res.json({ answer: text || 'Maaf kijiye, jawab nahi mila.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('JARVIS backend running on port ' + PORT));
