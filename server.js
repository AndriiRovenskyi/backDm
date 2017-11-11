var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./modules/db').db;
var fs = require('fs');
var images = require('./modules/convertor').images;
var app = express();
var cors = require('cors');


var auth = function(req, res, next) {
    if (req.get('Authorization') == '143a6f74056707f6b14875ec6ca4f2eb16f5d0781f7e1cb82bd441b4438b43d3')
        return next();
    else
        return res.sendStatus(401);
};

app.use(bodyParser.json({limit: '50mb'}));



app.use(cors());


app.post('/signIn',  function (req,res) {
    var json = fs.readFileSync("./data.json");
    var pass = JSON.parse(json).pass;
    if (!req.body.login || !req.body.password) {
        res.send(false);
    } else if (req.body.login === "admin" && req.body.password === pass) {

        res.send({token:'143a6f74056707f6b14875ec6ca4f2eb16f5d0781f7e1cb82bd441b4438b43d3'});
    } else {
        res.send(false);
    }
});

app.put('/update-password',  function (req,res) {
    var json = fs.readFileSync("./data.json");
    var admin = JSON.parse(json);
    if (!req.body.login || !req.body.password) {
        res.send(false);
    } else if (req.body.login === "admin" && req.body.password === admin.pass) {
        admin.pass = req.body.newPassword;
        fs.writeFile('./data.json',JSON.stringify(admin),function (err,data) {
            if(err) throw err;
            res.send(true);
        })
    } else {
        res.send(false);
    }
});


//для апі

app.get('/', function (req,res) {
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

app.delete('/subCategory/delete/:id',  auth ,function (req,res) {
    var id = req.params.id;
    console.log(req.get('Authorization'));
    db.removeSub(id,function (data) {
        images.removeImage(data);
        res.send(true);
    });
});

app.get('/subCategory/get',  function (req,res) {
    db.getSub(function (data) {
        res.send(data);
    });
});


app.get('/subCategory/getone/:id',  function (req,res) {
    var id = req.params.id;
    db.getSubById(id, function (data) {
        res.send(data);
    });
});

app.post('/subCategory/add',  auth ,function (req,res) {
    var obj = req.body;
    obj.img = images.addImageSubCat(obj);
    db.addSub(obj,function (data) {
        res.send(data);
    });
});

app.put('/subCategory/update',  auth ,function (req,res) {
    var obj = req.body;
    db.updateSub(images.updateImageSub(obj,db.getImageSub),function (data) {
        res.send(data);
    });
});

// All methods for commodities

app.delete('/commodity/delete/:id',  auth ,function (req,res) {
    var id = req.params.id;
    db.removeCommod(id,function (data) {
        images.removeImage(data);
        res.send(true);
    });
});

app.get('/commodity/get', function (req,res) {
    console.log();
    console.log("sssssssssssssss");
    db.getCommod(function (data) {
        res.send(data);
    });
});

app.get('/commodity/get/:id',  function (req,res) {
    var id = req.params.id;
    db.getCommodFromSub(id,function (data) {
        res.send(data);
    });
});

app.post('/commodity/add',  auth ,function (req,res) {
    var obj = req.body;
    obj.img = images.addImage(obj);
    db.addCommod(obj,function (data) {
        res.send(data);
    });
});

app.put('/commodity/update',  auth ,function (req,res) {
    var obj = req.body;
    db.updateCommod(images.updateImage(obj,db.getImg),function (data) {
        res.send(data);
    });
});

//All methods for News

app.get('/news/get',  function (req,res) {
    db.getNews(function (data) {
        res.send(data);
    })
});

app.post('/news/add',  auth ,function (req,res) {
    var obj = req.body;
    obj.img = images.addNewsImage(obj);
    console.log(obj);
    db.addNews(obj,function (data) {
        res.send(data);
    });
});

app.put('/news/update',  auth ,function (req,res) {
    var obj = req.body;
    db.updateNews(images.updateImageNew(obj,db.getImageNews),function (data) {
        res.send(data);
    });
});

app.delete('/news/delete/:id',  auth ,function (req,res) {
    var id = req.params.id;
    db.removeNews(id,function (data) {
        res.send(data);
    })
});

app.get('/news/getone/:id',  function (req,res) {
    var id = req.params.id;
    db.getNewsByID(id, function (data) {
        res.send(data);
    });
});
app.get('/commodities/getone/:id',  function (req,res) {
    var id = req.params.id;
    db.getComByID(id, function (data) {
        res.send(data);
    });
});






app.use(function(req, res, next) {
    res.status(404).send('Вибачте, такої сторінки не існує!');
});

app.listen(8081,function () {
    console.log('listen on server')
});
