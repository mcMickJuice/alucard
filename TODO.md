### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| alucardService\alucardDownloadService.js | 47 | move into alucardService
| app\webApp.js | 124 | pull pinging Pi into separate file
| models\mongoosePromisified.js | 6 | only connect on construction of model

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| alucardService\alucardDownloadService.js | 83 | clone this?
| logging\alucardLogger.js | 6 | none of these log methods have a callback and therefore they are fire and forget?
| models\mongoosePromisified.js | 7 | this opens up a connection immediately when imported.
| utility\stringifyStream.js | 22 | this doesnt work. It needs to break it up into an array of objects