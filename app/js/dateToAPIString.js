//dateToAPIString.js


//take date object and convert to correct format for string
module.exports = function dateToAPIString (d) {

    var str = "";

    var yr  = d.getFullYear();
    var mo  = d.getMonth() + 1;
    var day = d.getDate();

    if (mo<10)  { mo  = "0" + mo;  }
    if (day<10) { day = "0" + day; }

    str = yr + "-" + mo + "-" + day;

    return str;

};
