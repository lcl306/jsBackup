var date = require("./date");
var archive = require("./archive");
var exec = require("child_process").exec;
var fs = require("fs");

function dump(targetDir, mysqlHome, user, password, dbname){
	var targetName = dbname+(date.format(new Date(), 'dd'));
	exec(mysqlHome+'/bin/mysqldump --user='+user+' --password='+password+' --single-transaction -R '+dbname+' > '
		+targetDir+"/"+targetName+'.sql', function(error, stdout, stderr){
		archive.zip(targetDir+'/'+targetName+'.zip', targetDir, targetName+".sql");
		fs.unlink(targetDir+'/'+targetName+".sql");  //delete file
	});
}

exports.dump = dump;