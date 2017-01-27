process.title = 'socketcontrol';

var pubnub = require('./lib/pubnub.js');
var eventbus = require('./lib/eventbus.js');
var exec = require('child_process').execSync;

pubnub.start();

eventbus.on('socketcontrol.request', function(msg) {
   
   try {
      var sockets = typeof msg.socket == 'number' ? [msg.socket] : msg.socket;
      sockets.map( socket => {
         exec(__dirname+'/bin/switch.py '+socket+' '+msg.state, {timeout: 5000,stdio:['ignore',1,2]});
      });
   } catch( err ) {
      console.error(err);
      console.error("If you are missing the gpiozero package, run: npm run-script install-gpiozero");
      console.error("If you get an error related to access to /dev/mem, run as root or update firmware: npm rpi-update");
   }
    
});