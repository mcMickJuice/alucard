var express = require('express')
var bodyParser = require('body-parser')
var port = process.env.PORT;
var serviceRouter = require('./serviceRoutes')
var mountPath = process.env.MOUNT_PATH;

var app = express();
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.log(err.stack);

    next();
})

if(mountPath == null) {
    app.use(serviceRouter)
} else {
    app.use(mountPath, serviceRouter);
}

app.listen(port, () => console.log(`Alucard service listening at ${port} mounted on ${mountPath || '/'}`))





