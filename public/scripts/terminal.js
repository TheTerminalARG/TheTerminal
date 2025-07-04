// I can't remember where I found this code, but it's not mine.
const terminalForm = document.querySelector('#terminal-form');

const lastCommand = document.querySelector('#lastCommand');
const commandOutputElement = document.querySelector('#commandOutput');

const terminalBody = document.querySelector('#terminal-body');
const terminalInput = document.querySelector('#terminal-input');

// What is even happening here?
terminalForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const commandString = terminalInput.value;

    if (!!commandString === false) {
        return;
    }

    fetch('/command', {
        method: 'POST',
        body: JSON.stringify({
            command: commandString
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        if (!response.ok) {
            if (response.status === 418) {
                showOutput(null, 'The terminal is closed. For now.');
                return;
            }

            showOutput(null, 'Something went wrong. Please try again later.');
        }

        // Where is the secret command?
        if (response.status === 202) {
            const { redirect } = await response.json();

            lastCommand.classList.remove('d-none');
            commandOutputElement.classList.remove('d-none');

            lastCommand.innerText = '';
            commandOutputElement.innerText = '';

            await typeText(commandOutputElement, 'Well done. You have completed the challenge... Welcome!', 75);
            await delay(1250);

            window.location.href = redirect;
        }

        // Someone knows for sure...
        const { commandOutput } = await response.json();

        terminalInput.value = '';
        showOutput(commandString, commandOutput);
    }).catch((_) => {
        showOutput(null, 'Something went wrong. Please try again later.');
    })
});

/**
 * @param {null|string} command
 * @param {string} output
 */
function showOutput(command, output) {
    lastCommand.classList.remove('d-none');
    commandOutputElement.classList.remove('d-none');

    lastCommand.innerText = command ? '$ ' + command : '';
    commandOutputElement.innerText = output;
}

terminalBody.addEventListener('click',() => {
    terminalInput.focus();
});

// Maybe I should ask the robot...

// Where is he gone?
