import QRCode from 'qrcode';
import PDFDocument from "pdfkit";

import fs from 'fs';

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

const QR_CODE_SIZE = A4_WIDTH * 0.75;

const QR_CODE_HORIZONTAL_PADDING = (A4_WIDTH - QR_CODE_SIZE) / 2;
const QR_CODE_VERTICAL_PADDING = (A4_HEIGHT - QR_CODE_SIZE) / 2;

const DARK_COLOR = '#1b1b1b';
const LIGHT_COLOR = '#FFFFFF';

class QRCodeGenerator {
    /**
     * @param {string} url
     * @param {string} text
     * @param {string} output
     *
     * @returns {Promise<string>}
     */
    static async generateImage(url, text, output) {
        const outputName = './output/' + output;
        url = url + '?code=' + text;

        // Create document & write stream
        const pdfDocument = new PDFDocument({ size: 'A4', margin: 0 });
        const writeStream = fs.createWriteStream(outputName);
        pdfDocument.pipe(writeStream);

        // Background
        pdfDocument.rect(0, 0, pdfDocument.page.width, pdfDocument.page.height).fill(DARK_COLOR);
        // Text color
        pdfDocument.fillColor(LIGHT_COLOR);

        // QR Code
        const qrCodeBuffer = await QRCode.toBuffer(url, {
            errorCorrectionLevel: 'H',
            color: {
                dark: LIGHT_COLOR,  // White QR code squares
                light: DARK_COLOR, // Black background
            },
            width: QR_CODE_SIZE,
        });
        pdfDocument.image(qrCodeBuffer, QR_CODE_HORIZONTAL_PADDING, QR_CODE_VERTICAL_PADDING + 30);

        // Title
        pdfDocument.font('Helvetica-Bold').fontSize(64).text('The Terminal', 0, 110, { align: 'center' });

        // SubTitle
        pdfDocument.font('Helvetica').fontSize(24).text('Join the community, solve the challenge.', 0, 200, { align: 'center' });

        // Code
        pdfDocument.font('Helvetica-Bold').fontSize(48).text(text, 0, 720, { align: 'center' });

        // Write document
        pdfDocument.end();
        writeStream.on('finish', () => {
            console.log('PDF created: ' + outputName);

            writeStream.close();
        });
    }
}

export default QRCodeGenerator;
