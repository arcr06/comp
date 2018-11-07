const express = require('express');
const tools = require('../routers/func.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const Admin = require('./adminModel');
const Event = require('../models/Event');
const router = express();

const foo = require('../routers/func');

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Admin.findOne({username})
        .then((user => {
            if(!user) {
                res.status(400).json({data: 'Username dosen\'t exists'})
            } else {
                bcrypt.compare(password,user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {id: user.id, username: user.username}
                            jwt.sign(payload,keys.secretKey,{expiresIn: 36000000}, (err,token) => {
                                res.json({success: true, auth: 'zxcvbnm', token: 'Bearer ' + token})
                            });
                        } else {
                            res.status(400).json({data: 'Password is incorrect'});
                        }
                    })
                    .catch(err => res.status(400).json({data: 'something went wrong try again'}));
            }
        }))
        .catch(err => {
            res.status(500).json({err: 'try again'})
            console.log(err);
        });
});

router.post('/update',passport.authenticate('jwt' ,{session: false}), (req,res) => {
    
 //update syntax yet to be added
 const msg = {
    title: 'IT_MANAGER',
    topic: 'IT_MANAGER',
    desc: 'SIMPLE NOTIFICATION'
 }
 foo.sendMsg(msg);
});
 
router.post('/delete',passport.authenticate('jwt' ,{session: false}), (req,res) => {
    const type = req.body.type;
    Event.findOneAndDelete({title: type})
        .then(() => res.json({success: 'Removed successfully'}))
        .catch(err => console.log(err));

});
router.post('/create', passport.authenticate('jwt', {session: false}),(req,res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const people = req.body.people;
    const newEvent = new Event({
        title,
        desc,
        people
    })
    newEvent.save()
        .then(data =>  res.send({success: 'succesfullty saved'}))
        .catch(err => res.status(400).send({err: 'didnt save some sevre problem',check: err}))
});
module.exports = router;

