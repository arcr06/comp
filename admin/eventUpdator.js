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
                            jwt.sign(payload,keys.secretKey,{expiresIn: 3600}, (err,token) => {
                                res.json({success: true, auth: 'zxcvbnm', token: 'Bearer ' + token})
                            });
                        } else {
                            res.status(400).json({data: 'Password is incorrect'});
                        }
                    })
                    .catch(err => res.status(400).json({data: 'Something went wrong try again'}));
            }
        }))
        .catch(err => {
            res.status(500).json({data: 'Try again'})
        });
});

router.post('/update',passport.authenticate('jwt' ,{session: false}), (req,res) => {
    const data = {
        title: req.body.title,
        desc: req.body.desc,
        people: req.body.people,
        round: req.body.round
    }
    Event.findOneAndUpdate({title: req.body.title}, {$set: {...data}}, {new: true}, (err,doc) => {
        if(err) {
            res.status(400).send({data: 'Mongo db err'})
        } else {
            const msg = {
                title: req.body.title,
                topic: req.body.title,
                desc: req.body.desc
            } 
            foo.sendMsg(msg);
            res.send({data: `Sucessfully Updated!. Push has been been sen for ${msg.title} subscribers`})
        }
    })
});
 
router.post('/delete',passport.authenticate('jwt' ,{session: false}), (req,res) => {
    const type = req.body.type;
    Event.findOneAndDelete({title: type})
        .then(() => {
            res.json({success: 'Removed successfully'})
        })
        .catch(err => res.status(400).send({data: 'Mongo err Contact admin for this error'}));
});
router.post('/create', passport.authenticate('jwt', {session: false}),(req,res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const people = req.body.people;
    const round = req.body.round;
    const newEvent = new Event({
        title,
        desc,
        people,
        round
    })
    newEvent.save()
        .then(data =>  {
            res.send({success: 'succesfullty saved'})
        })
        .catch(err => res.status(400).send({data: 'didnt save some sevre problem',check: err}))
});
module.exports = router;

