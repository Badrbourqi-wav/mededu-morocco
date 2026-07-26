async function test() {
    try {
        const query = "Act as an angry pirate answering a medical student. User question: What is anatomy?";
        const res = await fetch('https://text.pollinations.ai/' + encodeURIComponent(query));
        console.log(res.status, await res.text());
    } catch(e) {
        console.error(e.message);
    }
}
test();
