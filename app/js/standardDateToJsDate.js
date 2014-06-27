
module.exports = function standardDateToJsDate (dateString) {
        var arr = dateString.split("-");
        return new Date(arr[0], arr[1]-1, arr[2]);
};