import CodeGenerator from "../service/CodeGenerator.js";
import CodeManager from "../service/CodeManager.js";
import DiscordConnection from "../service/DiscordConnection.js";

export default async (number) => {
    const numCodes = parseInt(number, 10);
    if (isNaN(numCodes) || numCodes <= 0) {
        console.error('Please provide a valid number of codes.');
        process.exit(1);
    }

    const newCodes = await CodeGenerator.generateCodes(numCodes);
    CodeManager.getInstance().appendCodes(newCodes);

    console.log(`${numCodes} new codes have been generated.`);
    await DiscordConnection.getInstance().close();
}