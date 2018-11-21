const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const app = express();

const eventUpdates = require('./routers/eventUpdates');
const eventUpdator =  require('./admin/eventUpdator');
const subscriber = require('./routers/subscriber');
const Event = require('./models/Event');

const Admin = require('./admin/adminModel');


mongoose.connect('mongodb://localhost/composite', {useNewUrlParser: true})
    .then(() =>  console.log('Mongo Connected'))
    .catch(err => console.log(err));

// const db = require('./config/keys').mongoURL;
// mongoose.connect(db,{ useNewUrlParser: true })
//     .then(() => console.log('Mongodb connected...'))


    // const newAdmin = new Admin({
    //     username: 'genSalt10',
    //     password: '.HashedPassword.4321.'
    // });
    // bcrypt.genSalt(10, (err,salt) => {
    //     bcrypt.hash(newAdmin.password, salt,(err, hash) => {
    //         if(err) throw err;
    //         newAdmin.password = hash;
    //         newAdmin.save()  
    //         .then(user => res.json(user))
    //         .catch((err) => console.log(err));
    //     });
    // });
    

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/', subscriber);
app.use('/eventupdates', eventUpdates);
app.use('/admin', eventUpdator)

//ALWYS AT THE END OF THE PAGE
app.get('firebase-messaging-sw.js',(req,res) => {
    res.sendFile(path.join(__dirname,'/build/firebase-messaging-sw.js'));
});
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'/build/index.html'));
});
  
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App started in Port:${port}`);
});


