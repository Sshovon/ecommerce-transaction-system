const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactionModel");
const Account = require('../models/accountModel');


router.post("/", async (req, res) => {
  try {
    const { inID, outID, amount } = req.body;
    const transaction = new Transaction({ inID, outID, amount });
    const inAccount = await Account.findOne({ accountNumber: inID });
    const outAccount = await Account.findOne({ accountNumber: outID });

    inAccount.balance = inAccount.balance + parseInt(amount);
    outAccount.balance = outAccount.balance - parseInt(amount);

    await transaction.generateTrx();
    await Promise.all([inAccount.save(),outAccount.save()]);

    //console.log(transaction)
    //await transaction.save();
    //console.log(transaction)
    res.send({
      status: "success",
      trxID: transaction.trxID,
    });
  } catch (e) {
    res.status(404).send({ e });
  }
});

module.exports = router;
