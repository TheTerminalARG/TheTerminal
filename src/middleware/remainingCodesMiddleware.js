import CodeManager from "../service/CodeManager.js";

const checkAllCodesUsed = (req, res, next) => {
    try {
        const codes = CodeManager.getInstance().getCodes();

        const allCodesUsed = codes.every(code => code.used === true);

        if (allCodesUsed) {
            return res.render('all-codes-used');
        }

        return next();
    } catch (error) {
        console.error('Error checking codes:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default checkAllCodesUsed;
