#!/bin/bash

#docker pull handymoose/rpi:socket-control

docker run --restart=always --privileged --add-host=mqtt:192.168.0.27 -d --name socket-control handymoose/rpi:socket-control
