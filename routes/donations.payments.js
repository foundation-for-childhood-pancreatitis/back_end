const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const squareConnect = require('square-connect');

const accessToken = process.env.SQUARE_TOKEN

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static(__dirname));

const defaultClient = squareConnect.ApiClient.instance;
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;

defaultClient.basePath = 'https://connect.squareupsandbox.com';

router.post('/donation', async (req,res) =>{
    const request_params = req.body;
    const idempotency_key = crypto.randomBytes(22).toString('hex');
    const payments_api = new squareConnect.PaymentsApi();
  
  const request_body = {
    source_id: request_params.nonce,
    amount_money: {
      amount: request_params.amount_money, // $1.00 charge
      currency: 'USD'
    },
    idempotency_key: idempotency_key
  };
  try {
    const response = await payments_api.createPayment(request_body);
    res.status(200).json({
      'title': 'Payment Successful',
      'result': response
    });
  } catch(error) {
    res.status(500).json({
      'title': 'Payment Failure',
      'result': error.response.text
    });
  }
});

module.exports = router
