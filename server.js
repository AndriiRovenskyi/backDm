var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./modules/db').db;
var fs = require('fs');
var images = require('./modules/convertor').images;
var app = express();
var cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

//для апі

app.get('/',function (req,res) {
    res.send('Hello server API !!!');
});


app.use(express.static( path.join(__dirname + "/")));


/*
// Add headers // Кросдоменні запити
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    // Pass to next layer of middleware
    next();
});

*/

// All methods for subcategories

app.delete('/subCategory/delete/:id',function (req,res) {
    var id = req.params.id;
    db.removeSub(id,function (data) {
        images.removeImage(data);
        res.send(true);
    });
});

app.get('/subCategory/get',function (req,res) {
    db.getSub(function (data) {
        res.send(data);
    });
});

app.post('/subCategory/add',function (req,res) {
    var obj = req.body;
    obj.img = images.addImageSubCat(obj);
    db.addSub(obj,function (data) {
        res.send(data);
    });
});

app.put('/subCategory/update',function (req,res) {
    var obj = req.body;
    db.updateSub(images.updateImageSub(obj,db.getImageSub),function (data) {
        res.send(data);
    });
});

// All methods for commodities

app.delete('/commodity/delete/:id',function (req,res) {
    var id = req.params.id;
    db.removeCommod(id,function (data) {
        images.removeImage(data);
        res.send(true);
    });
});

app.get('/commodity/get',function (req,res) {
    db.getCommod(function (data) {
        res.send(data);
    });
});

app.get('/commodity/get/:id',function (req,res) {
    var id = req.params.id;
    db.getCommodFromSub(id,function (data) {
        res.send(data);
    });
});

app.post('/commodity/add',function (req,res) {
    var obj = req.body;
    obj.img = images.addImage(obj);
    db.addCommod(obj,function (data) {
        res.send(data);
    });
});

app.put('/commodity/update',function (req,res) {
    var obj = req.body;
    db.updateCommod(images.updateImage(obj,db.getImg),function (data) {
        res.send(data);
    });
});

//All methods for News

app.get('/news/get',function (req,res) {
    db.getNews(function (data) {
        res.send(data);
    })
});

app.post('/news/add',function (req,res) {
    var obj = req.body;
    db.addNews(obj,function (data) {
        res.send(data);
    });
});

app.put('/news/update',function (req,res) {
    var obj = req.body;
    db.updateNews(obj,function (data) {
        res.send(data);
    })
});

app.delete('/news/delete/:id',function (req,res) {
    var id = req.params.id;
    db.removeNews(id,function (data) {
        res.send(data);
    })
});




app.use(function(req, res, next) {
    res.status(404).send('Вибачте, такої сторінки не існує!');
});

app.listen(8080,function () {
    console.log('listen on server')
});