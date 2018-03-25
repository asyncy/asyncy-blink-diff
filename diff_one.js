var BlinkDiff = require('blink-diff');
const fs = require('fs');
const path = require('path');

if (fs.lstatSync(process.argv[5]).isDirectory()) {
  var outputPath = path.join(
    process.argv[5],
    path.basename(process.argv[4])
  );
} else {
  var outputPath = process.argv[5];
}

var diff = new BlinkDiff({
  imageAPath: process.argv[3],
  imageBPath: process.argv[4],
  imageOutputPath: outputPath,
  thresholdType: BlinkDiff.THRESHOLD_PERCENT,
  threshold: parseFloat(process.argv[6] || 0.01),
  composition: false
});

var result = diff.runSync();

console.log(JSON.stringify({
  'code': result.code,
  'differences': result.differences
}));
