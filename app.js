var BlinkDiff = require('blink-diff');

var diffFiles = [];
var sameFiles = [];
var differences = [];

var oldRootPath = process.argv[1];
var newRootPath = process.argv[2];
var outputRootPath = process.argv[3];

for (var i = 0; i < array.length; i++) {
  var filename = array[i]
  var diff = new BlinkDiff({
    imageAPath: oldRootPath + '/' + filename,
    imageBPath: newRootPath + '/' + filename,

    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: 0.01, // 1% threshold

    imageOutputPath: outputRootPath + '/' + filename
  });

  diff.run(function (error, result) {
    if (error) {
      throw error;
    } else {
      if ( diff.hasPassed(result.code) ){
        // console.log(...);
        sameFiles.push(result.filePath);
      } else {
        // console.log(...);
        diffFiles.push(result.filePath);
        differences += result.differences;
      }
    }
  });
}

// report number of differences back
console.log(
  {
    'different': diffFiles,
    'same': sameFiles,
    'count': differences
  }
);
