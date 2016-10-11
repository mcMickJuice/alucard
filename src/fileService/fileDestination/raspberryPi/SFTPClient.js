var Client = require('ssh2').Client;
var Q = require('q')

function ShellClient() {
    this.options = {
        host: '192.168.1.2',
        username: 'pi',
        password: 'MJHouse2016!?'
    }
}

function createPromise(func) {
    return (...args) => {
        var deferred = Q.defer();
        console.log('args', ...args)

        func(...args, (err, ...rest) => {
            console.log('response', rest)
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(...rest)
            }
        })

        return deferred.promise;
    }
}

ShellClient.prototype.issueCommand = function (command, onData, cb) {
    this.client.exec(command, function (err, readStream) {
        if (err) {
            cb(err);
            return;
        }

        readStream.setEncoding('UTF8');

        readStream.on('data', function (data) {
            onData(data);
        })
            .on('end', function () {
                console.log('commandDone');
                cb()
            })
    })
}

ShellClient.prototype.connect = function (cb) {
    this.client = new Client();

    this.client.on('ready', function (err) {
        if (err) {
            cb(err);
            return;
        }
        console.log('client connected')
        cb();
    })
        .on('end', function () {
            console.log('client ended')
        })
        .on('error', function (err) {
            console.log('An error has occurred')
        })
        .connect(this.options);
}

ShellClient.prototype.readDir = function (dir) {
    this.client.sftp(function (err, sftp) {
        if (err) {
            console.log('err', err);
            return;
        }

        sftp.readdir(dir, function (err, dirListing) {
            if (err) {
                console.log('err reading dir', err)
                return
            }

            var statPromise = createPromise(sftp.stat.bind(sftp));

            // dirHandle.setEncoding('UTF8');
            var dirPromises = dirListing.map(d => {
                return statPromise(dir + '/' + d.filename)
                .then(stats => stats.isDirectory());
            })
            //array of promises
            
            Q.all(dirPromises)
                .then(stats => {
                    console.log('in dirPromises', stats)
                })
                .catch(err => console.log(err))
        })
    })
}

ShellClient.prototype.getStoredRoms = function (rootRomDir, callback) {
    this.client.sftp((err, sftp) => {
        if (err) {
            console.log(err);
            return
        }

        sftp.readdir(rootRomDir, (err, romDirs) => {
            console.log(romDirs)
            var dirNames = romDirs
                .filter(dir => {
                    var stat = sftp.stat(dir.filename);
                    return stat.isDirectory
                })
                .map(d => d.filename);


            dirNames.forEach(d => {
                sftp.readdir(rootRomDir + '/' + d, (err, roms) => {
                    callback(roms);
                })
            })
        })
    })
}

ShellClient.prototype.removeFile = function (filePath, cb) {
    var callback = cb || (() => console.log('file removed'));
    this.client.sftp(function (err, sftp) {
        if (err) {
            console.log('err', err);
            return;
        }

        sftp.unlink(filePath, (err) => {
            if (err) {
                console.log('an error occurred')
            }
        })
    })
}

ShellClient.prototype.disconnect = function () {
    this.client.end();
    this.client = null;
}

module.exports = ShellClient