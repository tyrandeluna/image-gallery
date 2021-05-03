const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const api = express();
const porta = 3000;
const router = express.Router();

const galeriaRouter = require('./router/galeriaRouter');

api.use(cors());

api.use(express.urlencoded({ extended: true }));
api.use(express.json({limit: '20mb', extended: true}));

api.use('/public', express.static('public'));

router.get('/', (req, res)=> res.json({
    mensagem: "API Online..."
}));

api.use('/', router);
api.use('/galeria', galeriaRouter);

api.listen(porta);

console.log('Run API Express');