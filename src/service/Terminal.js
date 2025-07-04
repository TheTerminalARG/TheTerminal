import CodeManager from "./CodeManager.js";

class Terminal {
    /** @type {Terminal} */
    static #instance = null;

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new Terminal();
        }

        return this.#instance;
    }

    /**
     * @param {string} command
     */
    getOutput(command) {
        if (command.startsWith('redeem')) {
            const redeemCode = command.split(' ')[1];

            if (!redeemCode) {
                return 'Almost there.';
            }

            if (CodeManager.getInstance().existsAndIsUnused(redeemCode)) {
                return '/invite?code=' + redeemCode;
            }

            return 'Invalid code. Maybe it is too late...';
        }

        if (command.startsWith('cd')) {
            return 'You\'re not going anywhere.';
        }

        switch (command) {
            case 'ls':
                return this.#getLsResult();
            case 'whoami':
                return 'master';
            case 'uptime':
                return 'Very long... Probably forever.';
            case 'pwd':
                return '/home/terminal';
            case 'date':
                return new Date().toString();
            case 'fortune':
                return this.#getRandomFortune();
            case 'help':
                return this.#getHelpMenu();
            default:
                return 'This command is not supported.';
        }
    }

    #getLsResult() {
        return 'Nothing to see here...';
    }

    #getHelpMenu() {
        return `whoami: Shows your identity.
uptime: Shows how long the system has been running.
date: Displays the current date and time.
pwd: Shows the current directory.
fortune: Tells you something.
help: Displays this help menu.`;
    }

    #getRandomFortune() {
        const fortunes = [
            "Read behind the lines.",
            "The journey of a thousand miles begins with a single left-click.",
            "The real magic happens in the code.",
            "Unlock the secrets hidden in the source.",
        ];
        return fortunes[Math.floor(Math.random() * fortunes.length)];
    }
}

export default Terminal;
