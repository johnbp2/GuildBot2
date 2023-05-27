const path = require("path");

exports.getPosixRelativePath = function (absolutePathWindowsFormat) {
  if (!absolutePathWindowsFormat || absolutePathWindowsFormat.length <= 0) {
    throw new Error("absolutePathWindowsFormat was not specified");
  }
  var relativePath = path.relative(process.cwd(), absolutePathWindowsFormat);
  console.log("Relative path ".concat(relativePath));

  let definitelyPosix = relativePath.split(path.sep).join(path.posix.sep);
  console.log("Posix Relative path ".concat(definitelyPosix));
  definitelyPosix = "./".concat(definitelyPosix);
  console.log("Posix Relative path ".concat(definitelyPosix));
  return definitelyPosix;
};
