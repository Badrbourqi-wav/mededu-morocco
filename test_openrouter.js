async function testOpenRouter() {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-or-v1-free'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [{ role: 'user', content: 'Qu est ce que l anatomie ?' }]
      })
    });
    console.log("OPENROUTER STATUS:", res.status);
    const data = await res.json();
    console.log("OPENROUTER RESPONSE:", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("OPENROUTER ERROR:", e);
  }
}

testOpenRouter();
