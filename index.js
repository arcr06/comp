const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

app.get('/super',(req,res) => {
    res.send({value:'hello wolrd'});
});
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'/build/index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App started in Port:${port}`);
});


