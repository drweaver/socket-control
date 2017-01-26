process.title = 'socketcontrol';

var pubnub = require('./lib/pubnub.js');
var eventbus = require('./lib/eventbus.js');
var exec = require('child_process').execSync;

pubnub.start();

eventbus.on('socketcontrol.request', function(msg) {
   
   try {
       console.log( exec(__dirname+'/../bin/switch.py '+msg.socket+' '+msg.state, {timeout: 5000}) );
   } catch( err ) {
       console.error(err);
   }
    
});