import Router from 'express';
import Configuration from "../service/Configuration.js";
import CodeManager from "../service/CodeManager.js";
import BusinessLogger from "../service/BusinessLogger.js";

const router = Router();

router.get('/', (req, res, next) => {
    const currentDate = new Date();
    const countdownEndDate = Configuration.getInstance().getCountdownEndDate();

    const code = req.query.code;

    const codeData = CodeManager.getInstance().getCodeData(code);

    if (
        currentDate > countdownEndDate
        || !!!codeData
        || codeData.used === true
    ) {
        BusinessLogger.warn(`Invite page queried with invalid code ${code || 'null'}.`);
        // Send a 404 if no code was provided or if the provided code is invalid
        return next();
    }

    CodeManager.getInstance().disableCode(codeData.code);
    BusinessLogger.info(`Code ${code} has been used.`);

    return res.render('invite', {
        discordInvite: codeData.invite,
    });
});

export default router;
