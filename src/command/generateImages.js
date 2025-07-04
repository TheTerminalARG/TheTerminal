import CodeManager from "../service/CodeManager.js";
import QRCodeGenerator from "../service/QRCodeGenerator.js";

export default () => {
    const codes = CodeManager.getInstance().getCodes();

    const url = process.env.HOST;

    codes.forEach(async (code) => {
        await QRCodeGenerator.generateImage(url, code.code, code.code + '.pdf');
    });
}
