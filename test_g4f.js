const { G4F } = require('g4f');
const g4f = new G4F();

async function test() {
    try {
        const response = await g4f.chatCompletion([
            { role: 'user', content: 'What is the capital of Morocco?' }
        ]);
        console.log('RESPONSE:', response);
    } catch(e) {
        console.error('ERROR:', e.message);
    }
}
test();
