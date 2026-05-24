export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { word } = req.body;
  if (!word) return res.status(400).json({ error: 'No word provided' });

  const prompt = `You are a translation assistant for a Russian speaker learning English from TV shows. For the English word or phrase below, respond with ONLY a JSON object and nothing else — no markdown, no backticks, no commentary:
{"translation_ru":"...","transcription":"...","example_en":"...","example_ru":"..."}
Rules:
- translation_ru: concise natural Russian translation, 1-3 core everyday meanings separated by commas. No dictionary dump.
- transcription: IPA in slashes.
- example_en: one short natural English sentence using the word in everyday spoken context.
- example_ru: Russian translation of that sentence.
Word/phrase: "${word}"`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const text = (data.content || [])
      .filter((i) => i.type === 'text')
      .map((i) => i.text)
      .join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: 'Translation failed', details: e.message });
  }
}
