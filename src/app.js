(function() {
  var childProcess = require("child_process");
  childProcess.spawn = require('cross-spawn');
})();
// (function() {
//   var childProcess = require("child_process");
//   var oldSpawn = childProcess.spawn;
//   function mySpawn() {
//       console.log('spawn called');
//       console.log(arguments);
//       var result = oldSpawn.apply(this, arguments);
//       return result;
//   }
//   childProcess.spawn = mySpawn;
// })();
export default {
  config: {
    onError(e) {
      e.preventDefault();
      // console.error(e.message);
    },
  },
  // plugins: [require('dva-logger')()],
};
