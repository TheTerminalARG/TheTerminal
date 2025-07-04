import fs from 'fs';

class Configuration {
    /** @type {Configuration} */
    static #instance = null;

    /**
     * @type {{countdownEnd: string}}
     */
    #config = null;

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new Configuration();
        }

        return this.#instance;
    }

    constructor() {
        this.#config = JSON.parse(fs.readFileSync('configuration.json', {
            encoding: 'utf-8'
        }).toString());
    }

    getCountdownEndDate() {
        return new Date(this.#config.countdownEnd);
    }
}

export default Configuration;
