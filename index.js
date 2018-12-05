process.title = 'socketcontrol';
var topicBase = 'home/socket/';

var exec = require('child_process').execSync;
var mqtt = require('mqtt');

var url = process.env.MQTT_URL;
var opts = { username: process.env.MQTT_USERNAME, password: process.env.MQTT_PASSWORD };

// Create a client connection
var client = mqtt.connect(url, opts);

client.on('connect', function() { // When connected
    console.info('MQTT: Successfully connected');
    // subscribe to a topic
    client.subscribe(topicBase+'+/set');

});

client.on('close', function() {
   console.info('MQTT: Connection closed'); 
});

// when a message arrives, do something with it
client.on('message', function(topic, msg, packet) {
  if( packet.retain ) {
      console.info('Ignoring stale message: '+topic+' '+msg);
      return;
  }
  var socket = topic.split(/\//)[2];
  if( socket != 'undefined' && socket.search(/^[1-4]$/) != -1 && (msg=='on'||msg=='off') ) {
      console.log("Switching "+msg+" socket " + socket);
      try {
         exec(__dirname+'/bin/switch.py '+socket+' '+msg, {timeout: 5000,stdio:['ignore',1,2]});
         client.publish(topicBase + socket, msg, { retain: true} );
      } catch( err ) {
         console.error(err);
         console.error("If you are missing the gpiozero package, run: npm run-script install-gpiozero");
         console.error("If you get an error related to access to /dev/mem, run as root or update firmware: npm rpi-update");
      }
  }
});
