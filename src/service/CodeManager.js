import * as fs from 'fs';
import { join } from 'path';

class CodeManager {
    /** @type {CodeManager} */
    static #instance = null;

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new CodeManager();
        }

        return this.#instance;
    }

    constructor() {
        // Define the path to codes.json
        this.codesFolderPath = join(process.cwd(), 'data');
        this.codesFilePath = join(this.codesFolderPath, 'codes.json');

        // Ensure the file exists or create an empty one
        if (!fs.existsSync(this.codesFilePath)) {
            if (!fs.existsSync(this.codesFolderPath)) {
                fs.mkdirSync(this.codesFolderPath, { recursive: true });
            }

            console.log('File does not exist, creating a new one.');
            fs.writeFileSync(this.codesFilePath, JSON.stringify([]), 'utf-8');
        }
    }

    /**
     * Return whether a code exists in the codes.json file.
     * @param {string} code
     */
    existsAndIsUnused(code) {
        const codes = this.getCodes();

        const unusedCode = codes.find((item) => {
            if (item.code === code && !item.used) {
                return true;
            }
        });

        return !!unusedCode;
    }

    disableCode(code) {
        return this.updateCode(code, { used: true });
    }

    /**
     * Reads the codes from codes.json file.
     * @returns {Array<{code: string, used: boolean, invite: string}>} - Array of code objects.
     */
    getCodes() {
        try {
            const fileContent = fs.readFileSync(this.codesFilePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading the codes file:', error);
            return [];
        }
    }

    /**
     * Writes an array of codes to codes.json, replacing the existing data.
     * @param {Array<Object>} codes - Array of code objects to write.
     */
    writeCodes(codes) {
        try {
            fs.writeFileSync(this.codesFilePath, JSON.stringify(codes, null, 2), {
                encoding: 'utf-8',
            });
            console.log('Codes have been written to the file.');
        } catch (error) {
            console.error('Error writing codes to the file:', error);
        }
    }

    /**
     * Appends new codes to the existing codes in codes.json.
     * @param {Array<Object>} newCodes - Array of new code objects to append.
     */
    appendCodes(newCodes) {
        try {
            const existingCodes = this.getCodes();
            const updatedCodes = [...existingCodes, ...newCodes];
            this.writeCodes(updatedCodes);
        } catch (error) {
            console.error('Error appending codes:', error);
        }
    }

    /**
     * Updates a specific code (e.g., marking it as used).
     * @param {string} code - The code to update.
     * @param {Object} newData - New data to update the code with.
     * @returns {boolean} - Returns true if the update was successful, otherwise false.
     */
    updateCode(code, newData) {
        try {
            let codes = this.getCodes();
            let codeFound = false;

            codes = codes.map((item) => {
                if (item.code === code) {
                    codeFound = true;
                    return { ...item, ...newData };
                }
                return item;
            });

            if (codeFound) {
                this.writeCodes(codes);
                console.log(`Code "${code}" has been updated.`);
                return true;
            } else {
                console.log(`Code "${code}" not found.`);
                return false;
            }
        } catch (error) {
            console.error('Error updating the code:', error);
            return false;
        }
    }

    /**
     * Retrieves the data for a specific code.
     * @param {string} code - The code to retrieve data for.
     * @returns {{code: string, used: boolean, invite: string}|null} - The code object if found, otherwise null.
     */
    getCodeData(code) {
        try {
            const codes = this.getCodes();
            const codeData = codes.find((item) => item.code === code);

            if (codeData) {
                return codeData;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    getDiscordInvites(onlyCodes = false) {
        return this.getCodes().map((item) => onlyCodes ? item.invite.split('/').pop() : item.invite);
    }
}

export default CodeManager;
