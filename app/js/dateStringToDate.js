//dateStringToDate.js


//expecting date string in format dd-mm-yyyy with month starting at 0
module.exports = function dateStringToDate (dateStr) {

    var arr = dateStr.split("-");
    if (arr.length!==3){ return false; }

    return new Date(arr[2], arr[1], arr[0]);

};