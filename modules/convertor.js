
var fs = require("fs")
var deleteImage = function (firespace) {

};


var addImage = function (firespace) {
    var data = firespace.img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    var space = "./image/" + firespace.nameCommodities + firespace.id_sub + ".png";
    fs.writeFile(space, buf);
    return space;
};

var removeImage = function (img) {
    fs.unlink(img, function (err) {
        if (err) throw err;
        console.log('successfully deleted image');
    });
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
    updateImage: updateImage
};