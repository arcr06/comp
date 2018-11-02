const express = require('express');
const router = express();
const tools = require('../routers/func');
router.post('/',(req,res) => {
    tools.sendMsg('IT_MANAGER');
    res.send({done: 'sdsdsdsds'});
});
module.exports = router;

