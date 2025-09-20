export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  try {
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: message }),
      }
    );

    const data = await hfRes.json();

    let reply = '';
    if (Array.isArray(data) && data[0].generated_text) reply = data[0].generated_text;
    else if (data.generated_text) reply = data.generated_text;
    else reply = JSON.stringify(data).slice(0, 500);

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Server error.' });
  }
}
