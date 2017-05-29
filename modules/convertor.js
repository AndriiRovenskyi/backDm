
var fs = require("fs");



var addImage = function (firespace) {
    var data = firespace.img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    var space = "/image/prod" + firespace.nameCommoditiesEng + firespace.id_sub + ".png";
    fs.writeFile("."+space, buf);
    return space;
};

var addNewsImage = function (news) {
    var data = news.img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    var space = "/image/news" + news.nameNewUa + ".png";
    fs.writeFile("." + space, buf);
    return space;
};

var addImageSubCat = function (sub) {
    var data = sub.img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    var space = "/image/sub" + sub.nameSubEng + sub.id_cat + ".png";
    fs.writeFile("."+space, buf);
    return space;
};

var removeImage = function (img) {
    if(img){
        fs.unlink("."+img, function (err) {
            // if (err) throw err;
            console.log('successfully deleted image');
        });
    }else{
        console.log('image not found');
    }
};

var updateImageSub = function (sub,image) {
    if(sub.img!=null){
        sub.img = addImageSubCat(sub);
        // image(sub.id,function (data) {
        //     removeImage(data);
        // });
        return sub;
    }
    return sub;
};

var updateImageNew = function (news,image) {
    if(news.img!=null){
        image(news.id,function (data) {
            removeImage(data);
        });


        return news;
    }
    return news;
};


var updateImage = function (firespace,image) {
    if(firespace.img!=null){
       firespace.img = addImage(firespace);
        news.img = addNewsImage(news);
        image(firespace.id,function (data) {
            removeImage(data);

        });
       return firespace;
    }
    return firespace;
};



exports.images = {
    addImage: addImage,
    removeImage: removeImage,
    updateImage: updateImage,
    addImageSubCat: addImageSubCat,
    updateImageSub: updateImageSub,
    updateImageNew: updateImageNew,
    addNewsImage: addNewsImage,
};