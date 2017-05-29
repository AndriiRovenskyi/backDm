

var ol = (function () {
 var kaka = 'petro';
    function nana(x) {
        this.name = x;
    };

    getKak = function () {
        return kaka;
    };
    return {
        nana: nana,
        getKak: getKak
    }
})();


ol.nana('jejje');

console.log(ol.getKak());

// let oleh = new Oleh('Oleh','Khomyk');
// console.log(oleh);
