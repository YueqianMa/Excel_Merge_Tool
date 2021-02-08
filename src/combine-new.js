var xlsx = require ("xlsx");

function combine(file1, file2){//file1, file2 are JSON objects representing the content of excel files
    if(file1 == null || file2 == null){
        alert("File1 or File2 is empty, select files first.");
        return;
    }
    if(file1){
        file1 = JSON.parse(file1);
    }
    if(file2){
        file2 = JSON.parse(file2);
    }

    var combinedData = [];//final output
    var noMatchCombinedData = [];//final output
    var firstFileJson = [];//put first excel in this array
    var secFileJson = [];//put second excel in this array
    var resultArray = [];//intermediate var to store matching output json array
    var noMatchResultArray = [];//intermediate var to store matching output json array

    firstFileJson = firstFileJson.concat(file1);//just changed variable name here, nothing magical, cause I don't want to rewrite code
    secFileJson = secFileJson.concat(file2);//just changed variable name here, nothing magical
    
    // If file2.address contains file1.address, add combined json to combinedData
    for(var i = 0; i < firstFileJson.length; i++){
        var matched = false;
        for(var j = 0; j < secFileJson.length; j++){
            tempJSON = {};
            if( secFileJson[j]["Mailing Street"].toLowerCase().includes(firstFileJson[i]["ADDRESS"].toLowerCase())){
                matched = true;
                tempJSON = Object.assign({}, firstFileJson[i], secFileJson[j]);
                resultArray.push(tempJSON);
            } 
        }
        //if no entry from file2 contains ADDRESS of file1, place file1 entry in seperate noMatchArray
        if(!matched){
            noMatchResultArray.push(firstFileJson[i]);
        }
    }

    combinedData = combinedData.concat(resultArray);//trivial step, changed var name
    noMatchCombinedData = noMatchCombinedData.concat(noMatchResultArray);//trivial step, changed var name

    var newWB = xlsx.utils.book_new();
    var newWS = xlsx.utils.json_to_sheet(combinedData);
    var newWS2 = xlsx.utils.json_to_sheet(noMatchCombinedData);
    xlsx.utils.book_append_sheet(newWB, newWS, "Matching Output");
    xlsx.utils.book_append_sheet(newWB, newWS2, "Non-matching Output");
    xlsx.writeFile(newWB, "Outputs.xlsx");
    alert("Success! File download will start shortly.");
}
window.combine = combine;
