var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '221096',
    database: 'Fire'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected...')
});


function dublErr(err, callback) {
    if(err){
        if(err.errno===1062){
            callback('Dublicate Error');
        }else{
            throw err;
        }
        return false;
    }else{
        return true;
    }
};

// METHODS with SubCategory

var getSubCategories = function (callback) {
    connection.query('select * from subCategories',function (err,rows) {
        if(err) throw err;
        callback(rows);
    });
};

var addSubCategory = function (subCat,callback) {
    connection.query('insert into subCategories(nameSub,id_cat) value (?,?)',[subCat.nameSub,subCat.id_cat],function (err,rows) {
       if(dublErr(err,callback))
            connection.query('select * from subCategories where id_cat = ? and nameSub = ?',[subCat.id_cat,subCat.nameSub],function (err,rows) {
                if(err) throw err;
                callback(rows);
            })
    });
};

var updateSubCategory = function (subCat,callback) {
    connection.query('update subCategories set nameSub = ? , id_cat = ? where id = ?',[subCat.nameSub,subCat.id_cat,subCat.id],function (err,rows) {
        if(dublErr(err,callback))
        callback(subCat);
    });
};

var removeSubCategories = function (id,callback) {
    connection.query('delete from subCategories where id = ?',[id],function (err,rows) {
        if(err) throw err;
        callback(true);
    });
};

//METHOD with Commodities

var getCommodities = function (callback) {
    connection.query('select * from Commodities',function (err,rows) {
        if(err) throw err;
        callback(rows);
    });
};

var getCommoditiesFromSub = function (id_sub, callback) {
    connection.query('select * from Commodities where id_sub = ?',[id_sub],function (err,rows) {
        if(err) throw err;
        callback(rows);
    });
};


var addCommodity = function (com,callback) {
    connection.query('insert into Commodities(nameCommodities, description, price, id_sub, img) value (?,?,?,?,?)',
        [com.nameCommodities, com.description, com.price, com.id_sub, com.img],function (err,rows) {
        if(dublErr(err,callback))
            connection.query('select * from Commodities where id_sub = ? and nameCommodities = ?',[com.id_sub,com.nameCommodities],function (err,rows) {
                if(err) throw err;
                callback(rows);
            })
    });
};

var updateCommodity = function (com,callback) {
    if(com.img != null){
        connection.query('update Commodities set nameCommodities = ?, description = ?, price = ?, id_sub = ?, img = ? where id = ?',
            [com.nameCommodities, com.description, com.price, com.id_sub, com.id, com.img],function (err,rows) {
                if(dublErr(err,callback))
                    callback(com);
            });
    }else{
        connection.query('update Commodities set nameCommodities = ?, description = ?, price = ?, id_sub = ? where id = ?',
            [com.nameCommodities, com.description, com.price, com.id_sub, com.id],function (err,rows) {
                if(dublErr(err,callback))
                    callback(com);
            });
    };
};

var removeCommodity = function (id,callback) {
    getImageComm(id,callback);
        connection.query('delete from Commodities where id = ?',[id],function (err,rows) {
            if(err) throw err;
        });
};


var getImageComm = function (id,callback) {
    connection.query("select img from Commodities where id = ?",[id],function (err,rows) {
        if(err) throw err;
        callback(rows[0].img);
    });
};

//METHODS with News

var addNews = function (news,callback) {
    connection.query('insert into News(nameNew,description) value (?,?)',[news.nameNew,news.description],function (err,rows) {
        if(dublErr(err,callback))
            connection.query('select * from News where nameNew = ?',[news.nameNew],function (err,rows) {
                if(err) throw err;
                callback(rows);
            })
    });
};

var getNews = function (callback) {
    connection.query('select * from News',function (err,rows) {
        if(err) throw err;
        callback(rows);
    });
};

var removeNew =  function (id,callback) {
    getImageComm(id,callback);
    connection.query('delete from News where id = ?',[id],function (err,rows) {
        if(err) throw err;
    });
};

var updateNew = function (news,callback) {
    connection.query('update News set nameNew = ? , description = ? where id = ?',[news.nameNew,news.description,news.id],function (err,rows) {
        if(dublErr(err,callback))
            callback(news);
    });
};







exports.db = {
    getSub: getSubCategories,
    addSub: addSubCategory,
    updateSub: updateSubCategory,
    removeSub: removeSubCategories,
    getCommod: getCommodities,
    getCommodFromSub: getCommoditiesFromSub,
    addCommod: addCommodity,
    updateCommod: updateCommodity,
    removeCommod: removeCommodity,
    getImg: getImageComm,
    getNews: getNews,
    addNews: addNews,
    removeNews: removeNew,
    updateNews: updateNew
};

/*
1    Delete/update/add/get news
2    Delete/update/add/get commodities
2    Delete/update/add/get category
 */




/*
var createDb = function () {
    connection.query(`create database Fire;
use Fire;

CREATE TABLE Categories(
	id int primary key auto_increment,
    nameCategories varchar(36)
);

CREATE TABLE Commodities(
	id int primary key auto_increment,
    nameCommodities varchar(36),
    description varchar(255),
    id_cat int
);

#one to many from category to commodity
alter table Commodities add constraint foreign key(id_cat) references Categories(id);

select * from  Commodities com  join Categories cat on com.id_cat = cat.id
 where cat.nameCategories = 'category1';`);
};*/