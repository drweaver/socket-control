process.title = 'socketcontrol';

var exec = require('child_process').execSync;
var mqtt = require('mqtt');

var config = require('../etc/config.json');

// Create a client connection
var client = mqtt.connect(config.mqttUrl);

client.on('connect', function() { // When connected
    console.info('MQTT: Successfully connected');
    // subscribe to a topic
    client.subscribe('socketcontrol/+');

});

client.on('close', function() {
   console.info('MQTT: Connection closed') 
});

// when a message arrives, do something with it
client.on('message', function(topic, msg, packet) {
  var socket = topic.split(/\//)[1];
  if( socket && (msg==='on'||msg==='off') ) {
   try {
      exec(__dirname+'/bin/switch.py '+socket+' '+msg.state, {timeout: 5000,stdio:['ignore',1,2]});
   } catch( err ) {
      console.error(err);
      console.error("If you are missing the gpiozero package, run: npm run-script install-gpiozero");
      console.error("If you get an error related to access to /dev/mem, run as root or update firmware: npm rpi-update");
   }
  }
});