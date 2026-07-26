async function test() {
    try {
        const res = await fetch('https://text.pollinations.ai/What%20is%20the%20capital%20of%20Morocco?model=mistral');
        console.log('mistral:', res.status, await res.text());
        
        const res2 = await fetch('https://text.pollinations.ai/What%20is%20the%20capital%20of%20Morocco?model=llama');
        console.log('llama:', res2.status, await res2.text());
    } catch(e) {
        console.error(e.message);
    }
}
test();
