const express = require('express');
const cors = require('cors');
const app = express();
const Account = require('./public/functions').instance;
var fs = require('fs');

app.use(cors());

app.use(express.static('public'));

app.get('/', async function(req, res, next) {
    try {
        const history = await Account.getTransactionHistory();
    
        res.status(200).send(history);
      } catch (e) {
        console.error(e);
        res.status(400).send({ message: 'invalid status value' });    
      }
});

app.post('/transaction', async function(req, res, next) {
    try {
      const transaction = await Account.commitTransaction(req.headers);
  
      res.status(200).send(transaction);
    } catch (e) {
      console.error(e);
      res.status(403).send({ message: 'transaction refused' });    
    }
  });

  app.get('/transaction/:id/', async function(req, res, next) {
    try {
      const transaction = await Account.getTransactionById(req.params.id);
      if (transaction) {
        return res.status(200).send(transaction);
      }
  
      res.status(404).send({ message: 'transaction not found' });
    } catch (e) {
      console.error(e);
      res.status(422).send({ message: 'invalid ID supplied' });
    }
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
