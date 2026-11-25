import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/status', (_req, res) => res.json({ ready: Boolean(process.env.OPENAI_API_KEY) }));
app.post('/api/chat', async (req, res) => {
  const { messages = [] } = req.body ?? {};
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'Add OPENAI_API_KEY in your hosting environment secrets to enable AI replies.' });
  if (!Array.isArray(messages) || messages.length === 0) return res.status(400).json({ error: 'Please send a message.' });
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are Malia, a warm, intelligent, patient and supportive AI assistant. Be honest that you are AI, not a human. Help with learning, technology and everyday organization. For medical topics, give educational information, encourage qualified clinical care when appropriate, and never pretend to diagnose with certainty.' },
          ...messages.slice(-20).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content ?? '').slice(0, 8000) }))
        ],
        temperature: 0.7
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'The AI service could not complete that request.' });
    res.json({ reply: data.choices?.[0]?.message?.content || 'I could not form a reply just now.' });
  } catch {
    res.status(502).json({ error: 'Could not reach the AI service. Check your connection and try again.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log(`Malia AI listening on ${port}`));
