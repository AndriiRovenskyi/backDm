
var fs = require("fs");



var addImage = function (firespace) {
    var data = firespace.img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    var space = "./image/" + firespace.nameCommodities + firespace.id_sub + ".png";
    fs.writeFile(space, buf);
    return space;
};

var addImageSubCat = function (sub) {
    var data = sub.img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    var space = "./image/" + sub.nameSubEng + sub.id_cat + ".png";
    fs.writeFile(space, buf);
    return space;
};

var removeImage = function (img) {
    if(img){
        fs.unlink(img, function (err) {
            if (err) throw err;
            console.log('successfully deleted image');
        });
    }else{
        console.log('image not found');
    }
};

var updateImageSub = function (sub,image) {
    if(sub.img!=null){
        sub.img = addImageSubCat(sub);
        image(sub.id,function (data) {
            removeImage(data);
        });
        return sub;
    }
    return sub;
};

var updateImage = function (firespace,image) {
    if(firespace.img!=null){
       firespace.img = addImage(firespace);
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
    updateImageSub: updateImageSub
};