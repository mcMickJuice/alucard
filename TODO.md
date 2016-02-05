### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| alucardService\alucardDownloadService.js | 47 | move into alucardService
| models\mongoosePromisified.js | 7 | only connect on construction of model
| secrets\fileProcessingConfig.js | 1 | consolidate ALL THE CONFIGS!

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| alucardService\alucardDownloadService.js | 83 | clone this?
| logging\alucardLogger.js | 6 | none of these log methods have a callback and therefore they are fire and forget?
| models\mongoosePromisified.js | 8 | this opens up a connection immediately when imported.
| utility\asyncTools.js | 4 | This can't be tested so I'm not sure if it works
| utility\stringifyStream.js | 22 | this doesnt work. It needs to break it up into an array of objects