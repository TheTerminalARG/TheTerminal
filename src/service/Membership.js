import CodeManager from "./CodeManager.js";

class Membership {
    /** @type Membership|null */
    static #instance = null;

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new Membership();
        }

        return this.#instance;
    }

    /**
     * @param {string} code
     */
    getDiscordInvite(code) {
        if (CodeManager.getInstance().existsAndIsUnused(code) === false) {
            throw new Error('Invalid code.');
        }

        CodeManager.getInstance().disableCode(code);
    }
}

export default Membership;
