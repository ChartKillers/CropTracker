var $ = require ('jquery');
var getDailyHighLow = require('./getDailyHighLow');

$(function () {

getDailyHighLow(235, '1-0-2014', '5-0-2014', function(data){
    console.log(data);
})


});