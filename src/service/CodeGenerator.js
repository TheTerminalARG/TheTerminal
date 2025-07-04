import InviteGenerator from "./InviteGenerator.js";

class CodeGenerator {
    /**
     * Generate random codes.
     * @param {number} numCodes - Number of codes to generate.
     * @param {number} length - The length of the codes to generate.
     * @returns {Array<Object>} - Array of generated codes.
     */
    static async generateCodes(numCodes, length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const codes = [];

        for (let i = 0; i < numCodes; i++) {
            let code = '';
            for (let j = 0; j < length; j++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            codes.push({
                code,
                used: false,
                invite: await InviteGenerator.getInstance().generateInvite()
            });
        }

        return codes;
    }
}

export default CodeGenerator;
