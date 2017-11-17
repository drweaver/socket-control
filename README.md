# socket-control

A service to control Energenie sockets using the Raspberry Pi control board ([PiMote](https://www.amazon.co.uk/Energenie-Pi-mote-Remote-Control-Raspberry/dp/B00P3JIUQO)). Communication via MQTT.

# Installation

## Dependencies

1. MQTT - on a Raspberry Pi you can install mosquitto.

```sh
sudo apt-get update && sudo apt-get install mosquitto
```

2. PiMote Energenie board attached to Raspberry Pi.

## Docker Method (recommended)

1. Install docker

```sh
curl -sSL https://get.docker.com | sh

sudo systemctl enable docker

sudo systemctl start docker

sudo usermod -aG docker $(whoami)
```

2. Run the socket-control container

```sh
docker run --restart=always --privileged --add-host=mqtt:<IP FOR MQTT> -d --name socket-control handymoose/rpi:socket-control
```

### Native method

1. Install NodeJS v6+

2. With apt-get install python python-gpiozero python-rpi.gpio

3. Clone the repository, run npm install, run node index.js

# Usage

## MQTT API

State topics (to subscribe to):
```sh
home/socket/[1-4] on|off
```

Change topics (to publish to, retain=false):
```sh
home/socket/[1-4]/set on|off
```

Example, socket 3 is currently off, topic will be:
```sh
home/socket/3 off
```
to turn on socket 3 publish following message:
```sh
home/socket/3/set on
```
