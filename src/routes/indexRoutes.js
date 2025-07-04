import Router from 'express';

import Configuration from "../service/Configuration.js";
import Terminal from "../service/Terminal.js";
import BusinessLogger from "../service/BusinessLogger.js";

const router = Router();

router.get('/', (req, res, next) => {
    const countdownEndDate = Configuration.getInstance().getCountdownEndDate();

    const queryCode = req.query.code?.toString() ?? null;

    res.status(200).render('index', {
        countdownEndDate: countdownEndDate,
        queryCode: queryCode
    });
});

router.post('/command', (req, res, next) => {
    const countdownEndDate = Configuration.getInstance().getCountdownEndDate();
    const today = new Date();

    if (countdownEndDate < today) {
        return res.status(418).json({
            message: 'The terminal is closed. For now.'
        });
    }

    const commandString = req.body.command?.toString();
    const commandOutput = Terminal.getInstance().getOutput(commandString);

    BusinessLogger.info(`Command ${commandString} executed.`);

    let status = 200;
    let body = {
        commandOutput: commandOutput,
    };

    if (commandOutput.startsWith('/invite')) {
        status = 202;
        body.redirect = commandOutput;
    }

    return res.status(status).json(body).end();
});

export default router;
