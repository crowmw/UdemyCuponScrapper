var Xray = require("x-ray");
var fs = require('fs');

var xray = new Xray();
var url = 'https://www.udemy.com/react-redux-tutorial/?couponCode='

var i=1;
var results = [];
scrap(i);

function scrap(index){
    var code = Math.floor(Math.random()*900000) + 100000;
    xray(url+leftPad(code,6).toString(), '.current-price')(function(err, price){
        if(err) {return console.log(err)}
        results.push({price: price.trim(), code: leftPad(i,6)})
        console.log('\n\ncupon: '+leftPad(code, 6)+'\nprice: '+price.trim());
        i++;
        if(i<=100){
            scrap(i);
        }
        else {
            writeFile();
        }
    })
}

function writeFile(){
    var s = JSON.stringify(results);
    console.log('s',s);
    var p = JSON.parse(s);
    console.log('p',p);
    fs.writeFile('results.json', s, function(err) {
        if(err) { return console.log(err); }
        console.log("File saved!");
    })
}

function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}