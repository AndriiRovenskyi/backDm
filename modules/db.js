var mysql = require('mysql');

var connection = mysql.createConnection({
    // host: 'dmstone.mysql.ukraine.com.ua',
    // user: 'dmstone_fire',
    // password: 'dt75b7j4',
    // database: 'dmstone_fire'
    host: 'localhost',
    user: 'root',
    password: 'arv34',
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

var getSubById = function (id, callback) {
    connection.query('select * from subCategories where id_cat = ' + id,function (err,rows) {
        if(err) throw err;
        console.log(rows)
        callback(rows);
    });
};

var getComByID = function (id, callback) {
    connection.query('select * from Commodities where id= ' + id,function (err,rows) {
        if(err) throw err;
        callback(rows);
    });
};


var addSubCategory = function (subCat,callback) {
    console.log(subCat)
    connection.query('insert into subCategories(nameSubRu,nameSubUa,nameSubEng,nameSubPl,img,id_cat) value (?,?,?,?,?,?)',[subCat.nameSubRu,subCat.nameSubUa,subCat.nameSubEng,subCat.nameSubPl,subCat.img,subCat.id_cat],function (err,rows) {
        if(dublErr(err,callback))
            connection.query('select * from subCategories where id_cat = ? and nameSubEng = ?',[subCat.id_cat,subCat.nameSubEng],function (err,rows) {
                if(err) throw err;
                callback(rows);
            })
    });
};

var updateSubCategory = function (subCat,callback) {
    console.log("1")

    if(subCat.img != null) {
        connection.query('update subCategories set nameSubRu = ? ,nameSubUa = ? , nameSubEng = ?, nameSubPl = ?, id_cat = ?, img = ? where id = ?', [subCat.nameSubRu,subCat.nameSubUa, subCat.nameSubEng, subCat.nameSubPl, subCat.id_cat, subCat.id, subCat.img], function (err, rows) {
            if (dublErr(err, callback))
                console.log("2")
                callback(subCat);
        });
    }else{
        connection.query('update subCategories set nameSubRu = ? ,nameSubUa = ? , nameSubEng = ?, nameSubPl = ?, id_cat = ? where id = ?', [subCat.nameSubRu,subCat.nameSubUa, subCat.nameSubEng, subCat.nameSubPl, subCat.id_cat, subCat.id], function (err, rows) {
            if (dublErr(err, callback))
                connection.query('select * from subCategories where id = ?',[subCat.id],function (err,rows) {
                    if(err) throw err;
                    callback(rows);
                })
        });
    }
};

var removeSubCategories = function (id,callback) {
    getImageSub(id,callback);
    connection.query('delete from subCategories where id = ?',[id],function (err,rows) {
        if(err) throw err;
    });
};

var getImageSub = function (id,callback) {
    connection.query("select img from subCategories where id = ?",[id],function (err,rows) {
        if(err) throw err;
        callback(rows[0].img);
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
    connection.query('insert into Commodities(nameCommoditiesRu,nameCommoditiesUa,nameCommoditiesEng,nameCommoditiesPl, descriptionRu,descriptionUa,descriptionEng,descriptionPl,  id_sub, img) value (?,?,?,?,?,?,?,?,?,?)',
        [com.nameCommoditiesRu,com.nameCommoditiesUa,com.nameCommoditiesEng,com.nameCommoditiesPl, com.descriptionRu,com.descriptionUa, com.descriptionEng, com.descriptionPl, com.id_sub, com.img],function (err,rows) {
            if(dublErr(err,callback))
                connection.query('select * from Commodities where id_sub = ? and nameCommoditiesEng = ?',[com.id_sub,com.nameCommoditiesEng],function (err,rows) {
                    if(err) throw err;
                    callback(rows);
                })
        });
};

var updateCommodity = function (com,callback) {
    if(com.img != null){
        connection.query('update Commodities set nameCommoditiesRu = ?,nameCommoditiesUa = ?,nameCommoditiesEng = ?,nameCommoditiesPl = ?, descriptionRu = ?,descriptionUa = ?,descriptionEng = ?,descriptionPl = ?,  id_sub = ?, img = ? where id = ?',
            [com.nameCommoditiesRu,com.nameCommoditiesUa,com.nameCommoditiesEng,com.nameCommoditiesPl, com.descriptionRu,com.descriptionUa,com.descriptionEng,com.descriptionPl, com.id_sub, com.id, com.img],function (err,rows) {
                if(dublErr(err,callback))
                    callback(com);
            });
    }else{
        connection.query('update Commodities set nameCommoditiesRu = ?,nameCommoditiesUa = ?,nameCommoditiesEng = ?,nameCommoditiesPl = ?, descriptionRu = ?,descriptionUa = ?,descriptionEng = ?,descriptionPl = ?, id_sub = ? where id = ?',
            [com.nameCommoditiesRu,com.nameCommoditiesUa,com.nameCommoditiesEng,com.nameCommoditiesPl, com.descriptionRu, com.descriptionUa,com.descriptionEng,com.descriptionPl, com.id_sub, com.id],function (err,rows) {
                if(dublErr(err,callback))
                    callback(com);
            });
    }
};

var getImageComm = function (id,callback) {
    connection.query("select img from Commodities where id = ?",[id],function (err,rows) {
        if(err) throw err;
        callback(rows[0]);
    });
};

var removeCommodity = function (id,callback) {
    getImageComm(id,callback);
    connection.query('delete from Commodities where id = ?',[id],function (err,rows) {
        if(err) throw err;
    });
};


//METHODS with News

var addNews = function (news,callback) {
    connection.query('insert into News(nameNewEng,nameNewRu,nameNewUa, nameNewPl, descriptionRu , descriptionUa ,descriptionEng, descriptionPl, img) value (?,?,?,?,?,?,?,?)',[news.nameNewEng,news.nameNewRu,news.nameNewUa,news.nameNewPl,news.descriptionRu,news.descriptionUa, news.descriptionEng, news.descriptionPl, news.img],function (err,rows) {
        if(dublErr(err,callback))
            connection.query('select * from News where nameNewEng = ?',[news.nameNewEng],function (err,rows) {
                if(err) throw err;
                callback(rows);
            })
    });
};

var getImageNews = function (id,callback) {
    connection.query("select img from News where id = ?",[id],function (err,rows) {
        if(err) throw err;
        callback(rows[0].img);
    });
};

var getNews = function (callback) {
    connection.query('select * from News',function (err,rows) {
        if(err) throw err;
        callback(rows);
    });
};
var getNewsByID = function (id, callback) {
    connection.query('select * from News where id = ' + id,function (err,rows) {
        if(err) throw err;
        callback(rows);
    });
};



var removeNew =  function (id,callback) {
    connection.query('delete from News where id = ?',[id],function (err,rows) {
        if(err) throw err;
        callback(true);
    });
};

var updateNew = function (news,callback) {
    if(news.img != null){
        connection.query('update News set nameNewEng = ? , nameNewRu = ? ,nameNewUa = ? , nameNewPl = ? , descriptionRu = ?,descriptionUa = ?, descriptionEng = ?,descriptionPl = ?, img = ? where id = ?',[news.nameNewEng,news.nameNewRu,news.nameNewUa,news.nameNewPl,news.descriptionRu,news.descriptionUa,news.descriptionEng,news.descriptionPl,news.img,news.id],function (err,rows) {
            if(dublErr(err,callback))
                callback(news);
        })}
    else{
        connection.query('update News set nameNewEng = ? , nameNewRu = ? ,nameNewUa = ? , nameNewPl = ? , descriptionRu = ?,descriptionUa = ?, descriptionEng = ?,descriptionPl = ? where id = ?',[news.nameNewEng,news.nameNewRu,news.nameNewUa,news.nameNewPl,news.descriptionRu,news.descriptionUa,news.descriptionEng,news.descriptionPl,news.id],function (err,rows) {
            if(dublErr(err,callback))
                callback(news);
        })
    }
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
    updateNews: updateNew,
    getImageSub: getImageSub,
    getImageNews: getImageNews,
    getSubById: getSubById,
    getNewsByID: getNewsByID,
    getComByID: getComByID

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
