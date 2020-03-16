const fs = require('fs');

module.exports = {
    readFile:(path,fileName)=>{

        return new Promise((resolve,reject)=>{
            fs.readFile(path+fileName,'utf8',(error,data)=>{
                if(error){
                    reject(error);
                }
                resolve(JSON.parse(data));
            });
        })
    
    }
}