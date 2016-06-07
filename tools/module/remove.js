'use strict';

const fs = require('fs');

let blockName = process.argv.slice(2).join(' ');
let basePath = 'source/modules/';

let filePath = basePath + blockName;

if (blockName) {
	deleteFolderRecursive(filePath);
	console.log('Модуль "' + blockName + '" удален!');
}

function deleteFolderRecursive (path) {
	if( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file,index) {
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) {
				// recurse
				deleteFolderRecursive(curPath);
			}
			else {
				// delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};
