//script to test xlsx modules
var xlsx = require ("xlsx");
var wb = xlsx.readFile("file1.xlsx", {cellDates:true});
var ws = wb.Sheets["Sheet1"];

var data = xlsx.utils.sheet_to_json(ws);

console.log(data);

var newData = data.map(function(record){
    record.Net = reecord.Sales - record.Cost;
    delete record.Sales;
    delete record.Cost;
});

var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(newData);
xlsx.utils.book_append_sheet(newWB, newWS,"New Data");

xlsx.writeFile(newWB, "New Data File.xlsx");


my = {"name":"John", "age":30, "car":10};
my2 = {"name":"jack", "age":5, "car":10};
my3 = {"name2":"jack2", "major":"math"};
result = {};
resultArray = [];

if(my3.name2.includes(my2.name)){
    result = Object.assign({}, my2, my3);
    resultArray.concat(result);
    console.log(result);
    console.log(resultArray);
}
// var newObj = Object.assign({}, my2, my3);
// console.log(newObj);

// for(let x in my){
//     console.log(x);
// }
// console.log(my);
