const express = require('express');
const mongoose = require('mongoose');
const router = express();

const Event = require('../models/Event.js');

router.get('/',(req,res) => {
    Event.find()
        .then(value =>  res.send({value}))
        .catch(err => console.log(err));
});
module.exports = router;