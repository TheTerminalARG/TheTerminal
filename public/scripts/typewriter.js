// There is no one here...
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(element, text, speed) {
    let index = 0;

    while (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        await delay(speed);
    }
}
