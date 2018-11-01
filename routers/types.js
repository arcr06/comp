const express = require('express');
const router = express();

router.post('/',(req,res) => {
    console.log(req.body);
    res.send({array: req.body})
});

module.exports = router;