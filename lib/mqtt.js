var eventbus = require('./eventbus');
var mqtt = require('mqtt');
var config = require('../etc/mqtt.json');


// Create a client connection
var client = mqtt.connect(config.url);

client.on('connect', function() { // When connected
    console.info('MQTT: Successfully connected');
    // subscribe to a topic
    client.subscribe('socketcontrol/+');

});

client.on('close', function() {
   console.info('MQTT: Connection closed') 
});

// when a message arrives, do something with it
client.on('message', function(topic, message, packet) {
  var socket = topic.split(/\//)[1];
  if( socket && (message === 'on'||message==='off') )
    eventbus.emit('socketcontrol.request',{socket:socket,state:message});
});
