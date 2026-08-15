# JARVIS AI Backend

Ye chhota server tumhare JARVIS voice assistant ko real AI (Claude) se jodta hai —
GK, reasoning, math, coding, kisi bhi subject ka sawaal handle karega.

## Kyun zaroori hai?
Tumhari API key ko seedha HTML/browser file mein daalna **unsafe** hai — koi bhi
website ka source code dekh kar tumhari key chura sakta hai. Ye backend key ko
server par chhupa kar rakhta hai; browser sirf is backend se baat karta hai.

## Setup (5 minute)

### 1. API key lo
https://console.anthropic.com/settings/keys se ek key banao.

### 2. Free deploy karo (Render.com — sabse aasan)
1. https://render.com par free account banao
2. Is `jarvis-backend` folder ko GitHub repo mein daalo (ya Render par
   "Deploy from local files" option use karo)
3. Render par "New Web Service" > apna repo select karo
4. Build command: `npm install`
5. Start command: `npm start`
6. Environment tab mein `ANTHROPIC_API_KEY` naam ka variable add karo, apni
   key paste karo
7. Deploy hone ke baad tumhe ek URL milega jaise:
   `https://jarvis-backend-xxxx.onrender.com`

### 3. Frontend mein connect karo
`jarvis-assistant.html` file kholo, top ke `AI_BACKEND_URL` line dhundo, aur
apna Render URL + `/ask` daalo:

```js
const AI_BACKEND_URL = "https://jarvis-backend-xxxx.onrender.com/ask";
```

Save karo, file wapas browser mein kholo — ab JARVIS har subject ka sawaal
AI se answer karega.

## Local testing (optional)
```
npm install
cp .env.example .env   # phir .env mein apni key daalo
npm start
```
Server `http://localhost:3000` par chalega — us case mein
`AI_BACKEND_URL = "http://localhost:3000/ask"` use karo.

## Note
Render ka free tier thoda "sleep" karta hai inactivity ke baad — pehla request
5-10 second slow ho sakta hai, uske baad fast rahega. Faster/always-on ke liye
paid tier ya Railway/Fly.io jaisa alternative use kar sakte ho.
