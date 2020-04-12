let callback = function({data,pythonpath}){
    console.log(data)
 }
let jsexecpy = require("jsexecpy")
jsexecpy.runpath("../scripts/merge_data.py",callback)
