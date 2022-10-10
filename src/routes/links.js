import express from 'express';

const router = express.Router();

router.get('/add', (req, res) => {
    console.log(req.body);
    res.json('recibido')
});

router.post('/add', (req, res) => {
    
    const {username, password, fullname} = req.body
    console.log(datos);
    res.json('recibido')
});

export default router;