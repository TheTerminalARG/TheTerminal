import Router from 'express';

const router = Router();

router.all('*', (req, res) => {
    return res.status(404).render('404');
});

export default router;
