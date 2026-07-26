async function testPollinationsModels() {
  const models = ['qwen', 'qwen-coder', 'mistral', 'llama', 'searchgpt', 'evil'];
  const prompt = "Qu'est ce que l'anatomie ? Réponds en 2 phrases.";
  
  for (const m of models) {
    try {
      const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=${m}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      const text = await res.text();
      console.log(`MODEL ${m} STATUS: ${res.status}, RESPONSE:`, text.slice(0, 150));
      if (res.ok && text && !text.includes('429') && !text.includes('error') && !text.includes('Payment Required')) {
        console.log(`>>> MODEL ${m} WORKS PERFECTLY! <<<`);
        return m;
      }
    } catch (e) {
      console.error(`MODEL ${m} FAILED:`, e.message);
    }
  }
}

testPollinationsModels();
