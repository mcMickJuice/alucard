### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| alucardService\alucardDownloadService.js | 33 | move into alucardService
| alucardService\alucardDownloadService.js | 47 | PHASE TRANSFER
| alucardService\alucardDownloadService.js | 59 | POSTPROCESS
| download\downloadManager.js | 7 | determine file extensions ahead of time?
| download\downloadManager.js | 11 | define reporter
| models\mongoosePromisified.js | 7 | only connect on construction of model

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| logging\alucardLogger.js | 6 | none of these log methods have a callback and therefore they are fire and forget?
| models\mongoosePromisified.js | 8 | this opens up a connection immediately when imported.
| utility\asyncTools.js | 4 | This can't be tested so I'm not sure if it works