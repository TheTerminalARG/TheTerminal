import Router from "express";

const router = Router();

router.get('/', (req, res) => {
    return res.render('about');
});

export default router;
