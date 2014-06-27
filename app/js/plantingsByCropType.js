_ = require('underscore');

module.exports = function (plantingsArr) {
    var res={};
    _.each(plantingsArr, function(planting){
        if (!res[planting.cropType]){
            res[planting.cropType] = [];
        }

        res[planting.cropType].push(planting);
    });

    return res;

};