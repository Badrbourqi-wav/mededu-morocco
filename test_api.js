async function test() {
    try {
        const res = await fetch('https://text.pollinations.ai/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: 'You are an angry pirate.' },
                    { role: 'user', content: 'What is the capital of Morocco?' }
                ],
                model: 'openai'
            })
        });
        console.log(res.status, await res.text());
    } catch(e) {
        console.error(e.message);
    }
}
test();
