// var xlsx = require ("xlsx");
// var fs = require("fs");
// var path = require("path");
// var sourceDir = "Files";

function click(){
    // console.log('Hey!');
    combine();
    alert("All Done! Find your output.xlsx in the JS_SCRIPT folder");
}


function readFileToJson(filename){
    var wb = xlsx.readFile(filename, {cellDates:true});
    var firstTabName = wb.SheetNames[0];
    var ws = wb.Sheets[firstTabName];
    var data = xlsx.utils.sheet_to_json(ws);
    return data;
}

// var data = readFileToJson("file1.xlsx");
// console.log(data);
// document.getElementById("script").onclick = function() {combine()};

function combine(){
    alert("succesfully called combine");
    var targetDir = path.join(__dirname, sourceDir);
    var files = fs.readdirSync(targetDir);
    var combinedData = [];//final output
    var noMatchCombinedData = [];//final output
    var firstFileJson = [];//put first excel in this array
    var secFileJson = [];//put second excel in this array
    var counter = 1;//this combine method only supports combining two files

    files.forEach(function(file){//read two excel file to json and put in two json array
        var fileExtension = path.parse(file).ext;
        if(fileExtension === ".xlsx" && file[0] !== "~"){
            var fullFilePath = path.join(__dirname, sourceDir, file);
            var data = readFileToJson(fullFilePath);
            // console.log(data);
            if(counter == 1){
                firstFileJson = firstFileJson.concat(data);
            }
            if(counter == 2){
                secFileJson = secFileJson.concat(data);
            }
            counter++;
            // combinedData = combinedData.concat(data);
        }
    });

    var resultArray = [];
    var noMatchResultArray = [];
    
    // if file2.address contains file1.address
    // add combined json to combinedData
    for(var i = 0; i < firstFileJson.length; i++){
        var matched = false;
        for(var j = 0; j < secFileJson.length; j++){
            tempJSON = {};
            if( secFileJson[j]["Mailing Street"].toLowerCase().includes(firstFileJson[i]["ADDRESS"].toLowerCase())){
                // console.log(secFileJson[j]["Mailing Street"]);
                matched = true;
                tempJSON = Object.assign({}, firstFileJson[i], secFileJson[j]);
                resultArray.push(tempJSON);
                // console.log(resultArray);
            } 
        }
        //if no entry from file2 contains ADDRESS of file1, place file1 entry in seperate noMatchArray
        if(!matched){
            noMatchResultArray.push(firstFileJson[i]);
        }
    }

    combinedData = combinedData.concat(resultArray);
    noMatchCombinedData = noMatchCombinedData.concat(noMatchResultArray);

    var newWB = xlsx.utils.book_new();
    var newWS = xlsx.utils.json_to_sheet(combinedData);
    var newWS2 = xlsx.utils.json_to_sheet(noMatchCombinedData);
    xlsx.utils.book_append_sheet(newWB, newWS, "Matching Output");
    xlsx.utils.book_append_sheet(newWB, newWS2, "Non-matching Output");
    xlsx.writeFile(newWB, "Outputs.xlsx");
    alert("maybe success");
    console.log('Done!');
}
combine();
