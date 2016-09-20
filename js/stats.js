var nw = require('nw.gui');
var os = require('os');
var fs = require('fs');

var win = nw.Window.get();

var content = '';
content += '[Platform]' + os.EOL;
// linux, darwin, win32, freebsd, sunos
content += 'OS Tpye' + os.platform() + os.EOL;
content += 'OS Version: ' + os.release() + os.EOL;
content += 'OS Architecture: ' + os.arch() + os.EOL;
content += os.EOL;

// Memory info
content += '[Memory]' + os.EOL;
content += 'Total (Bytes) ' + os.totalmem() + os.EOL;
content += 'Tree (Bytes) ' + os.freemem() + os.EOL;
content += 'Free (%) ' + (os.freemem() / os.totalmem() * 100).toFixed(2) + os.EOL;
content += os.EOL;

// CPUs
content += '[CPUs]' + os.EOL;
content += 'No. of cores: ' + os.cpus().length + os.EOL;
content += 'CPU Type' + os.cpus()[0].model + os.EOL;
content += 'CPU Type' + os.cpus()[0].model + os.EOL;

console.log(content);
fs.writeFile('sysinfo.txt', content, function(err){
    if(err) {
        console.log('Error writting file');
    } else {
        console.log('Successfully wrote file');
    }
});