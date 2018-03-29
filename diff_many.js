var BlinkDiff = require('blink-diff');
const fs = require('fs');
const path = require('path');


var oldRootPath = process.argv[3];
var newRootPath = process.argv[4];
var outputRootPath = process.argv[5];
var threshold = parseFloat(process.argv[6] || 0.01);

function reduce(leftList, rightList){
  return leftList.filter(item => rightList.indexOf(item) == -1);
}

function both(leftList, rightList){
  return leftList.filter(item => rightList.indexOf(item) > -1);
}

var oldFiles = fs.readdirSync(oldRootPath);
var newFiles = fs.readdirSync(newRootPath);

var deletedFiles = reduce(oldFiles, newFiles);
var createdFiles = reduce(newFiles, oldFiles);

var unchangedFiles = [];
var modifiedFiles = [];
var totalDifferences = 0;
var totalPassed = 0;
var totalFailed = 0;

both(oldFiles, newFiles).forEach(filename => {
  // [TODO] assert the file is not empty: bytes=0
  var diff = new BlinkDiff({
    imageAPath: path.join(oldRootPath, filename),
    imageBPath: path.join(newRootPath, filename),
    imageOutputPath: path.join(outputRootPath, filename),
    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: threshold,
    composition: false
  });

  var result = diff.runSync();
  var passed = (result.differences == 0);
  totalDifferences += result.differences;
  totalPassed += (passed) ? 1 : 0;
  totalFailed += (passed) ? 0 : 1;
  modifiedFiles.push({
    'path': filename,
    'code': result.code,
    'differences': result.differences
  });

});

// report number of differences back
console.log(JSON.stringify(
  {
      'passed': totalPassed,
      'failed': totalFailed,
      'differences': totalDifferences,
      'deleted': deletedFiles,
      'created': createdFiles,
      'changed': modifiedFiles
  }
));
