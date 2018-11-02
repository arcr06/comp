const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const eventUpdates = require('./routers/eventUpdates');
const eventUpdator =  require('./admin/eventUpdator');
const subscriber = require('./routers/subscriber');
const Event = require('./models/Event');
const sendMsg = require('./routers/func');
// mongoose.connect('mongodb://localhost/composite', {useNewUrlParser: true})
//     .then(() =>  console.log('Mongo Connected'))
//     .catch(err => console.log(err));


const db = require('./config/mongoKey').mongoURL;
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log('Mongodb connected...'))
    .catch(err => console.log(err));
    
// const newEvent = new Event({
//             title: 'CODING',
//             desc: 'THERE WILL 4 ROUNDS',
//             people: [
//                 'person -1',
//                 'person -2',
//                 'person -3',
//                 'person -4',
//                 'person -7'
//             ]
// })
// newEvent.save()
//     .then(() => console.log('saved'))
//     .catch(err => console.log(err));

    
// Event.replaceOne({title: 'GAMING'}, {
//     title: 'GAMING',
//     desc: 'THERE WILL E PEOPLE',
//     people: [
//         'person -1'
//     ]
// })
// newEvent.save()
//     .then(() => console.log('saved'))
//     .catch(err => console.log(err));

// Event.find()
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// sendMsg({title: 'alwin',body: 'some body', topic: 'composite'});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

app.use('/', subscriber);
app.use('/eventupdates', eventUpdates);
app.use('/admin/eventupdator', eventUpdator)

//ALWYS AT THE END OF THE PAGE
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'/build/index.html'));
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App started in Port:${port}`);
});


