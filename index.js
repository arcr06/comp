const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const types = require('./routers/types');
const eventUpdates = require('./routers/eventUpdates');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));


app.use('/types', types);
app.use('/eventupdates', eventUpdates);


//ALWYS AT THE END OF THE PAGE
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'/build/index.html'));
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App started in Port:${port}`);
});


